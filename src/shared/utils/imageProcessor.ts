import { IImageInfo } from '@Shared/types/image.ts';

export abstract class ImageProcessor {
    protected blob: Blob;

    constructor(blob: Blob) {
        this.blob = blob;
    }

    abstract getImageInfo(): Promise<IImageInfo>;

    abstract getImageData(): Promise<ImageData>;
}

export class StandardImageProcessor extends ImageProcessor {
    async getImageInfo(): Promise<IImageInfo> {
        const img = await this.createImageElement();
        return {
            width: String(img.width),
            height: String(img.height),
            colorDepth: '32', // RGBA
            format: this.blob.type,
        };
    }

    async getImageData(): Promise<ImageData> {
        const img = await this.createImageElement();
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, img.width, img.height);
    }

    private createImageElement(): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(this.blob);
        });
    }
}
