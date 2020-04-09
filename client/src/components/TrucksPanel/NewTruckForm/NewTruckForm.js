import React, { useState } from 'react';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const CREATETRUCK_API = `${API_URL}/api/truck/create`;

export default function NewTruckForm(props) {
    const [type, setType] = useState('sprinter');
    const [truckName, setTruckName] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

    const createTruck = async () => {
        await axios.post(CREATETRUCK_API, {
            type, truckName, brand, model
        }, {
            headers: {
                'authorization': localStorage.getItem('jwt_token')
            }
        });
    }

    const handleTypeSelect = (e) => {
        setType(e.target.value);
    }

    const handleTruckNameInput = (e) => {
        setTruckName(e.target.value);
    }

    const handleBrandInput = (e) => {
        setBrand(e.target.value);
    }

    const handleModelInput = (e) => {
        setModel(e.target.value);
    }

    return (
        <div className="block">
            <div className="block__wrapper">
                <form
                    className={`newtruck updateuser ${props.className}`}
                    onSubmit={createTruck}
                >
                    <div className="updateuser__group">
                        <div className="updateuser__info">
                            <label className="updateuser__label" htmlFor='type'> Type: </label>
                            <select
                                name='type'
                                className='newtruck__types'
                                onChange={handleTypeSelect}
                            >
                                <option
                                    className='newtruck__type'
                                    value='sprinter'
                                > Sprinter </option>

                                <option
                                    className='newtruck__type'
                                    value='smallStraight'
                                > Small Straight </option>

                                <option
                                    className='newtruck__type'
                                    value='largeStraight'
                                > Large Straight </option>

                            </select>
                        </div>
                        <div className="updateuser__info">
                            <label className="updateuser__label" htmlFor='truckName'> Name: </label>
                            <input
                                className="updateuser__input"
                                type='text'
                                name='truckName'
                                value={truckName}
                                onChange={handleTruckNameInput}
                                required
                            />
                        </div>
                        <div className="updateuser__info">
                            <label className="updateuser__label" htmlFor='brand'> Brand: </label>
                            <input
                                className="updateuser__input"
                                type='text'
                                name='brand'
                                value={brand}
                                onChange={handleBrandInput}
                                required
                            />
                        </div>
                        <div className="updateuser__info">
                            <label className="updateuser__label" htmlFor='model'> Model: </label>
                            <input
                                className="updateuser__input"
                                type='text'
                                name='model'
                                value={model}
                                onChange={handleModelInput}
                                required
                            />
                        </div>
                        <button className="user__button" type='submit'> Create Truck </button>
                    </div>
                </form>
            </div >
        </div >
    );
}