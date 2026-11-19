import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="grid size-10 place-items-center rounded-full border bg-card text-primary shadow-sm"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent className="space-y-3 p-5">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center gap-2 font-bold">
              <CircleUserRound className="text-primary" />
              <span className="truncate">{user?.email}</span>
            </span>
          ) : (
            <span>Welcome to MernEats!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-3">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <>
              <Button
                onClick={() => loginWithRedirect()}
                className="h-11 flex-1 font-semibold"
              >
                Log In
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: { screen_hint: "signup" },
                  })
                }
                className="h-11 flex-1 font-semibold"
              >
                Sign Up
              </Button>
            </>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
