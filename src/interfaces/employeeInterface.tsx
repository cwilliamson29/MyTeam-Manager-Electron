export interface Employee {
    id: number,
    shiftStart: string,
    shiftEnd: string,
    daysWorked: string,
    firstName: string,
    lastName: string,
    email: string,
    EEID: string,
    meetings: string,
    meetingsDay: string,
    warnings: string
}

export interface EmployeeValidation {
    shiftStart: boolean,
    shiftEnd: boolean,
    daysWorked: boolean,
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    EEID: boolean,
    meetings: boolean,
    meetingsDay: boolean,
    warnings: boolean
}

// interface goes to EmployeeListTitle to allow sorting by time and name
export interface EmployeeSorting {
    time: boolean;
    firstName: boolean;
}

// interface goes to employeeListTitle to allow managing CSS and sorting boolean
export interface SortClick {
    css: string;
    sort: boolean;
}



