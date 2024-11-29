import React from 'react';

const ParticipantForm = ({ participant, onChange, onSubmit, onCancel }) => (
  <form onSubmit={onSubmit}>
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">Name</label>
      <input
        type="text"
        value={participant.name}
        onChange={(e) => onChange({ ...participant, name: e.target.value })}
        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">Email</label>
      <input
        type="email"
        value={participant.email}
        onChange={(e) => onChange({ ...participant, email: e.target.value })}
        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">Phone</label>
      <input
        type="text"
        value={participant.phone}
        onChange={(e) => onChange({ ...participant, phone: e.target.value })}
        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
      >
        Cancel
      </button>
      <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded">
        Save
      </button>
    </div>
  </form>
);

export default ParticipantForm;
