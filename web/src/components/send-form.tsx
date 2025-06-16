import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";

export function SendForm() {
  const schema = object({
    text: string().required("Message is required"),
  });

  const form = useForm({ resolver: yupResolver(schema) });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <Textarea placeholder="Type your message here..." {...field} />
              {form.formState.errors.text && (
                <FormDescription className="text-destructive">
                  {form.formState.errors.text.message}
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button>
          <Send size={16} />
          Send
        </Button>
      </form>
    </Form>
  );
}
