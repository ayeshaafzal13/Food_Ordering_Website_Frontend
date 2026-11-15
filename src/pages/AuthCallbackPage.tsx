import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth0();
    const { createUser } = useCreateMyUser();

    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (isLoading || !user?.sub || !user?.email || hasCreatedUser.current) {
            return;
        }

        hasCreatedUser.current = true;

        const createUserAndNavigate = async () => {
            try {
                await createUser({
                    auth0Id: user.sub,
                    email: user.email!,
                });

                navigate("/", { replace: true });
            } catch (error) {
                hasCreatedUser.current = false;
                console.error("Error creating user:", error);
            }
        };

        createUserAndNavigate();

    }, [createUser, navigate, user, isLoading]);

    return <>Loading...</>;
};

export default AuthCallbackPage;
