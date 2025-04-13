export interface IImageInfo {
    width: string;
    height: string;
    colorDepth?: string;
    format?: string;
    fileName?: string;
    version?: string;
    hasMask?: boolean;
}

export type ImageSource = {
    imageData: ImageData | null;
    width: number;
    height: number;
    type: 'image' | 'graybit7';
    url?: string;
};
