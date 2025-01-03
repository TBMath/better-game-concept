'use client'
import React, { useState } from 'react';

const CreateQuestion = () => {
    const [formdata, setFormdata] = useState({ index: 0, question_id: '', answer: '', l1: '', l2: '', l3: '', l4: '', l5: '', l6: '', l7: '', l8: '', hint1: '', hint2: '', hint3: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formdata);
            const response = await fetch('/api/questions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            });
            const result = await response.json();
            if (response.ok) {
                // Handle successful response
                console.log('Form submitted successfully', result);
                alert('Form submitted successfully');
                setFormdata({ index: 0, question_id: '', answer: '', l1: '', l2: '', l3: '', l4: '', l5: '', l6: '', l7: '', l8: '', hint1: '', hint2: '', hint3: '' });
            } else {
                // Handle error response
                console.error('Form submission failed', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
       <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Create Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Index:</label>
                        <input
                            type="number"
                            value={formdata.index}
                            onChange={(e) => setFormdata({...formdata, index: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Question ID:</label>
                        <input
                            type="text"
                            value={formdata.question_id}
                            onChange={(e) => setFormdata({...formdata, question_id: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Answer:</label>
                        <input
                            type="text"
                            value={formdata.answer}
                            onChange={(e) => setFormdata({...formdata, answer: e.target.value})}
                            maxLength={3}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="mb-4">
                            <label className="block text-gray-700">Option {i + 1}:</label>
                            <input
                                type="text"
                                value={formdata[`l${i + 1}`]}
                                onChange={(e) => setFormdata({...formdata, [`l${i + 1}`]: e.target.value})}
                                required
                                maxLength={1}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block text-gray-700">Hint 1:</label>
                        <input
                            type="text"
                            value={formdata.hint1}
                            onChange={(e) => setFormdata({...formdata, hint1: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Hint 2:</label>
                        <input
                            type="text"
                            value={formdata.hint2}
                            onChange={(e) => setFormdata({...formdata, hint2: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Hint 3:</label>
                        <input
                            type="text"
                            value={formdata.hint3}
                            onChange={(e) => setFormdata({...formdata, hint3: e.target.value})}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Submit
                    </button>
                </form>
            </div>
        </div>
       </>
    );
};

export default CreateQuestion;
