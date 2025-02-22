import {colorOfDay, titleCase} from "../../helpers/employeeList-helpers.tsx";

interface Props {
    id: number;
    shiftStart: string;
    shiftEnd: string;
    daysWorked: string;
    firstName: string;
    lastName: string;
    email: string;
    EEID: string;
    meetings: string;
    meetingsDay: string;
    warnings: string;
    nameSort: boolean;
}

function EmployeeList({
                          id,
                          shiftStart,
                          shiftEnd,
                          daysWorked,
                          firstName,
                          lastName,
                          email,
                          EEID,
                          meetings,
                          meetingsDay,
                          warnings,
                          nameSort,
                      }: Props) {
    const color = colorOfDay(shiftStart)

    // Arrange by First + Last ... or ... Last, First
    const firstLastName = titleCase(`${firstName + " " + lastName}`);
    const lastFirstName = titleCase(`${lastName + ", " + firstName}`);
    // TODO: `Need to fix rendering of time by 12/24 hour`
    return (
        <div key={id}
             className={color + " d-flex flex-row align-items-center border-bottom border-dark justify-content-between employee"}>
            <div className="col flex-grow-1 h-100 time">
                {shiftStart + " - " + shiftEnd}
            </div>
            <div className={"border-" + color + " col-sm h-100 days"}>{daysWorked}</div>
            <div className={"border-" + color + " col h-100 name"}>
                {nameSort ? firstLastName : lastFirstName}
            </div>
            <div className={"border-" + color + " col h-100 email"}>{email}</div>
            <div className={"border-" + color + " col h-100 EEID"}>{EEID.toUpperCase()}</div>
            <div className={"border-" + color + " col h-100 meetings"}>
                {meetings === "none" ? "" : titleCase(meetings + " on " + meetingsDay)}
            </div>
            <div
                className={warnings === "none" ? "col h-100 empWarningsNONE" : "col h-100 empWarnings"}>
                {warnings.toUpperCase()}
            </div>
        </div>
    );
}

export default EmployeeList;
