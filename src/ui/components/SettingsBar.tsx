import {faGear, faSquarePlus, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from 'react';
import SettingsDropDown from "./SettingsDropDown";
import AddEmployee from "./AddEmployee";

function SettingsBar() {
    let [settingVisible, setSettingVisible] = React.useState(false);
    let [addEmpVisible, setAddEmpVisible] = React.useState(false);

    const handleSettingClick = () => {
        setAddEmpVisible(false)
        setSettingVisible(!settingVisible)
    }
    const handleAddEmpClick = () => {
        setSettingVisible(false)
        setAddEmpVisible(!addEmpVisible)
    }
    return (
        <div className="dark-mode">
            <div className="d-flex justify-content-between pt-2 pb-2 settings-bar">
                <div className="ps-3"><h4>MyTeam Manager</h4></div>
                <div className="d-flex justify-content-end align-content-center">
                    <div className="d-flex text-center pe-3 settings-icon"
                         onClick={() => handleAddEmpClick()}>
                        <p className="me-2">{!addEmpVisible ? "Add" : "Close"}</p>
                        {!addEmpVisible ? <FontAwesomeIcon icon={faSquarePlus} className="settings-icon"/> :
                            <FontAwesomeIcon icon={faSquareXmark} className="settings-icon"/>}
                    </div>
                    <div className="pe-3 text-center" onClick={() => handleSettingClick()}>
                        <FontAwesomeIcon icon={faGear} className="settings-icon"/>
                    </div>
                </div>
            </div>
            <SettingsDropDown show={settingVisible}/>
            <AddEmployee show={addEmpVisible}/>
        </div>
    );
}

export default SettingsBar;

//  style={{height: "1.4em"}}