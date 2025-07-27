import React, { useState } from 'react';
import { useAuthStore } from '../store/UserAuthStore';
import { MessageSquare, User } from 'lucide-react';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const { signup, isSignning } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className='max-h-screen grid lg:grid-cols-2'>
      {/* Left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-md'>
          {/* LOGO */}
          <div className="text-center m-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* ✅ FORM starts here */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input with icon */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Rest of your form remains the same */}
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full mt-2"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full mt-2"
                placeholder="Enter a secure password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div className="mt-2">
                <label className="cursor-pointer label">
                  <span className="label-text">Show Password</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex items-center justify-center bg-base-200">
        <p className="text-xl font-semibold text-base-content/60">
          Welcome to the community 🚀
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;