import {useEffect, useState} from 'react'
import SelectBoxTime from "../TailwindElements/selectBox-Time.tsx";
import {days, employeeBooleanTemplate, endTimes, startTimes} from "../../helpers/appSettings.tsx";
import CheckBox from "../TailwindElements/checkBox.tsx";
import {useEmployeeData} from "../../state/store.ts";
import {EmployeeValidation} from "../../interfaces/employeeInterface.tsx";

interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

function ModifyShift({show, tabShow, tabHide}: Props) {
    const employee = useEmployeeData.use.employee()
    // @ts-ignore
    let [error, setError] = useState<EmployeeValidation>(employeeBooleanTemplate)

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
    }

    return (
        <div className={show === "edit-shift" ? tabShow : tabHide} id="add-team-member" role="tabpanel" aria-labelledby="add-team-member-tab">
            <form onSubmit={() => console.log('submit')}>
                <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                    <SelectBoxTime name="Shift Start" keyValue="shiftStart" time={startTimes} error={error.shiftStart}
                                   value={employee.shiftStart}
                                   setter={() => console.log(null)}/>
                    <SelectBoxTime name="Shift End" keyValue="shiftEnd" time={endTimes} error={false}
                                   value={employee.shiftEnd}
                                   setter={() => console.log('asdf')}/>

                    <fieldset className="flex">
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days Worked:</legend>
                        {days.map((day) => <CheckBox key={day} day={day} onChange={handleCheckBox}/>
                        )}
                    </fieldset>

                </div>
            </form>
        </div>

    )
}

export default ModifyShift
