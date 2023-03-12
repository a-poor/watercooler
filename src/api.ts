import { invoke } from "@tauri-apps/api/tauri";
import { z } from "zod";

export const SettingsSchema = z.object({
    apiBaseUrl: z.string(),
    model: z.string(),
    apiToken: z.string(),
    systemPrompt: z.string(),
});

export type SettingsType = z.infer<typeof SettingsSchema>;

export async function getDefaultSettings(): Promise<SettingsType> {
    const res = await invoke("get_default_settings");
    const parsed = SettingsSchema.parse(res);
    return parsed;
}

export async function getSettings(): Promise<SettingsType> {
    const res = await invoke("get_settings");
    const parsed = SettingsSchema.parse(res);
    return parsed;
}

export async function setSettings(settings: SettingsType): Promise<void> {
    await invoke("set_settings", { settings });
}

export const MessageSchema = z.object({
    id: z.string(),
    role: z.string(),
    content: z.string(),
});

export type MessageType = z.infer<typeof MessageSchema>;

export const ChatRequestSchema = z.object({
    chatId: z.string(),
    messages: z.array(MessageSchema),
});

export type ChatRequestType = z.infer<typeof ChatRequestSchema>;

export const ChatResponseSchema = z.object({
    chatId: z.string(),
    messages: z.array(MessageSchema),
});

export type ChatResponseType = z.infer<typeof ChatResponseSchema>;

export async function sendChatRequest(req: ChatRequestType): Promise<ChatResponseType> {
    const res = await invoke("send_chat_request", { request: req });
    const parsed = ChatResponseSchema.parse(res);
    return parsed;
}

