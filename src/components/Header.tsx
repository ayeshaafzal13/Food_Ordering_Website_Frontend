import { Link } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

export const Logo = ({ light = false }: { light?: boolean }) => (
  <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
    <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
      <UtensilsCrossed className="size-5" />
    </span>
    <span className={light ? "text-white" : "text-foreground"}>
      Mern<span className="text-primary">Eats</span>
    </span>
  </span>
);

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" aria-label="MernEats home">
          <Logo />
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
