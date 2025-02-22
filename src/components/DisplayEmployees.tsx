import EmployeeList from "./employeeListComponents/EmployeeList.tsx";
import {Employee} from "../interfaces/employeeInterface.tsx";

interface Props {
    data: Employee[];
    timeAndNameSort: boolean;
}

export const DisplayEmployees = ({data, timeAndNameSort}: Props) => {

    return (
        <>
            {data.map((emp: Employee) => {
                return <EmployeeList
                    key={emp.id}
                    id={emp.id}
                    shiftStart={emp.shiftStart}
                    shiftEnd={emp.shiftEnd}
                    daysWorked={emp.daysWorked}
                    firstName={emp.firstName}
                    lastName={emp.lastName}
                    email={emp.email}
                    EEID={emp.EEID}
                    meetings={emp.meetings}
                    meetingsDay={emp.meetingsDay}
                    warnings={emp.warnings}
                    nameSort={timeAndNameSort}
                />
            })}
        </>

    );
};
