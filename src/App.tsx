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
import {Employee} from "./interfaces/employeeInterface.tsx";
import {useAppLoadStore, useAppSettings} from "./state/store.ts";

function App() {
    const appLoad = useAppLoadStore((state) => state.appLoad)
    const setAppLoad = useAppLoadStore((state) => state.setAppLoad)
    const getAppSettings = useAppSettings((state) => state.getAppSettings)
    const appSettings = useAppSettings((state) => state.appSettings)
    let [employeeList, setEmployeeList] = useState<Employee[]>([]);
    let [timeAndNameSort, setTimeAndNameSort] = useState({time: false, firstName: true});

    //getAppSettings()

    // TODO: `Decouple and add global state`
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
    // const fetchSettings = async () => {
    //     try {
    //         const result = await GetSettings();
    //         setSettings(result)
    //     } catch (err) {
    //         console.log("Error fetching settings: " + err)
    //     }
    // }
    useEffect(() => {
        async function fetchEmployees() {
            const employees = await getAllEmployees()
            setEmployeeList(employees)
        }

        fetchEmployees()
        handleSort(timeAndNameSort)
        getAppSettings()
        setAppLoad(false)
    }, []);


    if (appLoad) {
        return <div>Loading...</div>
    }

    return (
        <div className="App col d-md-flex flex-md-column justify-content-between">
            <SettingsBar/>
            <EmployeeListTitle setTimeReorder={handleSort}/>
            <DisplayEmployees data={employeeList} timeAndNameSort={timeAndNameSort.firstName}/>

            <button onClick={() => console.log(appSettings)}>Add Employee</button>
        </div>
    )
}

export default App;
