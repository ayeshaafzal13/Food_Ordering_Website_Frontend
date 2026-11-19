import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const linkClass =
  "flex items-center rounded-xl px-3 py-3 font-semibold text-foreground transition-colors hover:bg-accent hover:text-primary";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link to="/order-status" className={linkClass}>
        Order Status
      </Link>
      <Link to="/manage-restaurant" className={linkClass}>
        My Restaurant
      </Link>
      <Link to="/user-profile" className={linkClass}>
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        variant="outline"
        className="mt-2 h-11 font-semibold"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
