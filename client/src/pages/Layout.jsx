import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout=()=>{
    return (
        <div>
            <h1>Layout Page</h1>
            <div>
                {/* Common layout components like Header, Footer can go here */}
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;