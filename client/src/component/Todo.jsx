import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import instance from '../helpers/axios';
import Navbar from './Navbar';

function Todo() {
    const [activity, setActivity] = useState({ time: '', date: '', activityType: 'Run' });
    const navigate = useNavigate()
    const [userId, setUserId] = useState('');

    if (localStorage?.length === 0) {
        return <Navigate to='/' />
    }

    function handleChange(e) {
        let { name, value } = e.target;
        setActivity({ ...activity, [name]: value })
    }

    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        instance
            .get(`users/activity?email=${userEmail}`, { headers })
            .then((response) => {
                const user = response.data;
                setUserId(user._id);
            })
            .catch((error) => {
                if (error.response.data === 'unauthorized') {
                    alert('session expired');
                    navigate('/');
                }
                console.error('Failed to fetch user:', error);
            });
    }, [])

    async function handleClick(e) {
        e.preventDefault();
        if (Object.keys(activity).length > 0 ) {
            try {
                await instance.post('users/activity', {
                    duration: activity.time,
                    date: activity.date,
                    activityType: activity.activityType,
                    user: userId,
                    email: userEmail
                }, { headers })

                navigate('/activities')
            } catch (err) {
                if(err.response.status === 500){
                    alert('kindly fill the fields')
                }
                console.log(err)
            }
            setActivity({ time: '', date: '', activityType: '' })
        } else {
            alert('Please enter the Data')
        }

    }

    return (
        <div>

            <Navbar />

            <section className="activityForm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <form className='form--wrapper'>
                                <div className="mb-3">
                                    <label className="form-label">Select Activity</label>
                                    <select className="form-select" name="activityType" value={activity.activityType} onChange={handleChange} id="activityList">
                                        <option value="Run" >Run</option>
                                        <option value="Bicycle Ride">Bicycle Ride</option>
                                        <option value="Swim">Swim</option>
                                        <option value="Walk">Walk</option>
                                        <option value="Hike">Hike</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Duration</label>
                                    <input type="text" onChange={handleChange} name="time" className="form-control" value={activity.time} placeholder="Time" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date</label>
                                    <input type="date" onChange={handleChange} name="date" className="form-control" id="" value={activity.date} placeholder="Date" />
                                </div>
                                <div className='btn--wrapper'>
                                    <button className='btn btn-secondary' onClick={handleClick}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Todo
