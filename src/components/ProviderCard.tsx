import { Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Provider {
  id: number;
  name: string;
  service: string;
  rating: number;
  distance: string;
  price: string;
  image: string;
  available: string;
}

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-16 h-16 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{provider.name}</h3>
            <p className="text-sm text-muted-foreground">{provider.service}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{provider.rating}</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{provider.distance}</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{provider.available}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-primary">{provider.price}</p>
            <p className="text-xs text-muted-foreground">Starting from</p>
          </div>
          
          <Button className="rounded-xl">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
