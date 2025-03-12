import {useState} from "react";
import Modal from "../TailwindElements/modal.tsx";
import {processTL} from "../../helpers/addByExcelHelpers.tsx";

interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

// TODO: `Need to add updating by excel parsing functionality`
export default function TabTwoAddByExcel({show, tabShow, tabHide}: Props) {
    const [file, setFile] = useState<any>();
    const [teamLeads, setTeamLeads] = useState<any>([])

    const handleChange = (e: any) => {
        const tLeads = e.target.files[0]
        processTL(e, tLeads, setTeamLeads)
        setFile(e.target.files[0]);
    };

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true)
    };
    const closeModal = () => setIsOpen(false);
    // const handleSubmit = async (e: any) => {
    //   e.preventDefault();
    //   const file = await name.arrayBuffer();
    //   const workbook = read(file);
    //   const ws = workbook.Sheets[workbook.SheetNames[0]];
    //   const data = utils.sheet_to_json(ws);
    //   // @ts-ignore
    //   console.log(data);
    //
    //   let TL = [];
    //   data.map((emp) => {
    //     if (TL.includes(emp.TL)) {
    //       return;
    //     } else {
    //       TL.push(emp.TL);
    //     }
    //   });
    //   //console.log(TL);
    //   let employees = [];
    //   let selectedTL = TL[1];
    //   data.map((emps) => {
    //     const keys = Object.keys(emps);
    //     if (emps.TL === selectedTL) {
    //       let emp: Employee = {};
    //
    //       emp.shiftStart = emps[keys[0]].toLowerCase() as string;
    //       emp.shiftEnd = emps[keys[0]].toLowerCase() as string;
    //       emp.daysWorked = emps[keys[1]] as string;
    //       emp.firstName = emps[keys[2]].toLowerCase() as string;
    //       emp.lastName = emps[keys[3]].toLowerCase() as string;
    //       emp.email = emps[keys[5]].toLowerCase() as string;
    //       emp.EEID = emps[keys[4]].toLowerCase() as string;
    //       emp.meetings = "none";
    //       emp.meetingsDay = "none";
    //       emp.warnings = "none";
    //
    //       console.log(emp);
    //       employees.push(emp);
    //     }
    //   });
    //   console.log(employees);
    // };
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
                <Modal isOpen={isOpen} onClose={closeModal} teamLeads={teamLeads} file={file}/>
            </div>
            <div className="ml-[120px] pt-1 text-xs text-gray-400">
                *Click into white space to select file
            </div>
        </div>
    );
}
