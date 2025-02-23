import Dexie, {type EntityTable} from "dexie";
import {Employee, Settings} from "../employeeInterface.tsx";

export const db = new Dexie("EmployeeDatabase") as Dexie & {
    employees: EntityTable<Employee, "id">;
    settings: EntityTable<Settings, "id">;
};

// Schema declaration:
db.version(1).stores({
    employees: "++id, shiftStart, shiftEnd, daysWorked, firstName, lastName, email, EEID, meetings, meetingsDay, warnings",
    settings: "++id, dataSaved, sortByTime, sortByName, colorMode, hours",
});