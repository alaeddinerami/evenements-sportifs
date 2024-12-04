import React from 'react';

const ParticipantRow = ({ participant, onEdit, onDelete }) => (
  <tr>
    <td className="px-4 py-2 text-sm">{participant.name}</td>
    <td className="px-4 py-2 text-sm">{participant.email}</td>
    <td className="px-4 py-2 text-sm">{participant.phone}</td>
    <td className="px-4 py-2 text-sm">{participant.genre}</td>
    <td className="px-4 py-2 text-sm">
      <button
        onClick={() => onEdit(participant)}
        className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(participant._id)}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default ParticipantRow;
