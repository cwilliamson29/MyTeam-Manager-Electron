import { Employee } from "../employeeInterface.tsx";
import {db} from "./db.ts";

export const addEmployeeHelper = (empl: Employee) => {
    const shiftStart = empl.shiftStart;
    const shiftEnd = empl.shiftEnd;
    const daysWorked=empl.daysWorked;
    const firstName= empl.firstName;
    const lastName  = empl.lastName;
    const email = empl.email;
    const EEID = empl.EEID;
    const meetings = empl.meetings;
    const meetingsDay = empl.meetingsDay;
    const warnings = empl.warnings;

    async function addFriend() {
        try {
        // Add the new friend!
            await db.employees.add({
            shiftStart, shiftEnd, daysWorked, firstName, lastName, email, EEID, meetings, meetingsDay, warnings
            });
        } catch (error) {
            if(error) throw error
        }
    }
    return addFriend();
}
