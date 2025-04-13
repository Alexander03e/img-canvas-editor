export const generateBlob = async (file?: File) => {
    if (!file) return null;
    try {
        const arrayBuffer = await file.arrayBuffer();

        return new Blob([arrayBuffer], { type: file.type });
    } catch (error) {
        console.error('Ошибка при создании Blob:', error);
        return null;
    }
};
