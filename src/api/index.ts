
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
    messages: IMessage[];
}

export interface IChatSettings {
    model: string;
}

export interface IMessage {
    id: string;
}
