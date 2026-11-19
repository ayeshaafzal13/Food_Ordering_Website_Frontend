import type { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { Banknote, Clock } from "lucide-react";
import FoodImage from "./FoodImage";
import { photoForCuisines, photoUrl } from "@/config/images";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="group grid overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[2fr_3fr]"
    >
      <div className="aspect-[16/9] overflow-hidden sm:aspect-auto sm:min-h-44">
        <FoodImage
          src={restaurant.imageUrl}
          fallback={photoUrl(photoForCuisines(restaurant.cuisines), 700, 420)}
          alt={restaurant.restaurantName}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 p-5">
        <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
          {restaurant.restaurantName}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {restaurant.cuisines.map((item) => (
            <span
              key={item}
              className="rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
            <Clock className="size-4" />
            {restaurant.estimatedDeliveryTime} mins
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Banknote className="size-4" />
            Delivery from £{(restaurant.deliveryPrice / 100).toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
