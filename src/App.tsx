import EmployeeList from "./components/EmployeeList";
import EmployeeListTitle from "./components/EmployeeListTitle";
import {dummyData2} from "./helpers/dummyData";
import React from "react";
import { EmployeeSorting} from "./interfaces/employeeInterface";
import {
    sortByFirstName,
    sortByLastName,
    sortByTimeAndLastName,
    sortByTimeAndName
} from "./helpers/employeeList-helpers";
import SettingsBar from "./components/SettingsBar";

function App() {
    let [appLoad, setAppLoad] = React.useState(true)
    let [dummyList, setDummyList] = React.useState(dummyData2);
    let [timeAndNameSort, setTimeAndNameSort] = React.useState({time: false, firstName: true});

    const handleSort = (sort: EmployeeSorting) => {
        setTimeAndNameSort(sort)
        let array = dummyList;
        if (!sort.time && sort.firstName) {
            sortByFirstName(array);
        } else if (!sort.time && !sort.firstName) {
            sortByLastName(array);
        } else if (sort.time && sort.firstName) {
            sortByTimeAndName(array);
        } else if (sort.time && !sort.firstName) {
            sortByTimeAndLastName(array)
        }
        setDummyList(array)
    }

    if(appLoad){
        setAppLoad(false)
        handleSort(timeAndNameSort)
    }


    return (
        <div className="App col d-md-flex flex-md-column justify-content-between">

            <SettingsBar/>
            <EmployeeListTitle setTimeReorder={handleSort}/>

            {dummyList.map((emp, i) => {
                return <EmployeeList
                    id={i}
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
                    nameSort={timeAndNameSort.firstName}
                />
            })}
        </div>
    )
}

export default App;
