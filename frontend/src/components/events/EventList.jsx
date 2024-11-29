import React from "react";

const EventList = ({ events, onEditEvent, onDeleteEvent }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <img src={`http://localhost:3000/${event.image}` || "default-image.jpg"} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800">{event.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{event.description}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
              <div className="mt-4 flex space-x-4">
                <button onClick={() => onEditEvent(event._id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Edit</button>
                <button onClick={() => onDeleteEvent(event._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
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

export default EventList;
