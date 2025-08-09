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
import { useTranslation } from "react-i18next";

export function ServerRestartForm() {
  const { t } = useTranslation();
  const schema = object({
    port: number()
      .typeError(t("portMustBeNumber"))
      .required(t("portRequired"))
      .min(1, t("portGreaterThanZero"))
      .max(65535, t("portLessThanMax"))
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
              <FormLabel>{t("serverPort")}</FormLabel>
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
          {t("restart")}
        </Button>
      </form>
    </Form>
  );
}
