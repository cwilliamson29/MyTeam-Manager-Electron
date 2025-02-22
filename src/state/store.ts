import {create} from "zustand/react";

type AppLoadStore = {
    appLoad: boolean;
    setAppLoad: () => void;
}

export const useAppLoadStore = create<AppLoadStore>((set) => ({
    appLoad: true,
    setAppLoad: () => {
        set((state) => ({appLoad: !state.appLoad}))
    },
}))