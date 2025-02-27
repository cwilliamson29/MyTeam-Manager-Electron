import {addEmployeeHelper} from "./addEmployeeHelper.tsx";
import {Employee} from "../interfaces/employeeInterface.tsx";

interface dummyEmployee {
    dummyEmp: Employee[]
}

export const AddDummyData = () => {
    for (let i = 0; i < dummyData2.length; i++) {
        addEmployeeHelper(dummyData2[i])
    }
}

const dummyData2 = [
    {
        shiftStart: "11:00",
        shiftEnd: "19:00",
        daysWorked: "--TWRFY",
        firstName: "jane",
        lastName: "goodall",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
    {
        shiftStart: "11:00",
        shiftEnd: "19:00",
        daysWorked: "--TWRFY",
        firstName: "ashton",
        lastName: "fafo",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
    {
        shiftStart: "10:00",
        shiftEnd: "18:00",
        daysWorked: "--TWRFY",
        firstName: "abby",
        lastName: "broccoli",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
    {
        shiftStart: "13:00",
        shiftEnd: "21:00",
        daysWorked: "S-TW-FY",
        firstName: "teddy",
        lastName: "roosevelt",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
    {
        shiftStart: "06:00",
        shiftEnd: "15:00",
        daysWorked: "--TWRFY",
        firstName: "brock",
        lastName: "johnson",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "none",
        meetingsDay: "none",
        warnings: "written"
    },
    {
        shiftStart: "06:00",
        shiftEnd: "15:00",
        daysWorked: "--TWRFY",
        firstName: "ashley",
        lastName: "bickers",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
    {
        shiftStart: "06:00",
        shiftEnd: "15:00",
        daysWorked: "--TWRFY",
        firstName: "zedbra",
        lastName: "georgiason",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
    {
        shiftStart: "14:00",
        shiftEnd: "23:00",
        daysWorked: "--TWRFY",
        firstName: "geniva",
        lastName: "convention",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
    {
        shiftStart: "15:00",
        shiftEnd: "02:00",
        daysWorked: "--TWRFY",
        firstName: "thomas",
        lastName: "crickethall",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
    {
        shiftStart: "15:00",
        shiftEnd: "02:00",
        daysWorked: "--TWRFY",
        firstName: "patty",
        lastName: "headbetter",
        email: "jgoodall@work.com",
        EEID: "ccrcbland",
        meetings: "bi-weekly",
        meetingsDay: "wednesday",
        warnings: "written"
    },
]
