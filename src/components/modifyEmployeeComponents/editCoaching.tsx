import {useEmployeeData} from "../../state/store.ts";
import SelectBox from "../TailwindElements/selectBox.tsx";
import {days, meetingBasis, warnings} from "../../helpers/appSettings.tsx";
import {db} from "../../helpers/db.ts";

interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

function EditCoaching({show, tabShow, tabHide}: Props) {
    const employee = useEmployeeData.use.employee()
    const setEmployee = useEmployeeData.use.setEmployee()


    const setterProp = (key: string, val: string) => {
        setEmployee(key, val)
        //console.log(employee)
    }
    const handleSubmit = () => {
        db.employees.update(employee.id, employee)
    }

    return (
        <div className={show === "edit-coaching" ? tabShow : tabHide} id="add-team-member" role="tabpanel" aria-labelledby="add-team-member-tab">
            <form onSubmit={() => handleSubmit()}>
                <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                    <SelectBox name={"Meeting Frequency"} keyValue={"meetings"} arr={meetingBasis} error={false} value={employee.meetings} setter={setterProp}/>
                    <SelectBox name={"Meeting Day"} keyValue={"meetingsDay"} arr={days} error={false} value={employee.meetingsDay} setter={setterProp}/>
                    <SelectBox name={"Warnings"} keyValue={"warnings"} arr={warnings} error={false} value={employee.warnings} setter={setterProp}/>
                    <button type="submit"
                            className="ml-5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditCoaching
