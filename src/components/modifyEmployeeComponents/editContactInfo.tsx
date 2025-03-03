import TextBox from "../TailwindElements/textBox.tsx";
import {useEmployeeData} from "../../state/store.ts";

interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

function EditCoaching({show, tabShow, tabHide}: Props) {
    const employee = useEmployeeData.use.employee()

    const setterProp = () => {
        console.log("asdf")
    }

    return (
        <div className={show === "edit-contact-info" ? tabShow : tabHide} id="add-team-member" role="tabpanel" aria-labelledby="add-team-member-tab">
            <form onSubmit={() => console.log('submit')}>
                <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
                    <TextBox name="First Name" type="text" placeHolder="John" value={employee.firstName} keyValue={"firstName"} setter={setterProp}/>
                    <TextBox name={"Last Name"} type={"text"} placeHolder={"Dingus"} value={employee.lastName} keyValue={"lastName"} setter={setterProp}/>
                    <TextBox name={"Email Address"} type={"email"} placeHolder={"jdingus@work.com"} value={employee.email} keyValue={"email"} setter={setterProp}/>
                    <TextBox name={"EE ID"} type={"text"} placeHolder={"CCRJDINGUS"} value={employee.EEID} keyValue={"EEID"} setter={setterProp}/>

                </div>
            </form>
        </div>
    )
}

export default EditCoaching
