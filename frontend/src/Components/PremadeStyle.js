import React, {  } from 'react';
import { Card, Button } from 'react-bootstrap';

const PremadeStyle = (props) => {

    return (
        <Card>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title><h5>{props.title}</h5></Card.Title>
                <Button
                variant="primary"
                onClick={props.onSelect}
                disabled={props.isSelected}
                >
                { props.isSelected ? 'Selected' : 'Select'}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default PremadeStyle;