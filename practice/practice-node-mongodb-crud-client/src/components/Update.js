import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5001/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                alert('user updated!')
            }
            console.log(data)
        })


    };

    const handleInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    };
    return (
        <div>
            <h1>update an user</h1>
            <form onSubmit={handleUpdate}>
                <input
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                    id=""
                    required
                    placeholder='Your name'
                    defaultValue={storedUser.name}
                />
                <br />
                <input
                    onChange={handleInputChange}
                    type="text"
                    name="address"
                    id=""
                    required
                    placeholder='Your address'
                    defaultValue={storedUser.address}
                />
                <br />
                <input
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    id=""
                    required
                    placeholder='Your email'
                    defaultValue={storedUser.email}
                />
                <br />
                <input type="submit" value="update user" />
            </form>
        </div>
    );
};

export default Update;