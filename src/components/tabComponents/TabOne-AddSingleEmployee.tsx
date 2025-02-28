import {useEffect, useState} from "react";
import {Employee, EmployeeValidation} from "../../interfaces/employeeInterface.tsx";
import {addEmployeeHelper} from "../../helpers/addEmployeeHelper.tsx";
import {Button, Form} from "react-bootstrap";
import {days, employeeBooleanTemplate, employeeTemplate, endTimes, meetingBasis, startTimes, warnings} from "../../helpers/appSettings.tsx";
import {EmployeeValidator} from "../../helpers/TabOneValidation.tsx";
import {useAppLoad, useEmployeeData} from "../../state/store.ts";
import SelectBoxTime from "../TailwindElements/selectBox-Time.tsx";
import CheckBox from "../TailwindElements/checkBox.tsx";
import TextBox from "../TailwindElements/textBox.tsx";


export default function TabOneAddSingleEmployee() {
    const getEmployees = useEmployeeData.use.getEmployees()
    const setAppLoad = useAppLoad.use.setAppLoad()
    const [successMsg, setSuccessMsg] = useState(false)
    let [error, setError] = useState<EmployeeValidation>(employeeBooleanTemplate)
    let [valid, setValid] = useState(true)
    let [employee, setEmployee] = useState<Employee>(employeeTemplate)
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
        setEmployee(currentState => ({...currentState, daysWorked: result}))

    }, [checked]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Validate Employee
        let result = EmployeeValidator(employee)

        if (result.result) {
            setSuccessMsg(true)
            // Send to database via Dexie
            addEmployeeHelper(employee);
            setEmployee(employeeTemplate)
            getEmployees()
            setAppLoad(false)
        } else if (!result.result) {
            setError(result.error)
            setValid(false)
            console.log(result.error)
        }

        //console.log(employee)

    }

    const handleCheckBox = (e: any, key: string) => {

        //Determines checked with true/false and saves to checked variable
        let day = key.toLowerCase()
        setChecked({...checked, [day]: e.target.checked})
        //console.log("value is: " + e.target.checked + ", and key is: " + key)
    }
    const setterProp = (key: string, val: string) => {
        setEmployee(currentState => ({
            ...currentState,
            [key]: val
        }))
    }

    return (

        <form onSubmit={handleSubmit}>
            {!valid &&
                <div className="d-flex flex-row justify-content-start mb-3 ps-3 secondary bg-danger ">
                    <span>*Fields required</span>
                </div>
            }
            {successMsg &&
                <div className="d-flex flex-row justify-content-start mb-3 ps-3 secondary bg-success ">
                    <span>Employee Added Successfully!</span>
                </div>
            }
            <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                <SelectBoxTime name="Shift Start" keyValue="shiftStart" time={startTimes} error={error.shiftStart}
                               value={employee.shiftStart}
                               setter={setterProp}/>
                <SelectBoxTime name="Shift End" keyValue="shiftEnd" time={endTimes} error={error.shiftEnd}
                               value={employee.shiftEnd}
                               setter={setterProp}/>

                <fieldset className="flex">
                    <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days Worked:</legend>
                    {days.map((day) => <CheckBox day={day} onChange={handleCheckBox}/>
                    )}
                </fieldset>

            </div>
            <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                <TextBox name="First Name" type="text" placeHolder="John" value={employee.firstName} keyValue={"firstName"} setter={setterProp}/>
                <TextBox name={"Last Name"} type={"text"} placeHolder={"Dingus"} value={employee.lastName} keyValue={"lastName"} setter={setterProp}/>
                <TextBox name={"Email Address"} type={"email"} placeHolder={"jdingus@work.com"} value={employee.email} keyValue={"email"} setter={setterProp}/>
                <TextBox name={"EE ID"} type={"text"} placeHolder={"CCRJDINGUS"} value={employee.EEID} keyValue={"EEID"} setter={setterProp}/>

            </div>


            <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                <Form.Group className="mb-3 ms-2" controlId="meetings">
                    <Form.Label>Meeting Frequency</Form.Label>
                    <Form.Select id="meetings"
                                 className={error.meetings ? "w-10 border border-2 border-danger" : "w-10"}
                                 value={employee.meetings}
                                 onChange={(e) => setEmployee(currentState => ({
                                     ...currentState,
                                     meetings: e.target.value
                                 }))}>
                        <option value=""></option>
                        {meetingBasis.map((basis) => <option key={basis} value={basis}>{basis}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 ms-2" controlId="meetingsDay">
                    <Form.Label>Meeting Day</Form.Label>
                    <Form.Select id="meetings"
                                 className={error.meetingsDay ? "w-10 border border-2 border-danger" : "w-10"}
                                 value={employee.meetingsDay}
                                 onChange={(e) => setEmployee(currentState => ({
                                     ...currentState,
                                     meetingsDay: e.target.value
                                 }))}>
                        <option value=""></option>
                        {days.map((day) => <option key={day} value={day}>{day}</option>)}
                        <option value="NONE">NONE</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 ms-2" controlId="warnings">
                    <Form.Label>Warning</Form.Label>
                    <Form.Select id="warning" className={error.warnings ? "w-10 border border-2 border-danger" : "w-10"}
                                 value={employee.warnings}
                                 onChange={(e) => setEmployee(currentState => ({
                                     ...currentState,
                                     warnings: e.target.value
                                 }))}>
                        <option value=""></option>
                        {warnings.map((warning) => <option key={warning} value={warning}>{warning}</option>)}
                    </Form.Select>
                </Form.Group>
                <div className="d-flex align-items-center">
                    <Button variant="primary" type="submit">
                        Add Team Member
                    </Button>
                </div>

            </div>

        </form>

    )
}
