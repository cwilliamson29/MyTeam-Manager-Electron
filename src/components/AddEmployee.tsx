import {Button, Form, Tab, Tabs} from 'react-bootstrap';
import TabOneAddSingleEmployee from "../helpers/TabOne-AddSingleEmployee.tsx";

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
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload File for Batch processing</Form.Label>
                        <Form.Control type="file" size="lg"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Upload File
                    </Button>
                </Tab>
                <Tab eventKey="update" title="Update From Excel">
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload File for Batch processing and UPDATING current list</Form.Label>
                        <Form.Control type="file" size="lg"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Upload File
                    </Button>
                </Tab>
            </Tabs>
        </div>
    );
}

export default AddEmployee;