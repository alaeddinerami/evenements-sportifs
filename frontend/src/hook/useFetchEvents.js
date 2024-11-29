import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../client/axios";

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [participantsList, setParticipantsList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const eventsResponse = await axiosInstance.get("/event");
      setEvents(eventsResponse.data);

      const participantsResponse = await axiosInstance.get("/participant");
      setParticipantsList(participantsResponse.data);
    } catch (err) {
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, refresh]);

  const createEvent = async (newEvent) => {


    try {
      await axiosInstance.post("/event", newEvent);  
      setRefresh((prev) => !prev);  
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  };
  
  const updateEvent = async (eventId, updatedEventData) => {
    try {
      console.log(updatedEventData._id);
      await axiosInstance.patch(`/event/${eventId}`, updatedEventData);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };
  const deleteEvent = async (eventId) => {
    try {
      console.log(eventId);
      
      await axiosInstance.delete(`/event/${eventId}`);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  return { events, participantsList, loading, error, createEvent, updateEvent, deleteEvent };
};

export default useFetchEvents;
