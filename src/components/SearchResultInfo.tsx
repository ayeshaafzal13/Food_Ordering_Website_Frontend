import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-1 text-xl font-bold lg:flex-row lg:items-center">
      <span>
        {total} Restaurants found in <span className="text-primary">{city}</span>
        <Link
          to="/"
          className="ml-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
