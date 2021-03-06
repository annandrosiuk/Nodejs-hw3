import React, { useState, useEffect } from 'react';

import TruckInfo from './TruckInfo/TruckInfo';
import NewTruckForm from './NewTruckForm/NewTruckForm';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const TRUCKS_API = `${API_URL}/api/truck/allForUser`;

export default function TrucksPanel() {
    const [trucks, setTrucks] = useState(null);
    const [showNewTruckForm, setShowNewTruckForm] = useState(false);

    const fetchTrucks = async () => {
        const trucks = await axios.get(TRUCKS_API, {
            headers: {
                'authorization': localStorage.getItem('jwt_token')
            }
        });

        return trucks.data;
    }

    const toggleShowNewTruckForm = () => {
        setShowNewTruckForm(!showNewTruckForm);
    }

    useEffect(() => {
        (async () => setTrucks(await fetchTrucks()))();
    }, []);

    return (
        <div className="block">
            <div className="block__wrapper">
                <div className='loads'>
                    <h2 className='loads__title'> Your Trucks: </h2>

                    <button
                        className="user__button"
                        type='button'
                        onClick={toggleShowNewTruckForm}
                    >
                        {showNewTruckForm
                            ? 'Close Truck form'
                            : 'Create new Truck'
                        }
                    </button>

                    {showNewTruckForm && <NewTruckForm className='loads__newload' />}

                    {trucks
                        ? <div className='loads__panel'>
                            {trucks.map(truck => {
                                return <TruckInfo
                                    key={truck._id}
                                    truck={truck}
                                />
                            })}
                        </div>
                        : <h3>You have not added any trucks</h3>
                    }
                </div>
            </div>
        </div>
    );
}