import React, { useState } from 'react';
import ParticipantRow from './ParticipantRow';
import Modal from './Modal';
import ParticipantForm from './ParticipantForm';
import useFetchParticipants from '../../hook/useFetchParticipants';

const ParticipantTable = () => {
  const { participants, addParticipant, editParticipant, removeParticipant } = useFetchParticipants();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [filteredParticipants, setFilteredParticipants] = useState(participants);

  const handleEdit = (participant) => {
    setCurrentParticipant(participant);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    removeParticipant(id);
  };

  const handleSave = (participant) => {
    if (participant._id) {
      editParticipant(participant._id, {
        name: participant.name,
        email: participant.email,
        phone: participant.phone,
        genre: participant.genre,
      });
    } else {
      addParticipant(participant);
    }
    setIsModalOpen(false);
  };

  const handleFilter = (genre) => {
    const result = genre ? participants.filter(p => p.genre === genre) : participants;
    setFilteredParticipants(result);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Participants</h2>
        <button
          onClick={() => {
            setCurrentParticipant({ name: '', email: '', phone: '', genre: '' });
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Participant
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <button onClick={() => handleFilter(null)} className="btn">All</button>
        <button onClick={() => handleFilter('admin')} className="btn">Male</button>
        <button onClick={() => handleFilter('client')} className="btn">Female</button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="px-4 py-2 text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-sm font-semibold">Email</th>
            <th className="px-4 py-2 text-sm font-semibold">Phone</th>
            <th className="px-4 py-2 text-sm font-semibold">Genre</th>
            <th className="px-4 py-2 text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(filteredParticipants || participants).map(participant => (
            <ParticipantRow
              key={participant._id}
              participant={participant}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          title={currentParticipant?._id ? 'Edit Participant' : 'Add Participant'}
          onClose={() => setIsModalOpen(false)}
        >
          <ParticipantForm
            participant={currentParticipant}
            onChange={setCurrentParticipant}
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(currentParticipant);
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ParticipantTable;
