import React, { useState } from "react";
import EventList from "./EventList";
import EventFormModal from "./EventFormModal";
import useFetchEvents from "../../hook/useFetchEvents";
import EventDetailModal from "./EventDetailModal";

const EventCard = () => {
  const {
    events,
    participantsList,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useFetchEvents();
  const [showModal, setShowModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState(null);

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

    const participants = formData.getAll("participants");
    const formattedParticipants = participants.length > 0 ? participants : [];

    formData.delete("participants");
    formattedParticipants.forEach((participant) => {
      formData.append("participants[]", participant);
    });

    if (eventToEdit) {
      const updatedData = {
        name: formData.get("name"),
        description: formData.get("description"),
        location: formData.get("location"),
        date: formData.get("date"),
        participants: formattedParticipants,
      };

      updateEvent(eventToEdit._id, updatedData);
    } else {
      createEvent(formData);
    }

    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button
        onClick={handleCreateEvent}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Create Event
      </button>

      <EventList
        events={events}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        onViewEvent={(event) => setSelectedEvent(event)}
      />

      {showModal && (
        <EventFormModal
          event={eventToEdit}
          participantsList={participantsList}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
         {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default EventCard;
