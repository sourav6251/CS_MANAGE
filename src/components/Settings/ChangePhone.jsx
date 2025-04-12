import React, { useState } from 'react';
import { toast } from 'sonner';

const ChangePhone = () => {
  const [phone, setPhone] = useState('');

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/; // Assumes 10-digit phone numbers
    if (!phoneRegex.test(phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    // Simulate phone number update logic
    toast.success('Phone number updated successfully!');
    setPhone('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4">Change Phone Number</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">New Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={handleChange}
          required
          maxLength={10}
          pattern="[0-9]{10}"
          placeholder="Enter 10-digit phone number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Update Phone Number
      </button>
    </form>
  );
};

export default ChangePhone;
