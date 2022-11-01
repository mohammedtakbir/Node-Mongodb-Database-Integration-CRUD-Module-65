import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser)
    const handleUpdateUser = (e) => {
        e.preventDefault();
        // console.log(user)
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('user updated')
            }
            console.log(data)
        })
    };

    const handleInputChange = (e) => {
        const filed = e.target.name;
        const value = e.target.value;
        const newUser = { ...user }
        newUser[filed] = value;
        setUser(newUser)
    }
    return (
        <div>
            <h2>update</h2>
            <h3>{storedUser.name}</h3>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.name} name="name" id="" placeholder='Name' required />
                <br />
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.address} name="address" id="" placeholder='Address' required />
                <br />
                <input onChange={handleInputChange} type="email" defaultValue={storedUser.email} name="email" id="" placeholder='Email' required />
                <br />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Update;