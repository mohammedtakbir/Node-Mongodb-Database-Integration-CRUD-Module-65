import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/users/add'>Add User</Link>
            <Link to='/update'>Update</Link>
        </div>
    );
};

export default Navbar;