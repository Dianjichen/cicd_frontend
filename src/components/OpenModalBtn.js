import React from 'react';
import Button from "react-bootstrap/Button";

function OpenModalBtn(props) {
    const {clickHandler, btnText} = props;
    return (
        <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" className="mb-3" onClick={clickHandler}>{btnText}</Button>
        </div>
    );
}

export default OpenModalBtn;