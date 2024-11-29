import React, { useState, useEffect } from 'react';
import ParticipantRow from './ParticipantRow';
import Modal from './Modal';
import ParticipantForm from './ParticipantForm';
import useFetchParticipants from '../../hook/useFetchParticipants';

const ParticipantTable = () => {
  const { participants, loading, error, addParticipant, editParticipant, removeParticipant } = useFetchParticipants();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(null);

  const handleEdit = (participant) => {
      console.log(participant)
    setCurrentParticipant(participant);
    setIsModalOpen(true); 
  };

  const handleDelete = (id) => {
    removeParticipant(id);
  };

  const handleSave = (participant) => {
    if (participant._id) {

      const updatedData = {
        name: participant.name, email: participant.email, phone: participant.phone
      }
      editParticipant(participant._id, updatedData);
    } else {
      addParticipant(participant);
    }

    setIsModalOpen(false); 
  };
    
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Participants</h2>
        <button
          onClick={() => {
            setCurrentParticipant({ name: '', email: '', phone: '' }); 
            setIsModalOpen(true); 
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Participant
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="px-4 py-2 text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-sm font-semibold">Email</th>
            <th className="px-4 py-2 text-sm font-semibold">Phone</th>
            <th className="px-4 py-2 text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
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
          title={currentParticipant?.id ? 'Edit Participant' : 'Add Participant'}
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
