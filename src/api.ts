import { invoke } from "@tauri-apps/api/tauri";
import { z } from "zod";
import { Role } from './components/Message';

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

export async function getSettingsOrSetDefault(): Promise<SettingsType> {
    try {
        return await getSettings();
    } catch (e) {
        const settings = await getDefaultSettings();
        await setSettings(settings);
        return settings;
    }
}

export const MessageSchema = z.object({
    id: z.number(),
    role: z.nativeEnum(Role),
    content: z.string(),
});

export type MessageType = z.infer<typeof MessageSchema>;

export const ChatRequestSchema = z.object({
    chatId: z.number(),
    messages: z.array(MessageSchema),
});

export type ChatRequestType = z.infer<typeof ChatRequestSchema>;

export const ChatResponseSchema = z.object({
    chatId: z.number(),
    messages: z.array(MessageSchema),
});

export type ChatResponseType = z.infer<typeof ChatResponseSchema>;

export async function sendChatRequest(req: ChatRequestType): Promise<ChatResponseType> {
    const res = await invoke("send_chat_request", { request: req });
    const parsed = ChatResponseSchema.parse(res);
    return parsed;
}

export const ChatSchema = z.object({
    id: z.number(),
    name: z.string().optional().nullable(),
});

export type ChatType = z.infer<typeof ChatSchema>;

export const ChatMessageSchema = z.object({
    id: z.number(),
    chatId: z.number(),
    role: z.nativeEnum(Role),
    content: z.string(),
});

export type ChatMessageType = z.infer<typeof ChatMessageSchema>;

export const ListChatsResponseSchema = z.array(ChatSchema);

export type ListChatsResponseType = z.infer<typeof ListChatsResponseSchema>;

export async function listChats(): Promise<ListChatsResponseType> {
    const res = await invoke("list_chats");
    console.debug(`listChats result: ${JSON.stringify(res)}}`);
    const parsed = ListChatsResponseSchema.parse(res);
    return parsed;
}

export const AddChatResponseSchema = z.number();

export type AddChatResponseType = z.infer<typeof AddChatResponseSchema>;

export async function addChat({ name }: { name?: string }) {
    const res = await invoke("add_chat", { name });
    console.debug(`addChat result: ${JSON.stringify(res)}}`);
    const parsed = AddChatResponseSchema.parse(res);
    return parsed;
}

export async function deleteChat({ id }: { id: number }) {
    await invoke("delete_chat", { id });
}

export const GetMessagesResponseSchema = z.array(ChatMessageSchema);

export type GetMessagesResponseType = z.infer<typeof GetMessagesResponseSchema>;

export async function getMessages({ chatId }: { chatId: number }): Promise<GetMessagesResponseType> {
    const res = await invoke("get_messages", { chatId });
    const parsed = GetMessagesResponseSchema.parse(res);
    return parsed;
}

export const AddMessageResponseSchema = z.number();

export type AddMessageResponseType = z.infer<typeof AddMessageResponseSchema>;

export async function addMessage({chatId, role, content}: {chatId: number, role: Role, content: string}): Promise<AddMessageResponseType> {
    const res = await invoke("add_message", {chatId, role, content});
    const parsed = AddMessageResponseSchema.parse(res);
    return parsed;
}

export async function deleteMessage({chatId, messageId}: {chatId: number, messageId: number}) {
    await invoke("delete_message", {
        chatId,
        id: messageId,
    });
}

