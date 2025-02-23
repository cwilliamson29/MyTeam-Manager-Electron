import {create} from "zustand/react";
import {Settings} from "../interfaces/employeeInterface.tsx";

// AppLoadStore - Determine if app has been loaded
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

// AppSettings - Save settings from DB on app load
type AppSettings = {
    appSettings: Settings;
    setAppSettings: (data: Settings) => void;
}

export const useAppSettings = create<AppSettings>((set) => ({
    appSettings: {
        id: 0,
        sortByTime: false,
        sortByFirstName: false,
        colorMode: '',
        hours: 24,
    },
    setAppSettings: (data: Settings) => {
        set(() => ({appSettings: data}))
    },
}))