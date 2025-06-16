"use client";

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <Textarea
                    placeholder="Type your message here..."
                    {...field}
                  />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button>
              <Send size={16} />
              Send
            </Button>
          </div>
        </div>
        {form.formState.errors.text && (
          <FormDescription className="text-destructive">
            {form.formState.errors.text.message}
          </FormDescription>
        )}
      </form>
    </Form>
  );
}
