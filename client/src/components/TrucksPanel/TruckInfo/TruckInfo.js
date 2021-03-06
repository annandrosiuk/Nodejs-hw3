import React, { useState } from 'react';

import InfoTile from '../../InfoTile/InfoTile';
import TruckUpdateForm from './TruckUpdateForm/TruckUpdateForm';

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const ASSIGNTRUCK_API = `${API_URL}/api/truck/assign`;
const DELETETRUCK_API = `${API_URL}/api/truck/delete`;

export default function TruckInfo(props) {
    const [showTruckUpdateForm, setShowTruckUpdateForm] = useState(false);

    const truck = props.truck;

    const assignTruck = async () => {
        await axios.put(ASSIGNTRUCK_API, { truckId: truck._id }, {
            headers: {
                'authorization': localStorage.getItem('jwt_token')
            }
        });
    }

    const deleteTruck = async () => {
        await axios.delete(DELETETRUCK_API, {
            data: {
                truckId: truck._id
            },
            headers: {
                'authorization': localStorage.getItem('jwt_token')
            }
        });
        window.location.reload(false);
    }

    const toggleShowTruckUpdateForm = () => {
        setShowTruckUpdateForm(!showTruckUpdateForm);
    }

    return (
        <div className="load-wrapper">
            <form className='load' onSubmit={assignTruck}>
                <h3 className='load__status'>{truck.truckName.toUpperCase()}</h3>
                <h4 className='load__status'>{truck.assigned_to
                    ? 'Assigned'
                    : 'Not assigned'
                }</h4>

                {!truck.assigned_to && <button className="user__button" type="submit"> Assign this truck </button>}

                <InfoTile
                    label={'Brand:'}
                    info={truck.brand}
                />

                <InfoTile
                    label={'Model:'}
                    info={truck.model}
                />

                <InfoTile
                    label={'Type:'}
                    info={truck.type}
                />

                <InfoTile
                    label={'Status:'}
                    info={truck.status}
                />

                {!truck.assigned_to &&
                    <button className="user__button" type='button' onClick={deleteTruck}>
                        Delete this truck
                    </button>
                }
            </form>

            {!truck.assigned_to && <button className="user__button" type='button' onClick={toggleShowTruckUpdateForm}>
                {showTruckUpdateForm
                    ? 'Close update Truck Info'
                    : 'Update Truck Info'
                }
            </button>
            }

            {showTruckUpdateForm && <TruckUpdateForm truck={truck} className='load-wrapper__updatetruck' />}
        </div>
    );
}