import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = 'http://localhost:8080/api/challenges';

const ChallengeManager = () => {
    const [challenges, setChallenges] = useState([]);
    const [challenge, setChallenge] = useState({
        name: '',
        description: '',
        userID: '',
        communityID: '',
        startdate: '',
        enddate: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentChallengeId, setCurrentChallengeId] = useState(null);

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        try {
            const response = await axios.get(apiUrl);
            setChallenges(response.data);
        } catch (error) {
            console.error("Error fetching challenges:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChallenge({ ...challenge, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await axios.put(`${apiUrl}/${currentChallengeId}`, challenge);
        } else {
            await axios.post(apiUrl, challenge);
        }
        resetForm();
        fetchChallenges();
    };

    const resetForm = () => {
        setChallenge({
            name: '',
            description: '',
            userID: '',
            communityID: '',
            startdate: '',
            enddate: '',
        });
        setIsEditing(false);
        setCurrentChallengeId(null);
    };

    const handleEdit = (challenge) => {
        setChallenge(challenge);
        setIsEditing(true);
        setCurrentChallengeId(challenge.challengeID);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${apiUrl}/${id}`);
        fetchChallenges();
    };

    return (
        <div>
            <h2>Challenge Manager</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={challenge.name} onChange={handleChange} placeholder="Challenge Name" required />
                <input type="text" name="description" value={challenge.description} onChange={handleChange} placeholder="Description" required />
                <input type="number" name="userID" value={challenge.userID} onChange={handleChange} placeholder="User ID" required />
                <input type="number" name="communityID" value={challenge.communityID} onChange={handleChange} placeholder="Community ID" required />
                <input type="date" name="startdate" value={challenge.startdate} onChange={handleChange} required />
                <input type="date" name="enddate" value={challenge.enddate} onChange={handleChange} required />
                <button type="submit">{isEditing ? 'Update Challenge' : 'Add Challenge'}</button>
            </form>
            <ul>
                {challenges.map(ch => (
                    <li key={ch.challengeID}>
                        <strong>{ch.name}</strong>: {ch.description} 
                        <button onClick={() => handleEdit(ch)}>Edit</button>
                        <button onClick={() => handleDelete(ch.challengeID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChallengeManager;
