// CreateTransfer.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateTransfer = () => {
    const [profileId, setProfileId] = useState('');
    const [quoteId, setQuoteId] = useState('');
    const [targetAccountId, setTargetAccountId] = useState('');
    const [customerTransactionId, setCustomerTransactionId] = useState('');
    const [transfer, setTransfer] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/create-transfer/', {
                profileId,
                quoteId,
                targetAccountId,
                customerTransactionId,
            });
            setTransfer(response.data);
            setError('');
        } catch (err) {
            setError(err.response.data.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Create Payment Transfer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Profile ID:</label>
                    <input value={profileId} onChange={(e) => setProfileId(e.target.value)} required />
                </div>
                <div>
                    <label>Quote ID:</label>
                    <input value={quoteId} onChange={(e) => setQuoteId(e.target.value)} required />
                </div>
                <div>
                    <label>Target Account ID:</label>
                    <input value={targetAccountId} onChange={(e) => setTargetAccountId(e.target.value)} required />
                </div>
                <div>
                    <label>Customer Transaction ID:</label>
                    <input
                        value={customerTransactionId}
                        onChange={(e) => setCustomerTransactionId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Transfer</button>
            </form>
            {transfer && <pre>{JSON.stringify(transfer, null, 2)}</pre>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateTransfer;
