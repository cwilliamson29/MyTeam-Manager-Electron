import {read, utils} from "xlsx";
import {Employee} from "../interfaces/employeeInterface.tsx";
import {timeConvertT024} from "./employeeList-helpers.tsx";

// interface Props {
//     e: any;
//     val: any;
//     TL: string;
//     setEmployees: (value: any) => void
// }

export async function processFile(e: any, val: any, TL: string, setEmployees: (value: any) => void) {
    e.preventDefault()
    const file = await val.arrayBuffer();
    const workbook = read(file);
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(ws);

    let employees: Employee[] = [];
    let selectedTL = TL;
    console.log(TL)
    data.map((emps: any) => {
        const keys = Object.keys(emps);
        if (emps.TL.toLocaleLowerCase() === TL) {
            let emp: Employee = {};
            let shiftStart;
            let shiftEnd;
            let shift = emps[keys[0]]
            let sep = shift.indexOf('-')
            shiftStart = shift.slice(0, sep).trim()
            console.log(shiftStart)

            emp.shiftStart = timeConvertT024(shiftStart)
            emp.shiftEnd = emps[keys[0]].toLowerCase() as string;
            emp.daysWorked = emps[keys[1]] as string;
            emp.firstName = emps[keys[2]].toLowerCase() as string;
            emp.lastName = emps[keys[3]].toLowerCase() as string;
            emp.email = emps[keys[5]].toLowerCase() as string;
            emp.EEID = emps[keys[4]].toLowerCase() as string;
            emp.meetings = "none";
            emp.meetingsDay = "none";
            emp.warnings = "none";

            employees.push(emp);
        }
    });
    console.log(employees)
    setEmployees(employees)
}

export async function processTL(e: any, tLeads: any, setTeamLeads: (value: any) => void) {
    e.preventDefault()
    const file = await tLeads.arrayBuffer();
    const workbook = read(file);
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(ws);

    let TL: string[] = [];
    data.map((emp: any) => {
        if (TL.includes(emp.TL)) {
            return;
        } else {
            TL.push(emp.TL);
        }
    });

    setTeamLeads(TL)
}