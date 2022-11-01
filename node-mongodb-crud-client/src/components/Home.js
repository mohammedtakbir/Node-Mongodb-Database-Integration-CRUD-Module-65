import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users)

    const handleDelete = (user) => {
        const agree = window.confirm(`are you sure you want to delete ${user.name}`)
        if (agree) {
            // console.log('deleting' , user._id);
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully')
                        const remainingUsers = displayUsers.filter(usr => usr._id !== user._id)
                        setDisplayUsers(remainingUsers)
                    }
                    // console.log(data)
                })
        }
    }

    return (
        <div>
            <h2>users: {displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>
                        <span style={{ fontWeight: '700' }}>{user.name}: </span>
                        <span>{user.email}</span>
                        <span>
                            <Link to={`/update/${user._id}`} style={{margin: '0 10px'}}>
                                <button>update</button>
                            </Link>
                        </span>
                        <button onClick={() => handleDelete(user)}>X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;