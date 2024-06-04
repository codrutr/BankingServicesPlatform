import React, { useState } from 'react';
import axios from 'axios';

function CreditSimulationForm() {
    const [income, setIncome] = useState('');
    const [creditScore, setCreditScore] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:44327/api/CreditSimulation', {
                income,
                creditScore,
                employmentStatus,
                loanAmount,
                loanTerm
            });
            setResult(response.data);
        } catch (error) {
            console.error('There was an error simulating the credit!', error);
        }
    };

    return (
        <div>
            <h2>Credit Simulation</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Income" />
                <input type="number" value={creditScore} onChange={(e) => setCreditScore(e.target.value)} placeholder="Credit Score" />
                <input type="text" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} placeholder="Employment Status" />
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="Loan Amount" />
                <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="Loan Term" />
                <button type="submit">Simulate</button>
            </form>
            {result && (
                <div>
                    <h3>Result:</h3>
                    <p>Approved: {result.isApproved ? 'Yes' : 'No'}</p>
                    <p>Interest Rate: {result.interestRate}%</p>
                </div>
            )}
        </div>
    );
}

export default CreditSimulationForm;
