import React, { } from 'react';
import { Card, Button, Ratio } from 'react-bootstrap';

const PremadeStyle = (props) => {

    return (
        <Card>
            <Ratio aspectRatio={"4x3"}>
                <Card.Img variant="top" src={props.image} />
            </Ratio>
            <Card.Body>
                <Card.Title><h5>{props.title}</h5></Card.Title>
                <Button
                    variant="primary"
                    onClick={props.onSelect}
                    disabled={props.isSelected}
                >
                    {props.isSelected ? 'Selected' : 'Select'}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default PremadeStyle;