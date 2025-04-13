import { Button, Flex } from 'antd';
import { useAppStore } from '@App';
import isNil from 'lodash/isNil';
import { CSSProperties } from 'react';
import { isEmpty } from 'lodash';

export const Toolbar = ({ style }: { style?: CSSProperties }) => {
    const clear = useAppStore(state => state.clearCanvas);
    const uploadedImage = useAppStore(state => state.uploadedImage);
    const imageInfo = useAppStore(state => state.imageInfo);
    const fileName = useAppStore(state => state.fileName);

    if (isNil(uploadedImage) || isEmpty(imageInfo)) {
        return null;
    }

    return (
        <Flex
            style={{
                borderRadius: 8,
                background: 'rgba(28, 21, 19, 0.7)',
                backdropFilter: 'blur(20px)',
                padding: '10px 12px',
                gap: 12,
                bottom: 20,
                alignItems: 'flex-start',
                color: 'white',
                ...style,
            }}
            vertical
        >
            <Flex vertical gap={8}>
                <p>W: {imageInfo?.width}</p>
                <p>H: {imageInfo?.height}</p>
                <p>Глубина: {imageInfo?.colorDepth}</p>
                <p>{fileName}</p>
            </Flex>
            <Button style={{ width: '100%' }} type={'primary'} size={'small'} onClick={clear}>
                Очистить холст
            </Button>
        </Flex>
    );
};
