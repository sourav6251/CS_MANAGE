import React, { useState } from 'react';
import { toast } from 'sonner';

const ChangeEmail = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    toast.success('Email updated successfully!');
    setEmail('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4">Change Email</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">New Email</label>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter new email"
        />
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Update Email
      </button>
    </form>
  );
};

export default ChangeEmail;
