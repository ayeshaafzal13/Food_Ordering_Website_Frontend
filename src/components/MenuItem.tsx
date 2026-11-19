import type { MenuItem as MenuItemType } from "../types";
import { Plus } from "lucide-react";
import FoodImage from "./FoodImage";
import { LOCAL_FALLBACK, photoForDish, photoUrl } from "@/config/images";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <button
      type="button"
      onClick={addToCart}
      className="group flex w-full items-center gap-4 rounded-2xl border bg-card p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <FoodImage
        src={photoUrl(photoForDish(menuItem.name), 240, 240)}
        fallback={LOCAL_FALLBACK.generic}
        alt={menuItem.name}
        className="size-20 shrink-0 rounded-xl sm:size-24"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-bold">{menuItem.name}</div>
        <div className="mt-1 font-bold text-primary">
          £{(menuItem.price / 100).toFixed(2)}
        </div>
      </div>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-110">
        <Plus className="size-5" />
      </span>
    </button>
  );
};

export default MenuItem;
