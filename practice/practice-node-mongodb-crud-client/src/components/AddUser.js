import React from 'react';
import { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({})

    const handleAddUser = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:5001/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                alert('user added successfully!')
            }
            console.log(data)
        })
    };

    const handleInputBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h1 style={{ marginBottom: '10px' }}>Add a new user</h1>
            <form onSubmit={handleAddUser}>
                <input
                    onBlur={handleInputBlur}
                    type="text"
                    name="name"
                    id=""
                    required
                    placeholder='Your name'
                />
                <br />
                <input
                    onBlur={handleInputBlur}
                    type="text"
                    name="address"
                    id=""
                    required
                    placeholder='Your address'
                />
                <br />
                <input
                    onBlur={handleInputBlur}
                    type="email"
                    name="email"
                    id=""
                    required
                    placeholder='Your email'
                />
                <br />
                <input type="submit" value="add user" />
            </form>
        </div>
    );
};

export default AddUser;