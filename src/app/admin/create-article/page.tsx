'use client'
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        image: null as File | null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Kiểm tra kích thước file (ví dụ: giới hạn 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size should be less than 5MB');
                return;
            }

            // Kiểm tra loại file
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }

            setFormData(prev => ({
                ...prev,
                image: file
            }));

            // Tạo preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Not authenticated');
            }

            // Tạo FormData để gửi file
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('category', formData.category);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create post');
            }

            setSuccess('Post created successfully!');
            setFormData({
                title: '',
                description: '',
                content: '',
                category: '',
                image: null
            });

            setImagePreview('');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-3">
            <h1 className="text-2xl font-bold mb-3">Create New Post</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-50 text-green-600 rounded">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            <option value="">Select category</option>
                            <option value="Sức khỏe">Sức khỏe</option>
                            <option value="Đời sống">Đời sống</option>
                            <option value="Thể thao">Thể thao</option>

                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image
                        </label>
                        <div className="mt-1 flex flex-col items-center">
                            {imagePreview && (
                                <div className="mb-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded"
                                    />
                                </div>
                            )}
                            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-400 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-teal-400">
                                <Upload className="h-8 w-8 mb-2" />
                                <span className="text-sm">Click to upload image</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">
                                PNG, JPG up to 5MB
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-teal-400 text-white py-3 px-4 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                            <>
                                <Upload className="animate-spin h-5 w-5" />
                                <span>Publishing...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="h-5 w-5" />
                                <span>Publish Post</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;