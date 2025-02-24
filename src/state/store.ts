import {create} from "zustand/react";
import {Settings} from "../interfaces/employeeInterface.tsx";
import {db} from "../helpers/db.ts";
import createSelectors from './selectors.ts'


// AppLoadStore - Determine if app has been loaded
type AppLoadStore = {
    appLoad: boolean;
    setAppLoad: (val: boolean) => void;
}

export const useAppLoadStore = create<AppLoadStore>((set) => ({
    appLoad: true,
    setAppLoad: (val: boolean) => {
        set(() => ({appLoad: val}))
    },
}))

// AppSettings - Save settings from DB on app load
type AppSettings = {
    appSettings: Settings;
    setAppSettings: (role: string, data: unknown) => void;
    getAppSettings: () => void;
    saveAppSettingsDB: () => void;
}

const appSettings = create<AppSettings>((set) => ({
    appSettings: {
        id: 0,
        sortByTime: true,
        sortByFirstName: false,
        colorMode: '',
        hours: 24,
    },
    setAppSettings: (data, val) =>
        set((state) => ({
            ...state, // u need pass state here...
            appSettings: {...state.appSettings, [data]: val},
        })),
    getAppSettings: async () => {
        const result = await db.settings.toCollection().first();
        if (result === undefined) {
            console.log("No settings in db, using default")
        } else {
            set(() => ({appSettings: result}))
        }
    },
    saveAppSettingsDB: () => {
        const val = appSettings.getState().appSettings
        console.log(val)
        db.settings.update(val.id, val)
    }
}))

export const useAppSettings = createSelectors(appSettings)