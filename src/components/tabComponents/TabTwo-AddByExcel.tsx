import {Button, Form} from "react-bootstrap";

interface Props {
    show: string;
}

// TODO: `Need to add updating by excel parsing functionality`
export default function TabTwoAddByExcel({show}: Props) {
    let tabShow = "p-4 rounded-lg bg-gray-50 dark:bg-gray-800";
    let tabHide = "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"


    return (
        <div className={show === "add-from-excel" ? tabShow : tabHide} id="add-team-member" role="tabpanel" aria-labelledby="add-team-member-tab">
            <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Upload File for Batch processing</Form.Label>
                <Form.Control type="file" size="lg"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Upload File
            </Button>
        </div>
    );
}
