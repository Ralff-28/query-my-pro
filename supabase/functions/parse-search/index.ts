const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Parsing search query:', query);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a search query parser for a local services finder app. Extract structured information from natural language queries.
            
Return a JSON object with these fields:
- service: type of service (e.g., "plumber", "electrician", "cleaner")
- location: location mentioned or "near me" if not specified
- budget: price range as a string (e.g., "under $100", "$50-$80")
- availability: time requirements (e.g., "weekends", "today", "tomorrow")
- urgency: "emergency", "urgent", or "normal"

Example input: "Find a plumber near me who works on weekends under $100"
Example output: {"service":"plumber","location":"near me","budget":"under $100","availability":"weekends","urgency":"normal"}`
          },
          {
            role: 'user',
            content: query
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires payment. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to parse search query' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const parsedContent = data.choices[0].message.content;
    
    console.log('AI parsed response:', parsedContent);
    
    // Extract JSON from the response
    let parsedData;
    try {
      // Try to parse as JSON directly
      parsedData = JSON.parse(parsedContent);
    } catch {
      // If it's not valid JSON, try to extract JSON from markdown code blocks
      const jsonMatch = parsedContent.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[1]);
      } else {
        // Try to find any JSON object in the response
        const simpleJsonMatch = parsedContent.match(/\{[\s\S]*?\}/);
        if (simpleJsonMatch) {
          parsedData = JSON.parse(simpleJsonMatch[0]);
        } else {
          throw new Error('Could not extract JSON from AI response');
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        parsed: parsedData,
        originalQuery: query 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in parse-search function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
