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

  const handleChange = () => setChecked(!checked);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (checked) {
      removeEmployee(employee.id);
    } else {
      console.log("not checked");
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
        <div className="flex bg-slate-900 text-white rounded-lg mb-2 p-2">
          <CheckBox val={"Remove Employee? "} onChange={handleChange} />
          <button
            type="submit"
            className="ml-5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
          >
            Remove Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default RemoveEmployee;
