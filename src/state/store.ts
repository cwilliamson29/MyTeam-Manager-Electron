import {create} from "zustand/react";
import {Employee, Settings} from "../interfaces/employeeInterface.tsx";
import {db} from "../helpers/db.ts";
import createSelectors from './selectors.ts'
import {sortByFirstName, sortByLastName, sortByTimeAndLastName, sortByTimeAndName} from "../helpers/employeeList-helpers.tsx";


// AppLoad - Determine if app has been loaded
type AppLoad = {
    appLoad: boolean;
    setAppLoad: (val: boolean) => void;
}

const appLoad = create<AppLoad>((set) => ({
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
    setAppSettings: (data, val) => {
        set((state) => ({
            ...state, // u need pass state here...
            appSettings: {...state.appSettings, [data]: val},
        }))
        useEmployeeData.getState().setEmployees()
    },
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
        //console.log(val)
        db.settings.update(val.id, val)
    }
}))

// EmployeeData - Get and save employee data to state
type EmployeeData = {
    employees: Employee[];
    modifyID: string;
    employee: any;
    setModifyID: (val: string) => void;
    getEmployees: () => void;
    setEmployees: () => void;
    getById: (id: string) => void;
}
const employeeData = create<EmployeeData>((set) => ({
    employees: [],
    modifyID: '',
    employee: '',
    setModifyID: (val) => {
        set(() => ({modifyID: val}))
    },
    getEmployees: async () => {
        const result = await db.employees.toArray();
        if (result === undefined) {
            console.log("Data not avail")
        } else {
            set(() => ({employees: result}))
        }
        employeeData.getState().setEmployees()
    },
    // setEmployees: (data) => set(() => ({employees: data}))
    setEmployees: () => {
        const sortByTime = appSettings.getState().appSettings.sortByTime
        const sortByName = appSettings.getState().appSettings.sortByFirstName

        const array = employeeData.getState().employees
        if (!sortByTime && sortByName) {
            sortByFirstName(array);
        } else if (!sortByTime && !sortByName) {
            sortByLastName(array);
        } else if (sortByTime && sortByName) {
            sortByTimeAndName(array);
        } else if (sortByTime && !sortByName) {
            sortByTimeAndLastName(array)
        }
        set(() => ({employees: array}))
    },
    getById: async (id: any) => {
        let result = await db.employees.get(id)

        set(() => ({employee: result}))
    }
}))

export const useAppSettings = createSelectors(appSettings)
export const useAppLoad = createSelectors(appLoad)
export const useEmployeeData = createSelectors(employeeData)