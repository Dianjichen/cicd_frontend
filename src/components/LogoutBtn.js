import React from 'react';
import Button from "react-bootstrap/Button";
import SERVER_URL from "../constants/server";
import axios from "axios";

function LogoutBtn(props) {

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${SERVER_URL}/user/logout`,
            headers: {
                'Authorization': `Token ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                window.location.href = '/';

            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                localStorage.removeItem('token');  // Remove Token
                window.location.href = '/';  // Redirect to Login
            });

    };


    return (
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
    );
}

export default LogoutBtn;
