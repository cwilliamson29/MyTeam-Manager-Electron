import {create} from "zustand/react";
import {Employee, Settings} from "../interfaces/employeeInterface.tsx";
import {db} from "../helpers/db.ts";
import createSelectors from "./selectors.ts";
import {sortByFirstName, sortByLastName, sortByTimeAndLastName, sortByTimeAndName,} from "../helpers/employeeList-helpers.tsx";
import {addSettingsHelper} from "../helpers/addSettingsHelper.tsx";

// AppLoad - Determine if app has been loaded
type AppLoad = {
    appLoad: boolean;
    setAppLoad: (val: boolean) => void;
};

const appLoad = create<AppLoad>((set) => ({
    appLoad: true,
    setAppLoad: (val: boolean) => {
        set(() => ({appLoad: val}));
    },
}));

// AppSettings - Save settings from DB on app load
type AppSettings = {
    appSettings: Settings;
    setAppSettings: (role: string, data: unknown) => void;
    getAppSettings: () => void;
    saveAppSettingsDB: () => void;
};

const appSettings = create<AppSettings>((set) => ({
    appSettings: {
        id: 0,
        sortByTime: true,
        sortByFirstName: false,
        colorMode: "dark",
        hours: 24,
    },
    setAppSettings: (data, val) => {
        set((state) => ({
            ...state, // u need pass state here...
            appSettings: {...state.appSettings, [data]: val},
        }));
        useEmployeeData.getState().setEmployees();
    },
    getAppSettings: async () => {
        const result = await db.settings.toCollection().first();
        if (result === undefined) {
            console.log("No settings in db, using default");
            await addSettingsHelper(appSettings.getState().appSettings);
        } else {
            set(() => ({appSettings: result}));
        }
    },
    saveAppSettingsDB: () => {
        const val = appSettings.getState().appSettings;
        //console.log(val);
        db.settings.update(val.id, val);
    },
}));

// EmployeeData - Get and save employee data to state
type EmployeeData = {
    employees: Employee[];
    modifyID: string;
    employee: Partial<Employee>;
    note: any;
    setModifyID: (val: string) => void;
    getEmployees: () => void;
    setEmployees: () => void;
    getById: (id: string) => void;
    getNoteById: (id: string) => void;
    setEmployee: (keyValue: string, val: string) => void;
    saveEmployee: () => void;
    saveNote: (val: any) => void;
};
const employeeData = create<EmployeeData>((set) => ({
    employees: [],
    modifyID: "",
    employee: {},
    note: {id: 0, ownerID: 0, timeStamp: "", dateStamp: "", note: ""},
    setModifyID: (val) => {
        set(() => ({modifyID: val}));
    },

    getEmployees: async () => {
        const result = await db.employees.toArray();
        if (result === undefined) {
            console.log("Data not avail");
        } else {
            set(() => ({employees: result}));
        }
        employeeData.getState().setEmployees();
    },
    // setEmployees: (data) => set(() => ({employees: data}))
    setEmployees: () => {
        const sortByTime = appSettings.getState().appSettings.sortByTime;
        const sortByName = appSettings.getState().appSettings.sortByFirstName;

        const array = employeeData.getState().employees;
        if (!sortByTime && sortByName) {
            sortByFirstName(array);
        } else if (!sortByTime && !sortByName) {
            sortByLastName(array);
        } else if (sortByTime && sortByName) {
            sortByTimeAndName(array);
        } else if (sortByTime && !sortByName) {
            sortByTimeAndLastName(array);
        }
        set(() => ({employees: array}));
    },
    getById: async (id: any) => {
        let result = await db.employees.get(id);

        set(() => ({employee: result}));
        employeeData.getState().getNoteById(id);
    },
    getNoteById: async (id: any) => {
        let result = await db.notes.get({ownerID: id});
        //console.log(result);
        if (result === undefined) {
            const ownerID = id;
            const dateStamp = new Date().toLocaleDateString().toString();
            const timeStamp = new Date().toLocaleTimeString().toString();

            const note = "# Welcome World";
            try {
                // Add the note!
                await db.notes.add({
                    ownerID,
                    dateStamp,
                    timeStamp,
                    note
                });
            } catch (error) {
                if (error) throw error;
            }
            let result2 = await db.notes.get({ownerID: id});
            set(() => ({note: result2}));
        } else {
            set(() => ({note: result}));
        }
    },
    setEmployee: (keyValue, val) => {
        set((state) => ({employee: {...state.employee, [keyValue]: val}}));
    },
    saveEmployee: () => {
        // create new array and filter out old employee
        let emps = [...employeeData.getState().employees];
        let emp = employeeData.getState().employee;
        emp.firstName = emp.firstName!.toLowerCase();
        emp.lastName = emp.lastName!.toLowerCase();
        emp.email = emp.email!.toLowerCase();
        emp.EEID = emp.EEID!.toLowerCase();
        const newEmps = emps.filter((item) => item.id !== emp.id);
        //push new employee to state array
        newEmps.push(<Employee>emp);
        // Set state with new employee array
        set(() => ({employees: newEmps}));
        //  refresh state with current sorting
        employeeData.getState().setEmployees();
        // save to dexie DB
        db.employees.update(emp.id, emp);
    },
    saveNote: (val: any) => {
        const dateStamp = new Date().toLocaleDateString();
        const timeStamp = new Date().toLocaleTimeString();
        set((state) => ({
            note: {
                ...state.note,
                dateStamp: dateStamp,
                timeStamp: timeStamp,
                note: val,
            },
        }));
        // create new array and filter out old employee
        let note = employeeData.getState().note;
        // save to dexie DB
        db.notes.update(note.id, note);
    },
}));

export const useAppSettings = createSelectors(appSettings);
export const useAppLoad = createSelectors(appLoad);
export const useEmployeeData = createSelectors(employeeData);
