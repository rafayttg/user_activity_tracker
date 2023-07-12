import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom';
import instance from '../helpers/axios';
import Navbar from './navbar';

function Acitivities() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('');
    const [activities, setActivities] = useState('')

    if (localStorage?.length === 0) {
        return <Navigate to='/' />
    }
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        instance.get(`users/activity?email=${userEmail}`, { headers })
            .then((response) => {
                const user = response.data;
                setUserId(user._id);

                instance.get(`users/activity/activities?userId=${user._id}`, { headers })
                    .then((resp) => {
                        setActivities(resp.data);
                    })
                    .catch((error) => {
                        if (error.response.data === 'unauthorized') {
                            navigate('/');
                        }
                        console.log(error);
                    });
            })
            .catch((error) => {
                if (error.response.data === 'unauthorized') {
                    alert('session expired');
                    navigate('/');
                }
                console.error('Failed to fetch user:', error);
            });
    }, []);


    const handleDelete = (id) => {
        try {
            instance.delete(`users/activity/${id}?userId=${userId}`, { headers }).
                then(resp => {
                    setActivities(resp.data)

                }).catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <Navbar />

            
            <section className="activityRegistered">
                <div className='container'>
                    <div className="row m-0">
                        <div className="card--wrapper d-flex">

                            {
                                activities?.length > 0 ? (
                                    activities.map((a, i) => {
                                        const timespan = a.date
                                        const date = new Date(timespan).toLocaleDateString();

                                        return (
                                            <div className='user--wrapper' key={i}>
                                                <div className="card" style={{ width: 18 + 'rem' }}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Activity</h5>
                                                        <h6>{a.activityType}</h6>
                                                        <h6>Duration : <span>{a.duration}</span></h6>
                                                        <h6>Data : <span>{date}</span></h6>
                                                        <button style={{ width: 70 + 'px' }} onClick={() => handleDelete(a._id)} className="btn-sm btn-secondary">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })) : (
                                    <p>No activities found</p>
                                )
                            }

                        </div>
                        <button style={{ width: 200 + 'px' }} className='btn btn-success' onClick={() => { navigate('/todo') }}>Add Activity</button>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Acitivities