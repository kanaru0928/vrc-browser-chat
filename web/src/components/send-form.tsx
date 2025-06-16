"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, object, string } from "yup";
import { Button } from "./ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface SendFormValues {
  onSend?: (text: string) => void;
}

export function SendForm({ onSend = () => {} }: SendFormValues) {
  const schema = object({
    text: string().required("Message is required"),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: { text: "" },
  });

  const onSubmit = async (data: InferType<typeof schema>) => {
    const response = await fetch("/api/chatbox", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: data.text }),
    });
    if (!response.ok) {
      toast.error("Failed to send message", {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      return;
    }
    onSend(data.text);
    form.reset();
  };

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
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
