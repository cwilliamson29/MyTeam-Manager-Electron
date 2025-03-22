import { useState } from "react";
import TabView from "../TailwindElements/tabView.tsx";
import EditShift from "../modifyEmployeeComponents/editShift.tsx";
import EditCoaching from "../modifyEmployeeComponents/editCoaching.tsx";
import EditContactInfo from "../modifyEmployeeComponents/editContactInfo.tsx";
import EditNote from "../modifyEmployeeComponents/editNote.tsx";
import RemoveEmployee from "../modifyEmployeeComponents/removeEmployee.tsx";

function ModifyEmployee() {
    //let hide = show ? " open" : "";
    let names: string[] = [
        "Edit Coaching",
        "Edit Shift",
        "Edit Contact Info",
        "Notes",
        "Remove",
    ];
    let [view, setView] = useState("edit-coaching");

    let tabShow = "p-4 rounded-lg  dark:bg-gray-800";
    let tabHide = "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800";

    const setTabView = (val: string) => {
        setView(val);
    };
    return (
        <div className={""}>
            <TabView show={view} names={names} setter={setTabView} />
            <div id="default-tab-content">
                <EditCoaching show={view} tabShow={tabShow} tabHide={tabHide} />
                <EditShift show={view} tabShow={tabShow} tabHide={tabHide} />
                <EditContactInfo
                    show={view}
                    tabShow={tabShow}
                    tabHide={tabHide}
                />
                {view === "notes" && <EditNote tabShow={tabShow} />}
                <RemoveEmployee
                    show={view}
                    tabShow={tabShow}
                    tabHide={tabHide}
                />
            </div>
        </div>
    );
}

export default ModifyEmployee;
