import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout=()=>{
    return (
        <div>
            <div className='min-h-screen bg-gray-50'>
                {/* Common layout components like Header, Footer can go here */}
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;