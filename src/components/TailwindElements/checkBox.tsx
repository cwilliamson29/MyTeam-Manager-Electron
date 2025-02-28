interface Props {
    day: string;
    onChange: (e: any, day: string) => void;
}

function CheckBox({day, onChange}: Props) {
    return (
        <div className="flex items-center mb-4 pl-3">
            <input id={day} type="checkbox" value={day} onChange={(e) => onChange(e, day)}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="checkbox-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{day}</label>
        </div>
    )
}

export default CheckBox
