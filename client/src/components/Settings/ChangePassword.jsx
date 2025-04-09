import React, { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const toggleVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    toast.success("Password changed successfully.");
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 pr-10";

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative"
    >
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      {/* Current Password */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium mb-1">Current Password</label>
        <input
          type={showPassword.current ? 'text' : 'password'}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className={inputClasses}
          required
        />
        <span
          onClick={() => toggleVisibility('current')}
          className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
        >
          {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      {/* New Password */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type={showPassword.new ? 'text' : 'password'}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className={inputClasses}
          required
        />
        <span
          onClick={() => toggleVisibility('new')}
          className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
        >
          {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="mb-6 relative">
        <label className="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          type={showPassword.confirm ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={inputClasses}
          required
        />
        <span
          onClick={() => toggleVisibility('confirm')}
          className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
        >
          {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Update Password
      </button>
    </form>
  );
};

export default ChangePassword;
