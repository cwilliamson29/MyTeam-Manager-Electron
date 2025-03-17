import {useState} from "react";
import Modal from "../TailwindElements/modal.tsx";
import {processTL} from "../../helpers/addByExcelHelpers.tsx";
import {db} from "../../helpers/db.ts";
import {addEmployeeHelper} from "../../helpers/addEmployeeHelper.tsx";
import {ConfirmMessage, Employee} from "../../interfaces/employeeInterface.tsx";

interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

// TODO: `Need to add updating by excel parsing functionality`
export default function TabTwoAddByExcel({show, tabShow, tabHide}: Props) {
    const [saved, setSaved] = useState(false);
    const [file, setFile] = useState<any>();
    const [teamLeads, setTeamLeads] = useState<any>([]);
    // message to send to modal confirm
    const confirmMsg: ConfirmMessage = {
        // <div className="border-2 border-red-800 bg-red-200 text-black justify-center">
        title: "Please confirm these changes by clicking save again.",
        list: [
            "All employees will be removed",
            "All employees NOTES will be removed",
            "If you need the notes then now is the time to copy the information."]
    }
    // Modal openers and closers
    const [isOpen, setIsOpen] = useState(false);

    // Handle the selection of file and store it in state for use
    const handleChange = (e: any) => {
        const tLeads = e.target.files[0];
        processTL(e, tLeads, setTeamLeads);
        setFile(e.target.files[0]);
    };

    // Opens the modal to generate team
    const openModal = () => {
        setIsOpen(true);
    };
    // Closes the modal to generate team
    const closeModal = () => {
        setIsOpen(false);
        if (saved) {
            window.location.reload();
        }
    };
    const handleSaveToDB = (employees: Employee[]) => {
        db.employees.clear();
        employees.map((emp) => {
            addEmployeeHelper(emp);
        });
        setSaved(true);
    };
    return (
        <div
            className={show === "add-from-excel" ? tabShow : tabHide}
            id="add-team-member"
            role="tabpanel"
            aria-labelledby="add-team-member-tab"
        >
            <h3 className="mb-3 text-white">Add From Excel</h3>
            <div className="flex ">
                <label
                    className="text-sm text-white font-medium text-gray-900 bg-gray-600 rounded-l-md pt-1 pl-2 w-[120px]"
                    htmlFor="file_input"
                >
                    Upload file
                </label>
                <input
                    className="w-75 text-sm text-gray-900 border border-gray-300 rounded-r-md cursor-pointer bg-gray-50 focus:outline-none "
                    id="file_input"
                    accept=".xlsx"
                    type="file"
                    onChange={handleChange}
                />
                <button
                    // type="submit"
                    onClick={openModal}
                    className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center w-[220px] h-full ml-5 mr-2"
                >
                    Upload File
                </button>
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    teamLeads={teamLeads}
                    file={file}
                    handleSave={handleSaveToDB}
                    confirmMsg={confirmMsg}
                />
            </div>
            <div className="ml-[120px] pt-1 text-xs text-gray-400">
                *Click into white space to select file
            </div>
        </div>
    );
}
