import { useEffect, useState } from 'react';
import { Button, Modal, Upload, message, Spin } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useAppStore } from '@App';
import head from 'lodash/head';
import size from 'lodash/size';
import { generateBlob } from '@Shared/utils/generateBlob.ts';

export const UploadImage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState(false);
    const setUploaded = useAppStore(state => state.setUploaded);
    const setFileName = useAppStore(state => state.setFileName);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFileList([]);
    };

    const handleOk = async () => {
        if (size(fileList) === 0) {
            message.warning('Необходимо выберать файл для загрузки');
            return;
        }

        const currentFile = head(fileList);
        try {
            setLoading(true);
            const blob = await generateBlob(currentFile as unknown as File);
            setUploaded(blob as Blob);
            setFileName(currentFile?.name);
            setIsModalOpen(false);
            message.success('Файл добавлен');
        } catch {
            message.error('upload error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isModalOpen) {
            setFileList([]);
        }
    }, [isModalOpen]);

    const uploadProps: UploadProps = {
        maxCount: 1,
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: file => {
            setFileList([file]);
            return false;
        },
        fileList,
        accept: '.jpg,.jpeg,.png,.gb7',
        showUploadList: {
            showPreviewIcon: true,
            showRemoveIcon: true,
        },
    };

    return (
        <>
            <Button icon={<PlusOutlined />} onClick={showModal}>
                Загрузить изображение
            </Button>

            <Modal
                title='Загрузка изображения'
                open={isModalOpen}
                destroyOnClose
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Загрузить'
                cancelText='Отмена'
            >
                <Spin spinning={loading}>
                    <Upload.Dragger {...uploadProps}>
                        <p className='ant-upload-drag-icon'>
                            <UploadOutlined />
                        </p>
                        <p className='ant-upload-text'>Нажмите или перетащите файл в эту область</p>
                        <p className='ant-upload-hint'>Поддерживаются форматы: .png, .jpg, .gb7</p>
                    </Upload.Dragger>
                </Spin>
            </Modal>
        </>
    );
};
