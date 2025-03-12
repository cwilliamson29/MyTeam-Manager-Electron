import Dexie, { type EntityTable } from "dexie";
import { Employee, Notes, Settings } from "../interfaces/employeeInterface.tsx";

export const db = new Dexie("EmployeeDatabase") as Dexie & {
  employees: EntityTable<Employee, "id">;
  settings: EntityTable<Settings, "id">;
  notes: EntityTable<Notes, "id">;
};

// Schema declaration:
db.version(1).stores({
  employees:
    "++id, shiftStart, shiftEnd, daysWorked, firstName, lastName, email, EEID, meetings, meetingsDay, warnings",
  settings: "++id, sortByTime, sortByName, colorMode, hours",
  notes: "++id, ownerID, dateStamp, timeStamp, note",
});
