import Dexie, { type EntityTable } from "dexie";
import {Employee} from "../employeeInterface.tsx";

export const db = new Dexie("EmployeeDatabase") as Dexie & {
    employees: EntityTable<
        Employee,
        "id" // primary key "id" (for the typings only)
    >;
};

// Schema declaration:
db.version(1).stores({
    employees: "++id, shiftStart, shiftEnd, daysWorked, firstName, lastName, email, EEID, meetings, meetingsDay, warnings", // primary key "id" (for the runtime!)
});