import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search query",
        description: "Try something like 'plumber near me under $100'",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // This will call the AI parsing edge function
      onSearch(query);
      
      toast({
        title: "Searching...",
        description: "Finding the best professionals for you",
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2 p-2 bg-card rounded-2xl shadow-lg border border-border">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Find a plumber near me who works on weekends under $100..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="rounded-xl px-6"
        >
          {isSearching ? (
            <Sparkles className="w-4 h-4 animate-pulse" />
          ) : (
            "Search"
          )}
        </Button>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">
        <Sparkles className="w-3 h-3 text-primary" />
        <span>AI-Powered Search</span>
      </div>
    </div>
  );
};
