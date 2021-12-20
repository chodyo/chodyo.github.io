import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Student: React.FC<{}> = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [floor, setFloor] = useState("");
    const [location, setLocation] = useState("");

    return (
        <div>
            <Form.Group>
                <Form.Label>Student's first name</Form.Label>
                <Form.Control type="text" name="FirstName" />
            </Form.Group>

            <br />

            <Form.Group>
                <Form.Label>Student's last name</Form.Label>
                <Form.Control type="text" name="LastName" />
            </Form.Group>

            <br />

            <Form.Group>
                <Form.Label>Floor</Form.Label>
                <Form.Control type="number" name="Floor" />
            </Form.Group>

            <br />

            <Form.Group>
                <Form.Label>School code</Form.Label>
                <Form.Control type="text" name="SchoolCode" />
                <Form.Text className="text-muted">
                    e.g. M217 for PS/IS 217
                </Form.Text>
            </Form.Group>

            <br />
        </div>
    );
};
