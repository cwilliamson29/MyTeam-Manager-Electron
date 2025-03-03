import {useAppLoad, useEmployeeData} from "../../state/store.ts";
import {useEffect, useState} from "react";
import {EmployeeValidation} from "../../interfaces/employeeInterface.tsx";
import {employeeBooleanTemplate} from "../../helpers/appSettings.tsx";
import TabView from "../TailwindElements/tabView.tsx";
import ModifyShift from "../modifyEmployeeComponents/modifyShift.tsx";
import EditCoaching from "../modifyEmployeeComponents/editCoaching.tsx";
import EditContactInfo from "../modifyEmployeeComponents/editContactInfo.tsx";

interface Props {
    id: any;
}

function ModifyEmployee({id}: Props) {
    //let hide = show ? " open" : "";
    let names: string[] = ["Edit Coaching", "Edit Shift", "Edit Contact Info", "Notes"]
    let [view, setView] = useState("edit-coaching")

    let tabShow = "p-4 rounded-lg bg-gray-50 dark:bg-gray-800";
    let tabHide = "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"

    const setTabView = (val: string) => {
        setView(val)
    }

    const setAppLoad = useAppLoad.use.setAppLoad()
    const [successMsg, setSuccessMsg] = useState(false)
    let [error, setError] = useState<EmployeeValidation>(employeeBooleanTemplate)
    let [valid, setValid] = useState(true)
    //let [employee, setEmployee] = useState<Employee>(employeeTemplate)
    const employee = useEmployeeData.use.employee()

    let [checked, setChecked] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    });
    let [daysWorked, setDaysWorked] = useState('-------')

    useEffect(() => {
        const days = daysWorked.split('')

        // If statments to change string position values based on day abbreviation and boolean
        // Sunday
        if (checked.sunday && days[0] === "-") days[0] = "S";
        if (!checked.sunday) days[0] = "-";
        // Monday
        if (checked.monday && days[1] === "-") days[1] = "M";
        if (!checked.monday) days[1] = "-";
        // Tuesday
        if (checked.tuesday && days[2] === "-") days[2] = "T";
        if (!checked.tuesday) days[2] = "-";
        // Wednesday
        if (checked.wednesday && days[3] === "-") days[3] = "W";
        if (!checked.wednesday) days[3] = "-";
        // Thursday
        if (checked.thursday && days[4] === "-") days[4] = "R";
        if (!checked.thursday) days[4] = "-";
        // Friday
        if (checked.friday && days[5] === "-") days[5] = "F";
        if (!checked.friday) days[5] = "-";
        // Sunday
        if (checked.saturday && days[6] === "-") days[6] = "Y";
        if (!checked.saturday) days[6] = "-";
        // Combine back to string and save
        let result = days.join('')
        setDaysWorked(result)
        //setEmployee(currentState => ({...currentState, daysWorked: result}))

    }, [checked]);
    const handleCheckBox = (e: any, key: string) => {

        //Determines checked with true/false and saves to checked variable
        let day = key.toLowerCase()
        setChecked({...checked, [day]: e.target.checked})
        //console.log("value is: " + e.target.checked + ", and key is: " + key)
    }
    const setterProp = () => {
        console.log('here')
    }
    return (
        <div className={""}>
            <TabView show={view} names={names} setter={setTabView}/>
            <div id="default-tab-content">
                <EditCoaching show={view} tabShow={tabShow} tabHide={tabHide}/>
                <ModifyShift show={view} tabShow={tabShow} tabHide={tabHide}/>
                <EditContactInfo show={view} tabShow={tabShow} tabHide={tabHide}/>
            </div>
        </div>
        // <div className={"p-4 rounded-lg bg-gray-50 dark:bg-gray-800"} id="add-team-member" role="tabpanel" aria-labelledby="add-team-member-tab">
        //     <h3 className="mb-3 text-white">Edit Team Member</h3>
        //     <form onSubmit={() => console.log('submit')}>
        //         <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
        //             <SelectBoxTime name="Shift Start" keyValue="shiftStart" time={startTimes} error={error.shiftStart}
        //                            value={employee.shiftStart}
        //                            setter={() => console.log(null)}/>
        //             <SelectBoxTime name="Shift End" keyValue="shiftEnd" time={endTimes} error={false}
        //                            value={employee.shiftEnd}
        //                            setter={() => console.log('asdf')}/>
        //
        //             <fieldset className="flex">
        //                 <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days Worked:</legend>
        //                 {days.map((day) => <CheckBox key={day} day={day} onChange={handleCheckBox}/>
        //                 )}
        //             </fieldset>
        //
        //         </div>
        //         <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
        //             <TextBox name="First Name" type="text" placeHolder="John" value={employee.firstName} keyValue={"firstName"} setter={setterProp}/>
        //             <TextBox name={"Last Name"} type={"text"} placeHolder={"Dingus"} value={employee.lastName} keyValue={"lastName"} setter={setterProp}/>
        //
        //             <SelectBox name={"Meeting Frequency"} keyValue={"meetings"} arr={meetingBasis} error={error.meetings} value={employee.meetings} setter={setterProp}/>
        //             <SelectBox name={"Meeting Day"} keyValue={"meetingsDay"} arr={days} error={error.meetingsDay} value={employee.meetingsDay} setter={setterProp}/>
        //             <SelectBox name={"Warnings"} keyValue={"warnings"} arr={warnings} error={error.warnings} value={employee.warnings} setter={setterProp}/>
        //             <button type="submit"
        //                     className="ml-5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2">
        //                 Save
        //             </button>
        //
        //
        //         </div>
        //
        //     </form>
        // </div>
    )
}

export default ModifyEmployee
