import React, { useState } from "react";
import image from "../assets/images/event.jpg";
import useFetchEvents from "../hook/useFetchEvents";

const EventCard = () => {
  const { events :eventsFetched, loading, error, createEvent, deleteEvent } = useFetchEvents();

  const [events, setEvents] = useState([
    {
      _id: "64d2b5fdc9a7e8a1e10a0cb2",
      name: "Updated Event Name",
      description: "This is the updated description for the event.",
      image: image,
      participants: [
        { _id: "64d2b5fdc9a7e8a1e10a0cb3", name: "Participant 1" },
        { _id: "64d2b5fdc9a7e8a1e10a0cb4", name: "Participant 2" },
      ],
      date: "2024-12-01T09:00:00.000Z",
    },
    {
      _id: "64d2b5fdc9a7e8a1e10a0cb5",
      name: "Another Event",
      description: "This is another event description.",
      image: image,
      participants: [
        { _id: "64d2b5fdc9a7e8a1e10a0cb6", name: "Participant 3" },
        { _id: "64d2b5fdc9a7e8a1e10a0cb7", name: "Participant 4" },
      ],
      date: "2024-12-15T09:00:00.000Z",
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [editEventData, setEditEventData] = useState(null);

  const handleEditEvent = (id) => {
    const event = events.find((e) => e._id === id);
    setEditEventData(event);
    setShowEditModal(true);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event._id !== eventToDelete));
    setShowDeleteModal(false);
  };

  const openDeleteModal = (id) => {
    setEventToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      _id: Date.now().toString(),
      name: e.target.name.value,
      description: e.target.description.value,
      image: image,
      participants: [],
      date: e.target.date.value,
    };
    setEvents([...events, newEvent]);
    setShowCreateModal(false);
  };

  const handleEditEventSave = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...editEventData,
      name: e.target.name.value,
      description: e.target.description.value,
      date: e.target.date.value,
    };
    setEvents(
      events.map((event) =>
        event._id === editEventData._id ? updatedEvent : event
      )
    );
    setShowEditModal(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Create Event
      </button>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={event.image || "default-image.jpg"}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800">
                  {event.name}
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  {event.description}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                </p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleEditEvent(event._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(event._id)}
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

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold">
              Are you sure you want to delete this event?
            </h3>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Create a New Event</h3>
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Event</h3>
            <form onSubmit={handleEditEventSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editEventData?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editEventData?.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  defaultValue={new Date(editEventData?.date)
                    .toISOString()
                    .slice(0, 16)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
