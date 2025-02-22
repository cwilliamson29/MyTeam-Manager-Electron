import EmployeeListTitle from "./components/EmployeeListTitle";
import React, {useEffect} from "react";
import {EmployeeSorting} from "./interfaces/employeeInterface";
import {
    sortByFirstName,
    sortByLastName,
    sortByTimeAndLastName,
    sortByTimeAndName
} from "./helpers/employeeList-helpers";
import SettingsBar from "./components/SettingsBar";
import {DisplayEmployees} from "./components/DisplayEmployees.tsx";
import {getAllEmployees} from "./helpers/getEmployeeHelper.tsx";
import {Employee} from "./employeeInterface.tsx";

function App() {
    let [appLoad, setAppLoad] = React.useState(true)
    let [employeeList, setEmployeeList] = React.useState<Employee[]>([]);
    let [timeAndNameSort, setTimeAndNameSort] = React.useState({time: false, firstName: true});

    useEffect(() => {
        async function fetchEmployees() {
            const employees = await getAllEmployees()
            setEmployeeList(employees)
        }

        fetchEmployees()
    }, []);
    const handleSort = (sort: EmployeeSorting) => {
        setTimeAndNameSort(sort)
        let array = employeeList;
        if (!sort.time && sort.firstName) {
            sortByFirstName(array);
        } else if (!sort.time && !sort.firstName) {
            sortByLastName(array);
        } else if (sort.time && sort.firstName) {
            sortByTimeAndName(array);
        } else if (sort.time && !sort.firstName) {
            sortByTimeAndLastName(array)
        }
        setEmployeeList(array)
    }

    if (appLoad) {
        setAppLoad(false)
        handleSort(timeAndNameSort)
    }

    return (
        <div className="App col d-md-flex flex-md-column justify-content-between">
            <SettingsBar/>
            <EmployeeListTitle setTimeReorder={handleSort}/>
            <DisplayEmployees data={employeeList} timeAndNameSort={timeAndNameSort.firstName}/>

            {/*<button onClick={() => addEmployeeHelper(dummyData2[0])}>Add Employee</button>*/}
        </div>
    )
}

export default App;
