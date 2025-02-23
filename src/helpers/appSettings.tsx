import {EmployeeValidation} from "../interfaces/employeeInterface.tsx";
import {db} from "./db.ts";
import {useAppSettings} from "../state/store.ts";

// TODO: `Need to add settings functionality
export async function GetSettings() {
    const loadSettings = useAppSettings((state) => state.setAppSettings)
    const collection = db.settings.toCollection();
    const result = await collection.first();

    if (result === undefined) {
        await db.settings.add({
            sortByTime: false,
            sortByFirstName: true,
            colorMode: 'dark',
            hours: 24,
        })
        //console.log("result is: " + result)
    } else {
        // console.log("failed: ")
        // console.log(result)
        loadSettings(result)
    }
}

export let settingsTemplate = {

    id: 0,
    sortByTime: false,
    sortByFirstName: true,
    colorMode: 'dark',
    hours: 24,
}

export const employeeBooleanTemplate: EmployeeValidation = {
    shiftStart: false,
    shiftEnd: false,
    daysWorked: false,
    firstName: false,
    lastName: false,
    email: false,
    EEID: false,
    meetings: false,
    meetingsDay: false,
    warnings: false
}

export const employeeTemplate = {
    id: 0,
    shiftStart: '',
    shiftEnd: '',
    daysWorked: '',
    firstName: '',
    lastName: '',
    email: '',
    EEID: '',
    meetings: '',
    meetingsDay: '',
    warnings: ''
}

export const startTimes = ["06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"]
export const endTimes = ["03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM"]
export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export const meetingBasis = ["Weekly", "Bi-Weekly", "Monthly", "NONE"]
export const warnings = ["Verbal", "Written", "Final Written", "NONE"]