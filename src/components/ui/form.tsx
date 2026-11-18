import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue = { name: string };
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
);

const FormItemContext = React.createContext<{ id: string }>({} as { id: string });

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
};

const FormLabel = ({ className, ...props }: React.ComponentProps<"label">) => {
  const { error, formItemId } = useFormField();
  return (
    <label
      htmlFor={formItemId}
      className={cn("text-sm font-medium leading-none", error && "text-red-500", className)}
      {...props}
    />
  );
};

const FormControl = ({ children }: { children: React.ReactNode }) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  if (!React.isValidElement(children)) return <>{children}</>;
  return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    id: formItemId,
    "aria-describedby": error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId,
    "aria-invalid": !!error,
  });
};

const FormDescription = ({ className, ...props }: React.ComponentProps<"p">) => {
  const { formDescriptionId } = useFormField();
  return (
    <p id={formDescriptionId} className={cn("text-sm text-gray-500", className)} {...props} />
  );
};

const FormMessage = ({ className, children, ...props }: React.ComponentProps<"p">) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? "") : children;
  if (!body) return null;
  return (
    <p id={formMessageId} className={cn("text-sm font-medium text-red-500", className)} {...props}>
      {body}
    </p>
  );
};

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};