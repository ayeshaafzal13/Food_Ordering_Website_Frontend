import { CircleUserRound, LogOut, Store, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-10 items-center gap-2 rounded-full border bg-card px-4 text-sm font-semibold shadow-sm outline-none transition-colors hover:border-primary/40 hover:text-primary">
        <CircleUserRound className="size-5 text-primary" />
        <span className="max-w-[180px] truncate">{user?.email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        <DropdownMenuItem
          render={<Link to="/manage-restaurant" />}
          className="cursor-pointer gap-2 font-semibold"
        >
          <Store className="size-4 text-primary" /> Manage Restaurant
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link to="/user-profile" />}
          className="cursor-pointer gap-2 font-semibold"
        >
          <UserRound className="size-4 text-primary" /> User Profile
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem
          onClick={() => logout()}
          className="cursor-pointer gap-2 font-semibold text-destructive"
        >
          <LogOut className="size-4" /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
