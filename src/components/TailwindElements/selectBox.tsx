import {titleCase} from "../../helpers/employeeList-helpers.tsx";

interface Props {
    name: string;
    keyValue: string;
    arr: string[];
    error: boolean;
    value: string;
    setter: (key: string, val: string) => void;
}

function SelectBox({name, keyValue, arr, error, value, setter}: Props) {
    const noError = "text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const hasError = "bg-red-50 border border-red-500 text-red-900 text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div className="w-[175px] mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">{name}</label>
            <select id="shiftStart"
                    className={error ? hasError : noError}
                    value={value}
                    onChange={(e) => setter(keyValue, e.target.value)} required>
                <option value=""></option>
                {arr.map((arrOption) => <option key={arrOption} value={arrOption.toLowerCase()}>{titleCase(arrOption)}</option>)}
            </select>
        </div>
    )
}

export default SelectBox
