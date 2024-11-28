// src/components/ParticipantTable.js
import React, { useState } from 'react';

const ParticipantTable = ({ onEdit, onDelete }) => {
  const participants = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Volunteer' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Speaker' },
  ];

  // State for managing the modal visibility and current participant
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(null);

  // Function to open modal with participant data
  const openModal = (participant) => {
    setCurrentParticipant(participant);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentParticipant(null);
  };

  // Handling edit form submission
  const handleSave = () => {
    onEdit(currentParticipant);
    closeModal();
  };

  return (
    <div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">Name</th>
              <th className="px-4 py-2 text-sm font-semibold">Email</th>
              <th className="px-4 py-2 text-sm font-semibold">Role</th>
              <th className="px-4 py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-sm text-gray-500">
                  No participants available.
                </td>
              </tr>
            ) : (
              participants.map((participant) => (
                <tr key={participant.id}>
                  <td className="px-4 py-2 text-sm">{participant.name}</td>
                  <td className="px-4 py-2 text-sm">{participant.email}</td>
                  <td className="px-4 py-2 text-sm">{participant.role}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => openModal(participant)}
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(participant.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Popup for Editing Participant */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Participant</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={currentParticipant?.name || ''}
                onChange={(e) => setCurrentParticipant({ ...currentParticipant, name: e.target.value })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={currentParticipant?.email || ''}
                onChange={(e) => setCurrentParticipant({ ...currentParticipant, email: e.target.value })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700">Role</label>
              <input
                id="role"
                type="text"
                value={currentParticipant?.role || ''}
                onChange={(e) => setCurrentParticipant({ ...currentParticipant, role: e.target.value })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantTable;
