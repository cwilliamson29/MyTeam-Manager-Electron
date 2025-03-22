import { useState } from "react";
import CheckBox from "../TailwindElements/checkBox.tsx";
import { useEmployeeData } from "../../state/store.ts";

interface Props {
  show: string;
  tabShow: string;
  tabHide: string;
}

function RemoveEmployee({ show, tabShow, tabHide }: Props) {
  const employee = useEmployeeData.getState().employee;
  const removeEmployee = useEmployeeData.getState().removeEmployee;
  const [checked, setChecked] = useState(false);
  const [msg, setMsg] = useState({ status: "none", val: "" });

  const handleChange = () => setChecked(!checked);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (checked) {
      removeEmployee(employee.id);
      setMsg({ status: "success", val: "Employee removed successfully" });
    } else {
      setMsg({ status: "error", val: "Please confirm employee removal" });
    }
  };
  return (
    <div
      className={show === "remove" ? tabShow : tabHide}
      id="remove"
      role="tabpanel"
      aria-labelledby="remove-tab"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        {msg.status === "error" && (
          <div
            className={
              "p-2 bg-red-200 text-center text-black rounded-lg w-75 mb-2"
            }
          >
            {msg.val}
          </div>
        )}
        <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
          <div
            className={
              msg.status === "error" ? "border-1 border-red-500 rounded-md" : ""
            }
          >
            <CheckBox val={"Remove Employee? "} onChange={handleChange} />
          </div>
          <button
            type="submit"
            className="ml-5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 text-center mt-2 me-2 mb-2"
          >
            Remove Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default RemoveEmployee;
