
import type { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GET CURRENT USER
export const useGetMyUser = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return response.json();
    };

    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["fetchCurrentUser"],
        queryFn: getMyUserRequest,
        enabled: isAuthenticated,
    });

    if (error) {
        console.error("Get user error:", error);
    }

    return { currentUser, isLoading };
};

// CREATE USER
type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        return response.json();
    };

    const {
        mutateAsync: createUser,
        isPending,
        isError,
        isSuccess,
    } = useMutation({
        mutationFn: createMyUserRequest,
    });

    return {
        createUser,
        isPending,
        isError,
        isSuccess,
    };
};

// UPDATE USER
export type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
};

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();

    const updateMyUserRequest = async (
        formData: UpdateMyUserRequest
    ) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        return response.json();
    };

    const {
        mutateAsync: updateUser,
        isPending,
    } = useMutation({
        mutationFn: updateMyUserRequest,

        onSuccess: async () => {
            toast.success("User profile updated!");

            await queryClient.invalidateQueries({
                queryKey: ["fetchCurrentUser"],
            });
        },

        onError: (error) => {
            console.error("Update user error:", error);
            toast.error(error.message);
        },
    });

    return { updateUser, isPending };
};
