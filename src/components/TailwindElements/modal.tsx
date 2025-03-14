import React, {useState} from "react";
import SelectBox from "./selectBox.tsx";
import {processFile} from "../../helpers/addByExcelHelpers.tsx";
import {Employee} from "../../interfaces/employeeInterface.tsx";
import TempTitle from "../tabComponents/displayComponents/tempTitle.tsx";
import TempDisplay from "../tabComponents/displayComponents/tempDisplay.tsx";
import ConfirmModal from "./confirmModal.tsx";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    teamLeads: string[];
    file: any;
    setSaved: () => void;
    handleSave: (val: Employee[]) => void;
    saveMessage: string;
    confirm: boolean;
}

export default function Modal({
                                  isOpen,
                                  onClose,
                                  teamLeads,
                                  file,
                                  handleSave,
                                  saveMessage,
                                  confirm,
                              }: Props) {
    const [warning, setWarning] = useState(""); // 'border-3 border-red-600'
    const [selectedTL, setSelectedTL] = useState("");
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [message, setMessage] = useState(""); // "Employees saved successfully!"
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(false)
    const confirmMsg = {
        // <div className="border-2 border-red-800 bg-red-200 text-black justify-center">
        title: "Please confirm these changes by clicking save again.",
        list: [
            "All employees will be removed",
            "All employees NOTES will be removed",
            "If you need the notes then now is the time to copy the information."]
    }

    const openConfirm = () => setConfirmOpen(true)
    const closeConfirm = () => setConfirmOpen(false)
    const handleConfirm = () => {
        closeConfirm()
        handleSave(employees)
    }

    const handleTLSelect = (key: string, val: string) => {
        // key never used due to reusing selectbox component
        setSelectedTL(val);
    };
    const handleSetEmployees = (val: Employee[]) => setEmployees(val);

    const handleClick = (e: any) => {
        processFile(e, file, selectedTL, handleSetEmployees);
    };

    const renderEmps = () => {
        let count = 0;
        return (
            <>
                <TempTitle/>
                {employees.map((emp) => {
                    return (
                        <TempDisplay
                            key={count++}
                            shiftStart={emp.shiftStart}
                            shiftEnd={emp.shiftEnd}
                            daysWorked={emp.daysWorked}
                            firstName={emp.firstName}
                            lastName={emp.lastName}
                            email={emp.email}
                            EEID={emp.EEID}
                            meetings={emp.meetings}
                            meetingsDay={emp.meetingsDay}
                            warnings={emp.warnings}
                        />
                    );
                })}
                <div className="flex justify-center">
                    {/*{saveMessage !== '' &&*/}
                    {/*    <div className="border-2 border-red-800 bg-red-200 text-black justify-center">*/}
                    {/*        <p>Please confirm these changes by clicking save again.</p>*/}
                    {/*        <ul>*/}
                    {/*            <li>All employees will be removed</li>*/}
                    {/*            <li>All employees NOTES will be removed</li>*/}
                    {/*            <li>If you need the notes then now is the time to copy the information.</li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*}*/}
                    <div
                        className="w-[75%] bg-red-500 rounded-md p-2 m-2 text-center"
                        // onClick={() => handleSave(employees)}
                        onClick={openConfirm}
                    >
                        SAVE EMPLOYYEES
                    </div>
                </div>
            </>
        );
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 ${isOpen ? "block " : "hidden "}`}>
            <div className={"bg-white text-black p-1 pl-2 pr-2 rounded shadow-lg w-[95%] max-h-[95%] " + warning}>
                <div className="flex justify-between">
                    <div className="w-90 prose">
                        <h2>Add Employees From Excel</h2>
                    </div>
                    <div
                        className=" bg-black text-white p-2 rounded-md cursor-pointer"
                        onClick={onClose}
                    >
                        Close
                    </div>
                </div>

                <div className="flex justify-start pb-3">
                    <label className={"pt-2"}>Please Select A Team Lead: </label>
                    <SelectBox
                        keyValue={"TeamLeads"}
                        arr={teamLeads}
                        error={false}
                        value={selectedTL}
                        setter={handleTLSelect}
                    />
                </div>
                <div
                    className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center w-[220px] h-full ml-5 mr-2"
                    onClick={(e) => handleClick(e)}
                >
                    Generate
                </div>
                <div className="flex justify-center">
                    {message !== "" && (
                        <div className="p-2 text-center bg-yellow-200 rounded-md w-[50%]">
                            {message}
                        </div>
                    )}
                </div>
                <div className="pt-4">{employees.length !== 0 && renderEmps()}</div>
            </div>
            <ConfirmModal isOpen={confirmOpen} onClose={closeConfirm} message={confirmMsg} setConfirm={handleConfirm}/>
        </div>
    );
}
