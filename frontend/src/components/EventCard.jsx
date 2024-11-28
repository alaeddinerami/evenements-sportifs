import React, { useState } from 'react';
import image from "../assets/images/event.jpg"
const EventCard = () => {
  // Define static events data
  const [events, setEvents] = useState([
    {
      _id: '64d2b5fdc9a7e8a1e10a0cb2',
      name: 'Updated Event Name',
      description: 'This is the updated description for the event.',
      image: image,
      participants: [
        { _id: '64d2b5fdc9a7e8a1e10a0cb3', name: 'Participant 1' },
        { _id: '64d2b5fdc9a7e8a1e10a0cb4', name: 'Participant 2' },
      ],
      date: '2024-12-01T09:00:00.000Z',
      createdAt: '2024-11-20T09:00:00.000Z',
      updatedAt: '2024-11-27T09:00:00.000Z',
    },
    {
      _id: '64d2b5fdc9a7e8a1e10a0cb5',
      name: 'Another Event',
      description: 'This is another event description.',
      image: image,
      participants: [
        { _id: '64d2b5fdc9a7e8a1e10a0cb6', name: 'Participant 3' },
        { _id: '64d2b5fdc9a7e8a1e10a0cb7', name: 'Participant 4' },
      ],
      date: '2024-12-15T09:00:00.000Z',
      createdAt: '2024-11-22T09:00:00.000Z',
      updatedAt: '2024-11-28T09:00:00.000Z',
    },
  ]);

  // Function to handle edit event
  const handleEditEvent = (id) => {
    console.log('Edit event with id:', id);
  };

  // Function to handle delete event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event._id !== id));
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={event.image || 'default-image.jpg'}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800">{event.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{event.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Date:</strong> {new Date(event.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Participants:</strong>{' '}
                {event.participants.map((participant) => participant.name).join(', ')}
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleEditEvent(event._id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default EventCard;
