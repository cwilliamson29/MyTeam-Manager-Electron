import {useState} from "react";
import {read, utils} from "xlsx";

interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

// TODO: `Need to add updating by excel parsing functionality`
export default function TabTwoAddByExcel({show, tabShow, tabHide}: Props) {
    const [name, setNames] = useState<any>();

    const handleChange = (e: any) => {
        setNames(e.target.files[0])
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const file = await name.arrayBuffer()
        const workbook = read(file)
        const ws = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json(ws)
        // @ts-ignore
        console.log(data[0].TL)

    }
    return (
        <div className={show === "add-from-excel" ? tabShow : tabHide} id="add-team-member" role="tabpanel" aria-labelledby="add-team-member-tab">
            <h3 className="mb-3 text-white">Add From Excel</h3>
            <form className="flex " onSubmit={(e) => {
                handleSubmit(e)
            }}>
                <label className="text-sm text-white font-medium text-gray-900 bg-gray-600 rounded-l-md pt-1 pl-2 w-[120px]" htmlFor="file_input">Upload file</label>
                <input
                    className="w-75 text-sm text-gray-900 border border-gray-300 rounded-r-md cursor-pointer bg-gray-50 focus:outline-none "
                    id="file_input" accept=".xlsx" type="file" onChange={handleChange}/>
                <button type="submit"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center w-[220px] h-full ml-5 mr-2">
                    Upload File
                </button>
            </form>
            <div className="ml-[120px] pt-1 text-xs text-gray-400">
                *Click into white space to select file
            </div>
        </div>
    );
}
