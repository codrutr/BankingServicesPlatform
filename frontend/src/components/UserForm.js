import React, { useState } from 'react';
import { createUser } from '../services/api';

const UserForm = () => {
    const [formData, setFormData] = useState({
        income: '',
        creditScore: '',
        employmentStatus: '',
        loanAmount: '',
        loanTerm: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            alert('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Income:
                <input type="text" name="income" value={formData.income} onChange={handleChange} />
            </label>
            <label>
                Credit Score:
                <input type="text" name="creditScore" value={formData.creditScore} onChange={handleChange} />
            </label>
            <label>
                Employment Status:
                <input type="text" name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} />
            </label>
            <label>
                Loan Amount:
                <input type="text" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
            </label>
            <label>
                Loan Term:
                <input type="text" name="loanTerm" value={formData.loanTerm} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
