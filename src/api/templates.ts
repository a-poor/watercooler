import zod from "zod";
import { invoke } from "@tauri-apps/api";

/**
 * Return a list of the user's templates.
 */
export async function listTemplates() {
    throw new Error("Not implemented");
}

// /**
//  * Create a new chat template.
//  */
// export async function createTemplate() {
//     throw new Error("Not implemented");
// }

/**
 * Create a new chat template from an existing chat.
*/
export async function createTemplateFromChat() {
    throw new Error("Not implemented");
}

/**
 * Mark a template as archived.
 */
export async function archiveTemplate() {
    throw new Error("Not implemented");
}

/**
 * Mark an archived template as unarchived.
 */
export async function unarchiveTemplate() {
    throw new Error("Not implemented");
}

/**
 * Permanently delete a template.
 */
export async function deleteTemplate() {
    throw new Error("Not implemented");
}

/**
 * Duplicate a template.
 */
export async function duplicateTemplate() {
    throw new Error("Not implemented");
}

/**
 * Rename a template.
 */
export async function renameTemplate() {
    throw new Error("Not implemented");
}

export async function getTemplateSettings() {
    throw new Error("Not implemented");
}

export async function updateTemplateSettings() {
    throw new Error("Not implemented");
}

export async function copyTemplateCellText() {
    throw new Error("Not implemented");
}

export async function editTemplateCellText() {
    throw new Error("Not implemented");
}

export async function deleteTemplateCell() {
    throw new Error("Not implemented");
}

export async function duplicateTemplateCell() {
    throw new Error("Not implemented");
}

export async function insertTemplateCellAbove() {
    throw new Error("Not implemented");
}

export async function insertTemplateCellBelow() {
    throw new Error("Not implemented");
}

export async function moveTemplateCellUp() {
    throw new Error("Not implemented");
}

export async function moveTemplateCellDown() {
    throw new Error("Not implemented");
}

/**
 * Set the role of the given message cell in a template.
 */
export async function updateTemplateMessageRole() {
    throw new Error("Not implemented");
}

/**
 * "Send" a new message to the chat template.
 */
export async function sendTemplateMessage() {
    throw new Error("Not implemented");
}
