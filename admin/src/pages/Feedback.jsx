import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Feedback = ({ token }) => {
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/feedback', {
                headers: { token }
            });
            if (response.data.success) {
                setFeedbacks(response.data.data.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred while fetching feedback.');
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchFeedbacks();
        }
    }, [token]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Feedbacks</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Message</th>
                            <th className="py-2 px-4 border-b">Rating</th>
                            <th className="py-2 px-4 border-b">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.id}>
                                <td className="py-2 px-4 border-b">{feedback.name}</td>
                                <td className="py-2 px-4 border-b">{feedback.email}</td>
                                <td className="py-2 px-4 border-b">{feedback.message}</td>
                                <td className="py-2 px-4 border-b">{feedback.rating}</td>
                                <td className="py-2 px-4 border-b">{new Date(feedback.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Feedback;