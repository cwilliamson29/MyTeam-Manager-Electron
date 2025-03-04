import TextBox from "../TailwindElements/textBox.tsx";
import {useEmployeeData} from "../../state/store.ts";
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
        <div className={show === "edit-contact-info" ? tabShow : tabHide} id="add-team-member" role="tabpanel" aria-labelledby="add-team-member-tab">
            <form onSubmit={handleSubmit}>
                <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                    <TextBox name="First Name" type="text" placeHolder="John" value={employee.firstName} keyValue={"firstName"} setter={setterProp}/>
                    <TextBox name={"Last Name"} type={"text"} placeHolder={"Dingus"} value={employee.lastName} keyValue={"lastName"} setter={setterProp}/>
                    <TextBox name={"Email Address"} type={"email"} placeHolder={"jdingus@work.com"} value={employee.email} keyValue={"email"} setter={setterProp}/>
                    <TextBox name={"EE ID"} type={"text"} placeHolder={"CCRJDINGUS"} value={employee.EEID} keyValue={"EEID"} setter={setterProp}/>
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
