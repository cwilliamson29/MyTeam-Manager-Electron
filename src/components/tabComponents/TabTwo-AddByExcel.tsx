import {Button, Form} from "react-bootstrap";
// TODO: `Need to add updating by excel parsing functionality`
export default function TabTwoAddByExcel() {
    return (
        <div>
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
