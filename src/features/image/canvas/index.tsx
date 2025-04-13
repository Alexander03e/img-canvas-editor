import { useAppStore } from '@App';
import { useEffect, useRef } from 'react';
import isNil from 'lodash/isNil';
import { Empty, message } from 'antd';
import { imageProcessorFactory } from '@Features/image/canvas/helper.ts';

export const ImageCanvas = () => {
    const uploadedImage = useAppStore(state => state.uploadedImage);
    const setImageInfo = useAppStore(state => state.setImageInfo);
    const fileName = useAppStore(state => state.fileName);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const renderImage = async (blob: Blob) => {
        if (!canvasRef.current) return;

        try {
            const processor = imageProcessorFactory.create(blob, fileName);
            const [imageData, imageInfo] = await Promise.all([
                processor.getImageData(),
                processor.getImageInfo(),
            ]);

            setImageInfo(imageInfo);

            const canvas = canvasRef.current;
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            const ctx = canvas.getContext('2d')!;
            ctx.putImageData(imageData, 0, 0);
        } catch (error) {
            message.error('Failed to process image');
            console.error(error);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (uploadedImage && canvas) {
            renderImage(uploadedImage);
        }
    }, [uploadedImage, canvasRef]);

    if (isNil(uploadedImage)) {
        return (
            <Empty
                description={'Пустой холст'}
                style={{
                    flexDirection: 'column',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
        );
    }
    return (
        <div
            ref={containerRef}
            style={{
                display: 'flex',
                overflow: 'auto',
                position: 'relative',
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <canvas
                style={{ margin: 'auto', height: '100%', objectFit: 'contain' }}
                ref={canvasRef}
            />
        </div>
    );
};
