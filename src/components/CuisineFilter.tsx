import { cuisineList } from "@/config/restaurant-options-config";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };

  const handleCuisinesReset = () => onChange([]);

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm lg:sticky lg:top-24">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-base font-bold">Filter by cuisine</div>
        <button
          type="button"
          onClick={handleCuisinesReset}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div key={cuisine} className="lg:flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="peer sr-only"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 cursor-pointer items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  {isSelected && <Check size={16} strokeWidth={3} />}
                  {cuisine}
                </label>
              </div>
            );
          })}
      </div>

      <Button
        onClick={onExpandedClick}
        variant="link"
        className="mt-3 w-full font-semibold"
      >
        {isExpanded ? (
          <span className="flex items-center">
            View Less <ChevronUp />
          </span>
        ) : (
          <span className="flex items-center">
            View More <ChevronDown />
          </span>
        )}
      </Button>
    </div>
  );
};

export default CuisineFilter;
