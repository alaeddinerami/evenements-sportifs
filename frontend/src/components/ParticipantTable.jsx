import React, { useState } from 'react';

const ParticipantTable = ({ onEdit, onDelete }) => {
  const initialParticipants = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: 'Volunteer' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: 'Speaker' },
  ];

  const [participants, setParticipants] = useState(initialParticipants);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const openEditModal = (participant) => {
    setCurrentParticipant(participant);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentParticipant(null);
  };

  const handleSaveEdit = () => {
    onEdit(currentParticipant);
    closeEditModal();
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewParticipant({ name: '', email: '', phone: '' });
  };

  const handleCreateParticipant = () => {
    setParticipants([...participants, { ...newParticipant, id: Date.now() }]);
    closeCreateModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Participants</h2>
        <button
          onClick={openCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Participant
        </button>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">Name</th>
              <th className="px-4 py-2 text-sm font-semibold">Email</th>
              <th className="px-4 py-2 text-sm font-semibold">phone</th>
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
                  <td className="px-4 py-2 text-sm">{participant.phone}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => openEditModal(participant)}
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

      {isEditModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-md w-1/3">
      <h2 className="text-xl font-semibold mb-4">Edit Participant</h2>
      <div className="mb-4">
        <label htmlFor="edit-name" className="block text-sm font-semibold text-gray-700">Name</label>
        <input
          id="edit-name"
          type="text"
          value={currentParticipant?.name || ''}
          onChange={(e) =>
            setCurrentParticipant({ ...currentParticipant, name: e.target.value })
          }
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="edit-email" className="block text-sm font-semibold text-gray-700">Email</label>
        <input
          id="edit-email"
          type="email"
          value={currentParticipant?.email || ''}
          onChange={(e) =>
            setCurrentParticipant({ ...currentParticipant, email: e.target.value })
          }
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="edit-phone" className="block text-sm font-semibold text-gray-700">phone</label>
        <input
          id="edit-phone"
          type="text"
          value={currentParticipant?.phone || ''}
          onChange={(e) =>
            setCurrentParticipant({ ...currentParticipant, phone: e.target.value })
          }
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={closeEditModal}
          className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEdit}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Create Participant</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={newParticipant.name}
                onChange={(e) =>
                  setNewParticipant({ ...newParticipant, name: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={newParticipant.email}
                onChange={(e) =>
                  setNewParticipant({ ...newParticipant, email: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">phone</label>
              <input
                id="phone"
                type="text"
                value={newParticipant.phone}
                onChange={(e) =>
                  setNewParticipant({ ...newParticipant, phone: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeCreateModal}
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateParticipant}
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantTable;
