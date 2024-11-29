import React, { useState } from "react";
import EventList from "./EventList";
import EventFormModal from "./EventFormModal";
import useFetchEvents from "../../hook/useFetchEvents";

const EventCard = () => {
  const { events, participantsList, loading, error, createEvent, deleteEvent } = useFetchEvents();
  const [showModal, setShowModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleEditEvent = (id) => {
    const event = events.find((e) => e._id === id);
    setEventToEdit(event);
    setShowModal(true);
  };

  const handleCreateEvent = () => {
    setEventToEdit(null);
    setShowModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newEvent = {
      name: formData.get("name"),
      description: console.log(formData.get("description")),
      
      location: formData.get("location"),
      date: formData.get("date"),
      participants: formData.getAll("participants"), 
      image: formData.get("image"), 
    };

    createEvent(formData);
    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={handleCreateEvent} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Create Event
      </button>

      <EventList events={events} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} />

      {showModal && (
        <EventFormModal
          event={eventToEdit}
          participantsList={participantsList}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EventCard;
