import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Feedback = () => {
    const { backendUrl } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [rating, setRating] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message || rating === 0) {
            toast.error('Please fill in all fields and provide a rating');
            return;
        }

        try {
            const response = await axios.post(backendUrl + '/api/feedback', { ...formData, rating }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                toast.success('Feedback submitted successfully!');
                setFormData({ name: '', email: '', message: '' });
                setRating(0);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred while submitting feedback.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Give Us Your Feedback</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <button
                                    type="button"
                                    key={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    className={`text-3xl ${ratingValue <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    &#9733;
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit Feedback
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Feedback;