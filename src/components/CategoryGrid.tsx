import { Wrench, Zap, Sparkles, Scissors, Brush, Car, Home, Laptop } from "lucide-react";

const categories = [
  { name: "Plumber", icon: Wrench, color: "text-blue-500" },
  { name: "Electrician", icon: Zap, color: "text-yellow-500" },
  { name: "Cleaner", icon: Sparkles, color: "text-purple-500" },
  { name: "Salon", icon: Scissors, color: "text-pink-500" },
  { name: "Painter", icon: Brush, color: "text-orange-500" },
  { name: "Mechanic", icon: Car, color: "text-red-500" },
  { name: "Carpenter", icon: Home, color: "text-amber-700" },
  { name: "Tech Support", icon: Laptop, color: "text-cyan-500" },
];

export const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {categories.map((category, index) => {
        const Icon = category.icon;
        return (
          <button
            key={category.name}
            className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`p-4 rounded-xl bg-secondary group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm md:text-base">
                {category.name}
              </span>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        );
      })}
    </div>
  );
};
