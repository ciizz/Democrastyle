import React, {  } from 'react';
import { Card, Button } from 'react-bootstrap';

const PremadeStyle = (props) => {

    return (
        <Card>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title><h5>{props.title}</h5></Card.Title>
                <Card.Text>
                    <p>
                        {/* {props.description} */}
                        This card has supporting text below as a natural lead-in to additional content.{' '}
                    </p>
                </Card.Text>
                <Button
                variant="primary"
                onClick={props.onSelect}
                >
                Select
                </Button>
            </Card.Body>
        </Card>
    );
}

export default PremadeStyle;