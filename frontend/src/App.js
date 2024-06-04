import React, { useState, useEffect } from 'react';
import './App.css';
import { getUsers, createUser, simulateCredit } from './services/api.js';

function App() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        income: '',
        creditScore: '',
        employmentStatus: '',
        loanAmount: '',
        loanTerm: ''
    });
    const [selectedUser, setSelectedUser] = useState('');
    const [simulationResult, setSimulationResult] = useState(null);
    const [showSimulation, setShowSimulation] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            fetchUsers();
            setShowSimulation(true);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleSimulate = async () => {
        try {
            const result = await simulateCredit(selectedUser);
            setSimulationResult(result);
        } catch (error) {
            console.error('Error simulating credit:', error);
        }
    };

    return (
        <div className="App">
            <h1>Banking Services Platform</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label>What is your name?</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />

                <label>What is your monthly income?</label>
                <input type="number" name="income" value={formData.income} onChange={handleChange} placeholder="Income" required />

                <label>What is your credit score?</label>
                <select name="creditScore" value={formData.creditScore} onChange={handleChange} style={{ color: getCreditScoreColor(formData.creditScore) }} required>
                    {[...Array(21).keys()].map(i => {
                        const score = i * 50;
                        return <option key={score} value={score}>{score}</option>;
                    })}
                </select>

                <label>What is your employment status?</label>
                <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required>
                    <option value="Employed">Employed</option>
                    <option value="Unemployed">Unemployed</option>
                </select>

                <label>What is your desired loan amount?</label>
                <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} placeholder="Loan Amount" required />

                <label>What is your desired loan term (years)?</label>
                <select name="loanTerm" value={formData.loanTerm} onChange={handleChange} required>
                    {[...Array(40).keys()].map(i => {
                        const term = i + 1;
                        return <option key={term} value={term}>{term}</option>;
                    })}
                </select>

                <button type="submit">Submit</button>
            </form>

            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            {showSimulation && (
                <div>
                    <h2>Would you like to do a credit simulation next?</h2>
                    <select onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <button onClick={handleSimulate}>Simulate</button>

                    {simulationResult && (
                        <div>
                            <h3>Result:</h3>
                            <p>Approved: {simulationResult.approved ? 'Yes' : 'No'}</p>
                            <p>Interest Rate: {simulationResult.interestRate}%</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const getCreditScoreColor = (score) => {
    if (score >= 0 && score <= 300) return 'red';
    if (score > 300 && score <= 600) return 'orange';
    return 'green';
};

export default App;
