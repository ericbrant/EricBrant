import React from 'react';

export default function ProfileCard() {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://placekitten.com/100/100"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-purple-300"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">Jane Doe</h2>
          <p className="text-gray-600">Frontend Developer</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">
          Passionate about crafting interactive web experiences and beautiful UI components.
        </p>
      </div>
      <div className="mt-4 flex space-x-3">
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
          Connect
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
          Message
        </button>
      </div>
    </div>
  );
}
