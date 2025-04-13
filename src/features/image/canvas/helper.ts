import { ImageProcessor, StandardImageProcessor } from '@Shared/utils/imageProcessor.ts';
import { GB7ImageProcessor } from '@Shared/utils/gb7Processor.ts';

export class imageProcessorFactory {
    static create(blob: Blob, fileName?: string): ImageProcessor {
        if (fileName?.endsWith('.gb7')) {
            return new GB7ImageProcessor(blob);
        }
        return new StandardImageProcessor(blob);
    }
}
