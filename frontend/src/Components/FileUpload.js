import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const FileUpload = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group>
                <Row>
                    <Col>
                    <Form.Control
                        type='file'
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={props.onChange}
                    />
                    </Col>
                    <Col>
                    <Button type="submit">Upload Image</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>        
    );
}

export default FileUpload;