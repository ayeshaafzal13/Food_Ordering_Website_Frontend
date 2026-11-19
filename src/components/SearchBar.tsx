import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string().min(1, "Restaurant name is required"),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery ?? "",
    },
  });

  useEffect(() => {
    form.reset({ searchQuery: searchQuery ?? "" });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-row items-center justify-between gap-2 rounded-full border bg-card p-2 pl-4 shadow-md transition-shadow focus-within:shadow-lg focus-within:ring-2 focus-within:ring-primary/30 ${
          form.formState.errors.searchQuery ? "border-destructive" : ""
        }`}
      >
        <Search
          strokeWidth={2.5}
          className="hidden size-6 shrink-0 text-primary md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-0">
              <FormControl>
                <Input
                  {...field}
                  aria-label={placeHolder}
                  className="h-11 border-none bg-transparent text-base shadow-none focus-visible:ring-0 md:text-lg"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          onClick={handleReset}
          type="button"
          variant="ghost"
          className="hidden h-11 rounded-full px-4 text-muted-foreground sm:inline-flex"
        >
          Reset
        </Button>
        <Button type="submit" className="h-11 rounded-full px-6 font-semibold">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
