import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/');
    }




    return (
        <>
            <div className='navbar'>
                <div className="col-md-12 text-end">
                    <button className="btn-secondary py-2 px-4" onClick={logout}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Navbar