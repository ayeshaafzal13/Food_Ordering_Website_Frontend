
import {
    useGetMyUser,
    useUpdateMyUser,
} from "@/api/MyUserApi";

import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
    const {
        currentUser,
        isLoading: isGetLoading,
    } = useGetMyUser();

    const {
        updateUser,
        isPending: isUpdateLoading,
    } = useUpdateMyUser();

    if (isGetLoading) {
        return <div className="p-6">Loading profile...</div>;
    }

    if (!currentUser) {
        return (
            <div className="p-6">
                Unable to load user profile.
            </div>
        );
    }

    return (
        <UserProfileForm
            currentUser={currentUser}
            onSave={updateUser}
            isLoading={isUpdateLoading}
        />
    );
};

export default UserProfilePage;
