export interface IClipboardResponse {
    isSuccess: boolean;
    content?: string;
    event?: Event;
    successMessage?: string;
}

export interface ClipboardParams {
    cleanUpAfterCopy?: boolean;
}
