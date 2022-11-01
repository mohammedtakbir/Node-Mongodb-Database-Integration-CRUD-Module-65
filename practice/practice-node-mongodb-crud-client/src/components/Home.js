import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = (user) => {
        const agree = window.confirm(`are you sure you want to delete ${user.name}`)
        if (agree) {
            fetch(`http://localhost:5001/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remaining = users.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remaining);
                    }
                    // console.log(data)
                })
        }
    }
    return (
        <>
            <h2>Users: {displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user =>
                        <p key={user._id}>
                            <span style={{ fontWeight: '500' }}>{user.name}: </span>
                            <span>{user.email}</span>
                            <Link to={`/update/${user._id}`}>
                                <button style={{ margin: '0 10px' }}>update</button>
                            </Link>
                            <button onClick={() => handleDelete(user)}>X</button>
                        </p>
                    )
                }
            </div>
        </>
    );
};

export default Home;