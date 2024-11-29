import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import axiosInstance from "../client/axios";

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); 

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/api/events"); 
      setEvents(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, refresh]);

  const createEvent = async (newEvent) => {
    try {
      await axiosInstance.post("/api/events", newEvent); 
      setRefresh((prev) => !prev); 
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(`/api/events/${eventId}`); 
      setRefresh((prev) => !prev); 
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  return { events, loading, error, createEvent, deleteEvent };
};

export default useFetchEvents;
