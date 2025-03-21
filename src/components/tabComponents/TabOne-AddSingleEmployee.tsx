import {useEffect, useState} from "react";
import {Employee, EmployeeValidation,} from "../../interfaces/employeeInterface.tsx";
import {addEmployeeHelper} from "../../helpers/addEmployeeHelper.tsx";
import {days, employeeBooleanTemplate, employeeTemplate, endTimes, meetingBasis, startTimes, warnings,} from "../../helpers/appSettings.tsx";
import {EmployeeValidator} from "../../helpers/TabOneValidation.tsx";
import {useAppLoad, useEmployeeData} from "../../state/store.ts";
import SelectBoxTime from "../TailwindElements/selectBox-Time.tsx";
import CheckBox from "../TailwindElements/checkBox.tsx";
import TextBox from "../TailwindElements/textBox.tsx";
import SelectBox from "../TailwindElements/selectBox.tsx";

interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

export default function TabOneAddSingleEmployee({
                                                    show,
                                                    tabShow,
                                                    tabHide,
                                                }: Props) {
    const getEmployees = useEmployeeData.use.getEmployees();
    const setAppLoad = useAppLoad.use.setAppLoad();
    const [successMsg, setSuccessMsg] = useState(false);
    let [error, setError] = useState<EmployeeValidation>(employeeBooleanTemplate);
    let [valid, setValid] = useState(true);
    let [employee, setEmployee] = useState<Employee>(employeeTemplate);
    let [checked, setChecked] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });
    const daysSliced = days.slice(0, 7);
    let [daysWorked, setDaysWorked] = useState("=======");

    useEffect(() => {
        const days = daysWorked.split("");
        // seperator
        const s = "=";
        // If statments to change string position values based on day abbreviation and boolean
        // Sunday
        if (checked.sunday && days[0] === s) days[0] = "S";
        if (!checked.sunday) days[0] = s;
        // Monday
        if (checked.monday && days[1] === s) days[1] = "M";
        if (!checked.monday) days[1] = s;
        // Tuesday
        if (checked.tuesday && days[2] === s) days[2] = "T";
        if (!checked.tuesday) days[2] = s;
        // Wednesday
        if (checked.wednesday && days[3] === s) days[3] = "W";
        if (!checked.wednesday) days[3] = s;
        // Thursday
        if (checked.thursday && days[4] === s) days[4] = "R";
        if (!checked.thursday) days[4] = s;
        // Friday
        if (checked.friday && days[5] === s) days[5] = "F";
        if (!checked.friday) days[5] = s;
        // Sunday
        if (checked.saturday && days[6] === s) days[6] = "Y";
        if (!checked.saturday) days[6] = s;
        // Combine back to string and save
        let result = days.join("");
        setDaysWorked(result);
        setEmployee((currentState) => ({...currentState, daysWorked: result}));
    }, [checked]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // employee.shiftStart = timeConvertT024(employee.shiftStart)
        // employee.shiftEnd = timeConvertT024(employee.shiftEnd)
        // Validate Employee
        let result = EmployeeValidator(employee);

        if (result.result) {
            setSuccessMsg(true);
            // Send to database via Dexie
            addEmployeeHelper(employee);
            setEmployee(employeeTemplate);
            getEmployees();
            setAppLoad(false);
        } else if (!result.result) {
            setError(result.error);
            setValid(false);
            console.log(result.error);
        }

        //console.log(employee)
    };

    const handleCheckBox = (e: any, key: string) => {
        //Determines checked with true/false and saves to checked variable
        let day = key.toLowerCase();
        setChecked({...checked, [day]: e.target.checked});
        //console.log("value is: " + e.target.checked + ", and key is: " + key)
    };
    const setterProp = (key: string, val: string) => {
        setEmployee((currentState) => ({
            ...currentState,
            [key]: val,
        }));
    };

    return (
        <div
            className={show === "add-team-member" ? tabShow : tabHide}
            id="add-team-member"
            role="tabpanel"
            aria-labelledby="add-team-member-tab"
        >
            <h3 className="mb-3 text-white">Add Team Member</h3>
            <form onSubmit={handleSubmit}>
                {!valid && (
                    <div className="d-flex flex-row justify-content-start mb-3 ps-3 secondary bg-danger ">
                        <span>*Fields required</span>
                    </div>
                )}
                {successMsg && (
                    <div className="flex bg-emerald-500 text-black rounded-md p-2 pl-5 mb-2">
                        <span>Employee Added Successfully!</span>
                    </div>
                )}
                <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                    <SelectBoxTime
                        name="Shift Start"
                        keyValue="shiftStart"
                        time={startTimes}
                        error={error.shiftStart}
                        value={employee.shiftStart}
                        setter={setterProp}
                    />
                    <SelectBoxTime
                        name="Shift End"
                        keyValue="shiftEnd"
                        time={endTimes}
                        error={error.shiftEnd}
                        value={employee.shiftEnd}
                        setter={setterProp}
                    />

                    <fieldset className="flex">
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Days Worked:
                        </legend>
                        {daysSliced.map((day) => (
                            <CheckBox key={day} val={day} onChange={handleCheckBox}/>
                        ))}
                    </fieldset>
                </div>
                <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                    <TextBox
                        name="First Name"
                        type="text"
                        placeHolder="John"
                        value={employee.firstName}
                        keyValue={"firstName"}
                        setter={setterProp}
                    />
                    <TextBox
                        name={"Last Name"}
                        type={"text"}
                        placeHolder={"Dingus"}
                        value={employee.lastName}
                        keyValue={"lastName"}
                        setter={setterProp}
                    />
                    <TextBox
                        name={"Email Address"}
                        type={"email"}
                        placeHolder={"jdingus@work.com"}
                        value={employee.email}
                        keyValue={"email"}
                        setter={setterProp}
                    />
                    <TextBox
                        name={"EE ID"}
                        type={"text"}
                        placeHolder={"CCRJDINGUS"}
                        value={employee.EEID}
                        keyValue={"EEID"}
                        setter={setterProp}
                    />
                </div>

                <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                    <SelectBox
                        name={"Meeting Frequency"}
                        keyValue={"meetings"}
                        arr={meetingBasis}
                        error={error.meetings}
                        value={employee.meetings}
                        setter={setterProp}
                    />
                    <SelectBox
                        name={"Meeting Day"}
                        keyValue={"meetingsDay"}
                        arr={days}
                        error={error.meetingsDay}
                        value={employee.meetingsDay}
                        setter={setterProp}
                    />
                    <SelectBox
                        name={"Warnings"}
                        keyValue={"warnings"}
                        arr={warnings}
                        error={error.warnings}
                        value={employee.warnings}
                        setter={setterProp}
                    />
                    <button
                        type="submit"
                        className="ml-5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
                    >
                        Add Team Member
                    </button>
                </div>
            </form>
        </div>
    );
}
