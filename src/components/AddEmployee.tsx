import {Tab, Tabs} from 'react-bootstrap';
import TabOneAddSingleEmployee from "../helpers/TabOne-AddSingleEmployee.tsx";
import TabTwoAddByExcel from "../helpers/TabTwo-AddByExcel.tsx";
import TabThreeUpdateByExcel from "../helpers/TabThree-UpdateByExcel.tsx";

interface Props {
    show: boolean;
}

function AddEmployee({show}: Props) {
    let hide = show ? " open" : "";

    return (
        <div className={"box " + hide}>
            <Tabs
                defaultActiveKey="addEmployee"
                id="uncontrolled-tab"
                className="mb-3">
                <Tab eventKey="addEmployee" title="Add Team Member">
                    <TabOneAddSingleEmployee/>
                </Tab>
                <Tab eventKey="addExcel" title="Add From Excel">
                    <TabTwoAddByExcel/>
                </Tab>
                <Tab eventKey="update" title="Update From Excel">
                    <TabThreeUpdateByExcel/>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AddEmployee;