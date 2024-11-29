import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../client/axios";

const useFetchParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchParticipants = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/participant");
      console.log(response);
      setParticipants(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch participants.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants, refresh]);

  const addParticipant = async (newParticipant) => {
    try {
      await axiosInstance.post("/participant", newParticipant);
      setRefresh((prev) => !prev); 
    } catch (err) {
      console.error("Failed to add participant:", err);
    }
  };

  const removeParticipant = async (participantId) => {
    try {
      await axiosInstance.delete(`/participant/${participantId}`);
      setRefresh((prev) => !prev); 
    } catch (err) {
      console.error("Failed to remove participant:", err);
    }
  };

  const editParticipant = async (participantId, updatedData) => {
    try {
      await axiosInstance.patch(`/participant/${participantId}`, updatedData);
      setRefresh((prev) => !prev); 
    } catch (err) {
      console.error("Failed to edit participant:", err);
    }
  };

  return {
    participants,
    loading,
    error,
    addParticipant,
    removeParticipant,
    editParticipant, 
  };
};

export default useFetchParticipants;
