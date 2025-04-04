interface Props {
  val: string;
  onChange: (e: any, day: string) => void;
}

function CheckBox({ val, onChange }: Props) {
  return (
    <div className="flex items-center justify-center m-3 ">
      <input
        id={val}
        type="checkbox"
        value={val}
        onChange={(e) => onChange(e, val)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="checkbox-1"
        className="ms-2 text-sm font-medium text-white dark:text-gray-300"
      >
        {val}
      </label>
    </div>
  );
}

export default CheckBox;
