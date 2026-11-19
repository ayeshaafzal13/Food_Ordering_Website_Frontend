import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <nav className="flex items-center gap-2">
      {isAuthenticated ? (
        <>
          <Link
            to="/order-status"
            className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
          >
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            className="h-10 px-5 font-semibold hover:text-primary"
            onClick={async () => await loginWithRedirect()}
          >
            Log In
          </Button>
          <Button
            className="h-10 px-5 font-semibold shadow-sm"
            onClick={async () =>
              await loginWithRedirect({
                authorizationParams: { screen_hint: "signup" },
              })
            }
          >
            Sign Up
          </Button>
        </>
      )}
    </nav>
  );
};

export default MainNav;
