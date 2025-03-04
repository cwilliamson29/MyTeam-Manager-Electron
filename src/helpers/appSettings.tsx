import {EmployeeValidation} from "../interfaces/employeeInterface.tsx";
import {db} from "./db.ts";

export async function GetSettings() {
    //const loadSettings = useAppSettings((state) => state.setAppSettings)
    const result = await db.settings.toCollection().first();
    //const result = await collection.first();

    if (result === undefined) {
        const temp = {
            sortByTime: false,
            sortByFirstName: true,
            colorMode: 'dark',
            hours: 24,
        }
        await db.settings.add(temp)
        return temp
    } else {
        return result
    }
}

export const settingsTemplate = {
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
export const civiTimes = ["01:00 AM", "01:30 AM", "02:00 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"]
export const militaryTimes = ["01:00", "01:30", "02:00", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", '13:00', '13:30', "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]
export const startTimes = ["06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"]
export const endTimes = ["03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM"]
export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "NONE"]
export const meetingBasis = ["Weekly", "Bi-Weekly", "Monthly", "NONE"]
export const warnings = ["Verbal", "Written", "FWW", "NONE"]