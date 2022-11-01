import React from 'react';
import { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({})

    const handleAddUser = (e) => {
        e.preventDefault();
        console.log(user)

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    alert('user added successfully!');
                    e.target.reset();
                }
                console.log(data)
            })

    };

    const handleInputBlur = (e) => {
        const filed = e.target.name;
        const value = e.target.value;
        const newUser = { ...user }
        newUser[filed] = value;
        setUser(newUser)
    }

    return (
        <div>
            <h2>please add a new user</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type="text" name="name" id="" placeholder='Name' required />
                <br />
                <input onBlur={handleInputBlur} type="text" name="address" id="" placeholder='Address' required />
                <br />
                <input onBlur={handleInputBlur} type="email" name="email" id="" placeholder='Email' required />
                <br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;