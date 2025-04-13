import { appSlice, TAppSlice } from './app.slice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TStore = TAppSlice;

export const useAppStore = create<TStore>()(
    devtools((...args) => ({ ...appSlice(...args) }), {
        name: 'app-storage',
    }),
);
