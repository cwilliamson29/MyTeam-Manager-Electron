import EmployeeListTitle from "./components/EmployeeListTitle";
import {useEffect, useState} from "react";
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
import {useAppLoadStore} from "./state/store.ts";
import {GetSettings} from "./helpers/appSettings.tsx";

function App() {
    //console.log(GetSettings())
    //let [appLoad, setAppLoad] = useState(true)
    const appLoad = useAppLoadStore((state) => state.appLoad)
    const setAppLoad = useAppLoadStore((state) => state.setAppLoad)
    let [employeeList, setEmployeeList] = useState<Employee[]>([]);
    let [timeAndNameSort, setTimeAndNameSort] = useState({time: false, firstName: true});
    // TODO: `Decouple and add global state`
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
        setAppLoad()
        GetSettings()
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
