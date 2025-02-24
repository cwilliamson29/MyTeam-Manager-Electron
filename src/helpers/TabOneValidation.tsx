import {Employee, EmployeeValidation} from "../interfaces/employeeInterface.tsx";
import {employeeBooleanTemplate} from "./appSettings.tsx";

export function EmployeeValidator(employee: Employee) {
    let result: boolean = true
    let error: EmployeeValidation = employeeBooleanTemplate;
    // Determine if values sent from submit are blank
    if (employee.shiftStart === "") {
        result = false;
        error.shiftStart = true;
    }
    if (employee.shiftEnd === "") {
        result = false;
        error.shiftEnd = true;
    }
    if (employee.daysWorked === "") {
        result = false;
        error.daysWorked = true;
    }
    if (employee.firstName === "") {
        result = false;
        error.firstName = true;
    }
    if (employee.lastName === "") {
        result = false;
        error.lastName = true;
    }
    if (employee.email === "") {
        result = false;
        error.email = true;
    }
    if (employee.EEID === "") {
        result = false;
        error.EEID = true;
    }
    if (employee.meetings === "") {
        result = false;
        error.meetings = true;
    }
    if (employee.meetingsDay === "") {
        result = false;
        error.meetingsDay = true;
    }
    if (employee.warnings === "") {
        result = false;
        error.warnings = true;
    }

    console.log("Validation")
    console.log(employee)

    return {result: result, error: error};
}
