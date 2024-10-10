// CreateQuote.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateQuote = () => {
    const [sourceCurrency, setSourceCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [sourceAmount, setSourceAmount] = useState('');
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/create-quote/', {
                sourceCurrency,
                targetCurrency,
                sourceAmount,
            });
            setQuote(response.data);
            setError('');
        } catch (err) {
            setError(err.response.data.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Create Payment Quote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Source Currency:</label>
                    <input value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)} />
                </div>
                <div>
                    <label>Target Currency:</label>
                    <input value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)} />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={sourceAmount}
                        onChange={(e) => setSourceAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Quote</button>
            </form>
            {quote && <pre>{JSON.stringify(quote, null, 2)}</pre>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateQuote;
