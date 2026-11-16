
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import type { UpdateMyUserRequest } from "@/api/MyUserApi";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (userProfileData: UpdateMyUserRequest) => Promise<unknown>;
    isLoading: boolean;
};

const UserProfileForm = ({
    onSave,
    isLoading,
    currentUser,
}: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: currentUser.email ?? "",
            name: currentUser.name ?? "",
            addressLine1: currentUser.addressLine1 ?? "",
            city: currentUser.city ?? "",
            country: currentUser.country ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            email: currentUser.email ?? "",
            name: currentUser.name ?? "",
            addressLine1: currentUser.addressLine1 ?? "",
            city: currentUser.city ?? "",
            country: currentUser.country ?? "",
        });
    }, [currentUser, form]);

    const inputClass =
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-orange-500";

    return (
        <div className="mx-auto max-w-4xl rounded-lg bg-gray-50 p-5 md:p-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">
                    User Profile
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    View and change your profile information here.
                </p>
            </div>

            <form
                onSubmit={form.handleSubmit(async (data) => {
                    const { name, addressLine1, city, country } = data;

                    await onSave({
                        name,
                        addressLine1,
                        city,
                        country,
                    });
                })}
                className="space-y-5"
            >
                <div>
                    <label className="mb-2 block font-medium">
                        Email
                    </label>

                    <input
                        {...form.register("email")}
                        disabled
                        className={`${inputClass} bg-gray-100`}
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Name
                    </label>

                    <input
                        {...form.register("name")}
                        className={inputClass}
                    />

                    {form.formState.errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Address Line 1
                    </label>

                    <input
                        {...form.register("addressLine1")}
                        className={inputClass}
                    />

                    {form.formState.errors.addressLine1 && (
                        <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.addressLine1.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">
                            City
                        </label>

                        <input
                            {...form.register("city")}
                            className={inputClass}
                        />

                        {form.formState.errors.city && (
                            <p className="mt-1 text-sm text-red-500">
                                {form.formState.errors.city.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Country
                        </label>

                        <input
                            {...form.register("country")}
                            className={inputClass}
                        />

                        {form.formState.errors.country && (
                            <p className="mt-1 text-sm text-red-500">
                                {form.formState.errors.country.message}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600"
                >
                    {isLoading ? "Updating..." : "Update Profile"}
                </Button>
            </form>
        </div>
    );
};

export default UserProfileForm;
