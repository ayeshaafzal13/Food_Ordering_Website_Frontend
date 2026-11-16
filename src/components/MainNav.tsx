import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (

    <span className="flex space-x-2 items-center">
        {isAuthenticated ? ( <UsernameMenu/> ) :( 
        <Button
           variant = "ghost"
           className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => {
    try {
        await loginWithRedirect({
            authorizationParams: {
                connection: "google-oauth2",
            },
        });
    } catch (error) {
        console.error("Google login error:", error);
    }
}} >
            Log In
           </Button> 

           )}
        </span>
    );

};

export default MainNav;