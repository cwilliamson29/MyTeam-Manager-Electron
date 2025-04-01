import { faCircleQuestion, faGear, faSquarePlus, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import SettingsDropDown from "./SettingsDropDown";
import AddEmployee from "./AddEmployee";
import { useAppSettings } from "../state/store.ts";
import Help from "./Help.tsx";

function TopBar() {
	const settings = useAppSettings.use.appSettings();
	let [settingVisible, setSettingVisible] = React.useState(false);
	let [addEmpVisible, setAddEmpVisible] = React.useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// Opens the modal to generate team
	const openModal = () => {
		setIsOpen(true);
	};
	// Closes the modal to generate team
	const closeModal = () => {
		setIsOpen(false);
	};

	const handleSettingClick = () => {
		setAddEmpVisible(false);
		setSettingVisible(!settingVisible);
	};
	const handleAddEmpClick = () => {
		setSettingVisible(false);
		setAddEmpVisible(!addEmpVisible);
	};
	return (
		<div className={settings.colorMode + "-mode"}>
			<div className="flex justify-end pb-2 mt-2">
				<div className="flex justify-end">
					<div className="flex text-center pr-5 settings-icon" onClick={() => openModal()}>
						<p className="mr-1">Help</p>
						<FontAwesomeIcon icon={faCircleQuestion} className="settings-icon" />
					</div>
					<div className="flex text-center pr-5 settings-icon" onClick={() => handleAddEmpClick()}>
						<p className="mr-1">{!addEmpVisible ? "Add" : "Close"}</p>
						{!addEmpVisible ? <FontAwesomeIcon icon={faSquarePlus} className="settings-icon" /> : <FontAwesomeIcon icon={faSquareXmark} className="settings-icon" />}
					</div>
					<div className="flex pr-3 text-center settings-icon" onClick={() => handleSettingClick()}>
						<p className="mr-1">{!settingVisible ? "" : "Close"}</p>
						{!settingVisible ? <FontAwesomeIcon icon={faGear} className="settings-icon" /> : <FontAwesomeIcon icon={faSquareXmark} className="settings-icon" />}
						{/*<FontAwesomeIcon icon={faGear} className="settings-icon"/>*/}
					</div>
				</div>
			</div>
			<Help isOpen={isOpen} onClose={closeModal} />
			<SettingsDropDown show={settingVisible} />
			<AddEmployee show={addEmpVisible} />
		</div>
	);
}

export default TopBar;

//  style={{height: "1.4em"}}