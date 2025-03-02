interface Props {
    names: string[];
    show: string;
    setter: (val: string) => void;
}

function TabView({names, show, setter}: Props) {
    let tabHide = "inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-600 focus:border-blue-500 dark:hover:text-blue-300";
    let tabShow = "inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-600 border-blue-500 dark:hover:text-blue-300";

    let liShow = "me-2 bg-gray-600 text-blue-300"
    let liHide = "me-2 hover:bg-gray-600"

    return (
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700 ">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                {names.map((name) => {
                        let str = name.replace(/\s+/g, '-').toLowerCase()
                        return (
                            <li className={str === show ? liShow : liHide} role="presentation">
                                <button className={str === show ? tabShow : tabHide}
                                        id={str}
                                        data-tabs-target={"#" + str} type="button" role="tab"
                                        aria-controls={str + "-tab"}
                                        aria-selected={str === "add-team-member"}
                                        onClick={() => {
                                            setter(str)
                                        }}>
                                    {name}
                                </button>
                            </li>
                        )
                    }
                )}
            </ul>
        </div>
    )
}

export default TabView
