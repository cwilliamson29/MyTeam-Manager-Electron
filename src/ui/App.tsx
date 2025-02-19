import './css/App.css'
import './css/employeeList.css'
import './css/settingsBar.css'
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
import sendAsync from '../electron/renderer'

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

    const [message, setMessage] = React.useState('');
    const [responses, setResponses] = React.useState([]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    function send(data) {
        sendAsync(data).then((result) => setResponses([...responses, result]));
    }

    if(appLoad){
        setAppLoad(false)
        // saveDataInStorage({
        //     id: 11,
        //     shiftStart: "15:00",
        //     shiftEnd: "02:00",
        //     daysWorked: "--TWRFY",
        //     firstName: "johnothang",
        //     lastName: "blah ba blah",
        //     email: "jgoodall@work.com",
        //     EEID: "ccrcbland",
        //     meetings: "bi-weekly",
        //     meetingsDay: "wednesday",
        //     warnings: "written"
        // },)
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
            <div className="App">
                <header className="App-header">
                    <h1>
                        Standalone application with Electron, React, and
                        SQLite stack.
                    </h1>
                </header>
                <article>
                    <p>
                        Say <i>ping</i> to the main process.
                    </p>
                    <input
                        type="text"
                        value={message}
                        onChange={({ target: { value } }) => setMessage(value)}
                    />
                    <button type="button" onClick={() => send(message)}>
                        Send
                    </button>
                    <br />
                    <p>Main process responses:</p>
                    <br />
                    <pre>
                    {(responses && responses.join('\n')) ||
                        'the main process seems quiet!'}
                </pre>
                </article>
            </div>
        </div>
    )
}

export default App;
