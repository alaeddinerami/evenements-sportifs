import React from "react";
import useFetchParticipants from "../../hook/useFetchParticipants";

const EventFormModal = ({ event, participantsList, onSubmit, onClose }) => {
  const { participants } = useFetchParticipants();

  const isEditing = !!event;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Event" : "Create a New Event"}
        </h3>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={isEditing ? event.name : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={isEditing ? event.description : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={isEditing ? event.location : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Participants */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Participants
            </label>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`participant-${participant._id}`}
                    name="participants"
                    value={participant._id}
                    defaultChecked={
                      isEditing && event.participants?.includes(participant._id)
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`participant-${participant._id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {participant.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              defaultValue={
                isEditing ? new Date(event.date).toISOString().slice(0, 16) : ""
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className={`px-4 py-2 ${
                isEditing ? "bg-yellow-500" : "bg-green-500"
              } text-white rounded-md hover:${
                isEditing ? "bg-yellow-600" : "bg-green-600"
              }`}
            >
              {isEditing ? "Save Changes" : "Create Event"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
