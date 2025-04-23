import { ImageProcessor } from '@Shared/utils/imageProcessor.ts';

export class GB7ImageProcessor extends ImageProcessor {
    private width: number = 0;
    private height: number = 0;
    private hasMask: boolean = false;
    private version: number = 0;

    async getImageInfo() {
        await this.parseHeader();
        return {
            width: String(this.width),
            height: String(this.height),
            colorDepth: this.hasMask ? '8' : '7',
            format: 'GB7',
            version: String(this.version),
            hasMask: this.hasMask,
        };
    }

    async getImageData(): Promise<ImageData> {
        const arrayBuffer = await this.blob.arrayBuffer();
        const dataView = new DataView(arrayBuffer);

        await this.parseHeader(dataView);

        const imageData = new ImageData(this.width, this.height);
        const pixelData = imageData.data;

        let offset = 12; // Skip header

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const pixel = dataView.getUint8(offset++);
                // const grayValue = (pixel & 0x7f) << 1; для расширения диапазона в 2 раза сдвиг на 1 бит влево
                const grayValue = (pixel & 0x7f) << 0; // диапазон не расширяется, поэтому пиксели остаются серыми
                const isMasked = this.hasMask && (pixel & 0x80) === 0;

                const idx = (y * this.width + x) * 4;

                pixelData.set([grayValue, grayValue, grayValue, isMasked ? 0 : 255], idx);
            }
        }

        return imageData;
    }

    private async parseHeader(dataView?: DataView): Promise<void> {
        if (this.width && this.height) return;

        const buffer = dataView ?? new DataView(await this.blob.arrayBuffer());

        const signature = [
            buffer.getUint8(0),
            buffer.getUint8(1),
            buffer.getUint8(2),
            buffer.getUint8(3),
        ];

        if (
            signature[0] !== 0x47 ||
            signature[1] !== 0x42 ||
            signature[2] !== 0x37 ||
            signature[3] !== 0x1d
        ) {
            throw new Error('Invalid GB7 file format');
        }

        this.version = buffer.getUint8(4);
        const flags = buffer.getUint8(5);
        this.width = buffer.getUint16(6, false);
        this.height = buffer.getUint16(8, false);
        this.hasMask = (flags & 0x01) === 0x01;
    }
}
