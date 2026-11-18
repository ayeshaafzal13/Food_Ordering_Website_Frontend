import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import type { User } from "@/types";
import { useEffect } from "react";

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
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  const textField = (name: keyof UserFormData, label: string, disabled = false) => (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className="flex-1" data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            id={name}
            value={field.value ?? ""}
            disabled={disabled}
            className="bg-white"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );

  return (
    <form
      onSubmit={form.handleSubmit(onSave)}
      className="space-y-4 bg-gray-50 rounded-lg md:p-10"
    >
      <div>
        <h2 className="text-2xl font-bold">User Profile</h2>
        <FieldDescription>View and change your profile information here</FieldDescription>
      </div>

      {textField("email", "Email", true)}
      {textField("name", "Name")}

      <div className="flex flex-col md:flex-row gap-4">
        {textField("addressLine1", "Address Line 1")}
        {textField("city", "City")}
        {textField("country", "Country")}
      </div>

      {isLoading ? (
        <LoadingButton />
      ) : (
        <Button type="submit" className="bg-orange-500">
          Submit
        </Button>
      )}
    </form>
  );
};

export default UserProfileForm;