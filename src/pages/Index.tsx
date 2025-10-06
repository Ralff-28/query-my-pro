import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProviderCard } from "@/components/ProviderCard";
import { MapPin, Star, DollarSign } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: "John Smith",
      service: "Plumber",
      rating: 4.8,
      distance: "2.3 km",
      price: "$75/hr",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      available: "Today",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      service: "Electrician",
      rating: 4.9,
      distance: "1.8 km",
      price: "$90/hr",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      available: "Tomorrow",
    },
    {
      id: 3,
      name: "Mike Davis",
      service: "Cleaner",
      rating: 4.7,
      distance: "3.1 km",
      price: "$50/hr",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      available: "Weekends",
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find trusted professionals{" "}
              <span className="text-primary">near you</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Just type what you need – we'll find the perfect match
            </p>
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Popular Services
        </h2>
        <CategoryGrid />
      </div>

      {/* Providers Section */}
      {searchQuery && (
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Top Professionals
            </h2>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Near you</span>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!searchQuery && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto space-y-4 text-muted-foreground">
            <p className="text-lg">
              Try searching for services like:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Plumber near me", "Weekend cleaner under $50", "Emergency electrician"].map((example) => (
                <button
                  key={example}
                  onClick={() => setSearchQuery(example)}
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
