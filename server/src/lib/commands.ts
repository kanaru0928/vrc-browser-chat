import { invoke } from "@tauri-apps/api/core";
import { InferType, number, object, Schema, string } from "yup";

type Command = {
  command: string;
  args: Schema;
  returnType?: Schema;
};

export const oscConnectCommand = {
  command: "osc_connect",
  args: object({
    address: string(),
    port: number().required().min(1).max(65535),
  }),
} satisfies Command;

export const oscSendChatboxCommand = {
  command: "osc_send_chatbox",
  args: object({
    text: string().required(),
  }),
} satisfies Command;

export const oscDisconnectCommand = {
  command: "osc_disconnect",
  args: object({}),
} satisfies Command;

export const webStartServerCommand = {
  command: "web_start_server",
  args: object({}),
};

export async function invokeCommand<T extends Command>(
  command: T,
  args: InferType<T["args"]>
): Promise<
  T["returnType"] extends Schema<any, any, any, any>
    ? InferType<T["returnType"]>
    : unknown
> {
  const result = await invoke(command.command, args);
  const validatedResult = command.returnType?.validate(result) ?? result;

  return validatedResult as T["returnType"] extends Schema<any, any, any, any>
    ? InferType<T["returnType"]>
    : void;
}
