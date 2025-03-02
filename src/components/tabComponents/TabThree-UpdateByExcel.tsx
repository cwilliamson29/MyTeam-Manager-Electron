interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

// TODO: `Need to add excel parsing functionality`
export default function TabThreeUpdateByExcel({show, tabShow, tabHide}: Props) {

    return (
        <div className={show === "update-from-excel" ? tabShow : tabHide} id="add-team-member" role="tabpanel" aria-labelledby="add-team-member-tab">
            <h3 className="mb-3 text-white">Update From Excel</h3>
            <form className="flex ">
                <label className="text-sm text-white font-medium text-gray-900 bg-gray-600 rounded-l-md pt-1 pl-2 w-[120px]" htmlFor="file_input">Upload file</label>
                <input
                    className="w-75 text-sm text-gray-900 border border-gray-300 rounded-r-md cursor-pointer bg-gray-50 focus:outline-none "
                    id="file_input" type="file"/>
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
