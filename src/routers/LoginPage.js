import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Form, Row, Col, Container} from 'react-bootstrap';
import axios from 'axios';
import SERVER_URL from "../constants/server";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!!token) {
            window.location.href = '/noteList';
        }
    }, []);

    const handleEmailChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            "username": username,
            "password": password
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${SERVER_URL}/user/login/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                const token = response.data.token;
                if(!token){
                    console.log("No token");
                    return;
                }

                localStorage.setItem('token', token);
                window.location.href = '/noteList';
            })
            .catch((error) => {
                localStorage.setItem('token', "");
                console.log(error);
            });

    };

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setUsername('');
        setPassword('');
    };

    const handleClickRegister = () => {
        // Handle registration logic here

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${SERVER_URL}/user/register/`,
            headers: {},
            data: {
                username: username,
                password: password
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{
                width: "35rem",
                padding: "2rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px"
            }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4"
                                style={{fontSize: "1.5rem", fontWeight: "bold"}}>Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">Username</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="text"
                                    placeholder="tesetid"
                                    onChange={handleEmailChange}
                                    value={username}
                                    aria-label="username"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">Password</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={handlePasswordChange}
                                    value={password}
                                    aria-label="password"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        {
                            mode === "register" && (
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4">Confirm Password</Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="password"
                                            placeholder="••••••••"
                                            aria-label="confirm-password"
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                            )
                        }
                        {
                            mode === "login" && (
                                <div className="d-flex justify-content-center mt-4">
                                    <Button variant="outline-primary" className="w-45 mx-1" onClick={toggleMode}>Sign
                                        Up</Button>
                                    <Button variant="primary" className="w-45 mx-1"
                                            type={"submit"}>Login</Button>
                                </div>
                            )
                        }
                        {
                            mode === "register" && (
                                <div className="d-flex justify-content-center mt-4">
                                    <Button variant="outline-primary" className="w-45 mx-1"
                                            onClick={handleClickRegister}>Register</Button>
                                </div>
                            )
                        }
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;
