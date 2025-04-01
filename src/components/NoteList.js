import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import SERVER_URL from "../constants/server";
import axios from "axios";

import OpenModalBtn from "./OpenModalBtn";
import NoteModal from "./NoteModal";
import NoteItem from "./NoteItem";

const categories = ["To-Do"];

const NoteList = ({notes}) => {
        const [show, setShow] = useState(false);
        const [noteList, setNoteList] = useState([]);
        const [selectedNote, setSelectedNote] = useState(null);

        const token = localStorage.getItem('token');
        const config = {
            maxBodyLength: Infinity,
            url: `${SERVER_URL}/note/`,
            headers: {
                'Authorization': `Token ${token}`
            }
        };

        const getNoteList = () => {
            const getConfig = {...config, 'method': 'get'};

            if (token) {
                axios.request(getConfig)
                    .then((response) => {
                        setNoteList(response.data);
                        console.log(JSON.stringify(response.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

        useEffect(() => {
            getNoteList();
        }, []);


        const clickAddNoteHandler = function () {
            setSelectedNote(null);
            openModalHandler();
        }
        const clickUpdateHandler = function (note) {
            setSelectedNote(note);
            openModalHandler();
        }
        const openModalHandler = function () {
            !show && setShow(true);
        }
        const clickCloseModalHandler = function () {
            setShow(false);
        }

        const onDelete = (id) => {
            const token = localStorage.getItem('token');
            const delConfig = {...config, method: "delete", data : {note_id : id}};
            if (token) {
                axios.request(delConfig)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                        setNoteList(noteList.filter(note => note.id !== id));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        };

        return (
            <Container className="mt-4">
                <h1 className="text-center mb-4">Note List</h1>
                <OpenModalBtn btnText="Add Note" clickHandler={clickAddNoteHandler}/>
                {/*<Row className="d-flex justify-content-center">*/}
                {/*    {categories.map((category, index) => (*/}
                {/*        <Col md={4} key={index}>*/}
                {/*            <h4 className="text-center">{category}</h4>*/}
                {/*            <div className="kanban-column p-2 rounded" style={{minHeight: "300px"}}>*/}
                {/*                {noteList*/}
                {/*                    // .filter(note => note.category === category)*/}
                {/*                    .map((note) => (*/}
                {/*                        <NoteItem*/}
                {/*                            key={note.id}*/}
                {/*                            note={note}*/}
                {/*                            onUpdate={() => clickUpdateHandler(note)}*/}
                {/*                            onDelete={onDelete}*/}
                {/*                        />*/}
                {/*                    ))}*/}

                {/*            </div>*/}
                {/*        </Col>*/}
                {/*    ))}*/}
                {/*</Row>*/}
                {show &&
                    <NoteModal
                        note={selectedNote}
                        getNoteList={getNoteList}
                        clickCloseModalHandler={clickCloseModalHandler}
                        handleSubmit={function () {
                        }}
                    />}
            </Container>
        );
    }
;

export default NoteList;

