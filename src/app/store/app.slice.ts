import { StateCreator } from 'zustand/vanilla';
import { IImageInfo } from '@Shared/types/image.ts';

interface IState {
    siderCollapsed: boolean;
    uploadedImage?: Blob;
    imageInfo?: IImageInfo;
    fileName?: string;
}

interface IAction {
    setSiderCollapsed: (value: boolean) => void;
    setImageInfo: (info: IImageInfo) => void;
    setUploaded: (data?: Blob) => void;
    clearCanvas: () => void;
    setFileName: (name?: string) => void;
}

export type TAppSlice = IState & IAction;

export const appSlice: StateCreator<TAppSlice, [['zustand/devtools', never]], []> = set => ({
    siderCollapsed: false,
    uploadedImage: undefined,
    imageInfo: undefined,
    fileName: undefined,

    setFileName: fileName => set({ fileName }),
    setImageInfo: imageInfo => set({ imageInfo }),
    clearCanvas: () => {
        set({ uploadedImage: undefined, imageInfo: undefined });
    },
    setUploaded: image => set({ uploadedImage: image }),
    setSiderCollapsed: value => set({ siderCollapsed: value }),
});
