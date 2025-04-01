import React from 'react';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import SERVER_URL from "../constants/server";
import axios from "axios";

function NoteItem(props) {

    const note = props.note;
    const onUpdate = props.onUpdate;
    const onDelete = props.onDelete;

    return (
        <Card className="mb-3 shadow-sm" key={note.id}>
            <Card.Body>
                {/* Title and Buttons Row */}
                <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{note.title}</Card.Title>
                    <div>
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => onUpdate(note)}
                        >
                            Update
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => onDelete(note.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Note Content */}
                <Card.Text>{note.content}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default NoteItem;