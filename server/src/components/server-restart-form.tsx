import {
  invokeCommand,
  webStartServerCommand,
  webStopServerCommand,
} from "@/lib/commands";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InferType, number, object } from "yup";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";

export function ServerRestartForm() {
  const schema = object({
    port: number()
      .typeError("Port must be a number")
      .required("Port is required")
      .min(1, "Port must be greater than 0")
      .max(65535, "Port must be less than or equal to 65535")
      .default(11087),
  });

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: InferType<typeof schema>) => {
    try {
      await invokeCommand(webStopServerCommand, {});
    } finally {
      await invokeCommand(webStartServerCommand, {
        port: data.port,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server Port</FormLabel>
              <FormControl>
                <Input defaultValue={11087} placeholder="11087" {...field} />
              </FormControl>
              {form.formState.errors.port && (
                <FormDescription className="text-destructive">
                  {form.formState.errors.port?.message as string}
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          Restart
        </Button>
      </form>
    </Form>
  );
}
