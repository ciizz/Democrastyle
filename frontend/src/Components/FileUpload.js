import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FileUpload = (props) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Col>
                    <Form.Control
                        type='file'
                        id='image-file'
                        label='Choose File'
                        name='images'
                        custom
                        onChange={props.onChange}
                    />
                    </Col>
                </Row>
            </Form.Group>
        </Form>        
    );
}

export default FileUpload;