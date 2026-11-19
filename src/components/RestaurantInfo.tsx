import type { Restaurant } from "@/types";
import { Clock, MapPin } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {restaurant.restaurantName}
        </h1>
        <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          {restaurant.city}, {restaurant.country}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {restaurant.cuisines.map((item) => (
          <span
            key={item}
            className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
        <Clock className="size-4" />
        Ready in about {restaurant.estimatedDeliveryTime} mins
      </div>
    </div>
  );
};

export default RestaurantInfo;
