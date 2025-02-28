interface Props {
    name: string;
    type: string;
    placeHolder: string;
    value: string;
    keyValue: string;
    setter: (key: string, val: string) => void
}

function TextBox({name, type, placeHolder, value, keyValue, setter}: Props) {
    return (
        <div className="mb-5 pl-2">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">{name}</label>
            <input type={type} id={keyValue} value={value} onChange={(e) => setter(keyValue, e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={placeHolder} required/>
        </div>
    )
}

export default TextBox
