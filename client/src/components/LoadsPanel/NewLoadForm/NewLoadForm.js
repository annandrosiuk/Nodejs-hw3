import React, { useState } from 'react';
import './NewLoadForm.scss';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const CREATELOAD_API = `${API_URL}/api/load/create`;

export default function NewLoadForm(props) {
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [payload, setPayload] = useState(0);

    const createLoad = async () => {
        await axios.post(CREATELOAD_API, {
            length, width, height, payload
        }, {
            headers: {
                'authorization': localStorage.getItem('jwt_token')
            }
        });
    }

    const handleLengthInput = (e) => {
        setLength(e.target.value);
    }

    const handleWidthInput = (e) => {
        setWidth(e.target.value);
    }

    const handleHeightInput = (e) => {
        setHeight(e.target.value);
    }

    const handlePayloadInput = (e) => {
        setPayload(e.target.value);
    }

    return (
        <div className="block">
            <div className="block__wrapper">
                <form
                    className={`newload updateuser  ${props.className}`}
                    onSubmit={createLoad}
                >
                    <div className="updateuser__group">
                        <div className="updateuser__info">
                            <label className="updateuser__label" htmlFor='length'> Length: </label>
                            <input
                                className="updateuser__input"
                                type='number'
                                name='length'
                                value={length}
                                onChange={handleLengthInput}
                                required
                            />
                        </div>
                        <div className="updateuser__info">
                            <label className="updateuser__label" htmlFor='width'> Width: </label>
                            <input
                                className="updateuser__input"
                                type='number'
                                name='width'
                                value={width}
                                onChange={handleWidthInput}
                                required
                            />
                        </div>
                        <div className="updateuser__info">
                            <label className="updateuser__label" htmlFor='height'> Height: </label>
                            <input
                                className="updateuser__input"
                                type='number'
                                name='height'
                                value={height}
                                onChange={handleHeightInput}
                                required
                            />
                        </div>
                        <div className="updateuser__info">
                            <label className="updateuser__label" htmlFor='payload'> Payload: </label>
                            <input
                                className="updateuser__input"
                                type='number'
                                name='payload'
                                value={payload}
                                onChange={handlePayloadInput}
                                required
                            />
                        </div>
                    </div>
                    <button className="user__button" type='submit'> Create Load </button>

                </form>
            </div>
        </div>
    );
}