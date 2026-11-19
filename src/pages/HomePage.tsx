import SearchBar, { type SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import FoodImage from "@/components/FoodImage";
import {
  CUISINE_TILES,
  LOCAL_FALLBACK,
  photoUrl,
} from "@/config/images";
import { Bike, ChefHat, MapPin, Search, Star } from "lucide-react";

const STEPS = [
  { icon: MapPin, title: "Enter your city", text: "Tell us where you are and see restaurants that deliver to you." },
  { icon: Search, title: "Pick your favourites", text: "Filter by cuisine, compare delivery times and prices." },
  { icon: Bike, title: "Enjoy fast delivery", text: "Pay securely online and track your order live." },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${encodeURIComponent(searchFormValues.searchQuery)}`,
    });
  };

  return (
    <div className="flex flex-col gap-16">
      {/* Search card overlapping the hero */}
      <div className="relative z-10 -mt-24 flex flex-col gap-5 rounded-3xl border bg-card px-5 py-8 text-center shadow-xl md:-mt-32 md:px-16 md:py-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Tuck into a <span className="text-primary">takeaway</span> today
        </h2>
        <span className="text-lg text-muted-foreground">
          Food is just a click away!
        </span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* Popular cuisines */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            What are you craving?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse popular categories, then search your city to see who delivers.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CUISINE_TILES.map((tile) => (
            <div
              key={tile.label}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md"
            >
              <FoodImage
                src={photoUrl(tile.photo, 500, 625)}
                fallback={LOCAL_FALLBACK.generic}
                alt={tile.label}
                className="h-full w-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-3 text-center text-lg font-bold text-white">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="grid gap-6 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-accent text-primary">
              <Icon className="size-7" />
            </div>
            <h3 className="text-lg font-bold">
              {i + 1}. {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      {/* Promo band */}
      <section className="grid overflow-hidden rounded-3xl bg-brand-dark text-white md:grid-cols-2">
        <FoodImage
          src={photoUrl("interior", 900, 700)}
          fallback={LOCAL_FALLBACK.burger}
          alt="Cosy restaurant interior"
          className="h-64 w-full md:h-full"
        />
        <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-amber">
            <ChefHat className="size-5" /> For restaurant owners
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Grow your restaurant with MernEats
          </h2>
          <p className="text-white/70">
            List your menu, receive orders and update their status in real time
            from your own dashboard.
          </p>
          <span className="flex items-center gap-1 text-sm text-white/70">
            <Star className="size-4 fill-brand-amber text-brand-amber" />
            Sign up and open "Manage Restaurant" from your account menu.
          </span>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
