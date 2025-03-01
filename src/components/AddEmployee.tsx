import TabView from "./TailwindElements/tabView.tsx";
import TabOneAddSingleEmployee from "./tabComponents/TabOne-AddSingleEmployee.tsx";
import TabThreeUpdateByExcel from "./tabComponents/TabThree-UpdateByExcel.tsx";
import TabTwoAddByExcel from "./tabComponents/TabTwo-AddByExcel.tsx";
import {useState} from "react";

interface Props {
    show: boolean;
}

function AddEmployee({show}: Props) {
    let hide = show ? " open" : "";
    let names: string[] = ["Add Team Member", "Add From Excel", "Update From Excel"]
    let [view, setView] = useState("add-team-member")

    const setTabView = (val: string) => {
        setView(val)
    }
    return (
        <div className={"box " + hide}>
            <TabView show={view} names={names} setter={setTabView}/>
            <div id="default-tab-content">
                <TabOneAddSingleEmployee show={view}/>
                <TabTwoAddByExcel show={view}/>
                <TabThreeUpdateByExcel show={view}/>
            </div>
            {/*<Tabs*/}
            {/*    defaultActiveKey="addEmployee"*/}
            {/*    id="uncontrolled-tab"*/}
            {/*    className="mb-3">*/}
            {/*    <Tab eventKey="addEmployee" title="Add Team Member">*/}
            {/*        <TabOneAddSingleEmployee/>*/}
            {/*    </Tab>*/}
            {/*    <Tab eventKey="addExcel" title="Add From Excel">*/}
            {/*        <TabTwoAddByExcel/>*/}
            {/*    </Tab>*/}
            {/*    <Tab eventKey="update" title="Update From Excel">*/}
            {/*        <TabThreeUpdateByExcel/>*/}
            {/*    </Tab>*/}
            {/*</Tabs>*/}
        </div>
    );
}

export default AddEmployee;