
export interface IChatSummary {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
}

export interface IChatDetails {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    model: string;
    fromTemplate?: {
        id: string;
        name: string;
    };
    messages: IMessage[];
}

export interface IChatSettings {
    model: string;
}

export interface IMessage {
    id: string;
}

export enum UserRole {
    User = 'user',
    Assistant = 'assistant',
    System = 'system',
    Function = 'function',
}
