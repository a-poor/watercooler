
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

export function userRoleToTxt(role: UserRole): string {
    if (role === UserRole.User) { 
        return "User";
    }
    if (role === UserRole.Assistant) { 
        return "Assistant";
    }
    if (role === UserRole.System) { 
        return "System";
    }
    if (role === UserRole.Function) { 
        return "Function";
    }
    throw new Error(`Unknown role: ${role}`);
}

export function userRoleFromTxt(role: string): UserRole {
    const rs = role.toLowerCase().trim();
    if (rs === "user") { 
        return UserRole.User;
    }
    if (rs === "assistant") { 
        return UserRole.Assistant;
    }
    if (rs === "system") { 
        return UserRole.System;
    }
    if (rs === "function") { 
        return UserRole.Function;
    }
    throw new Error(`Unknown role: ${role}`);
}
