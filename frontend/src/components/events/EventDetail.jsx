import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../client/axios";
// import axiosInstance from "../client/axios";

const EventDetail = () => {
  const { id } = useParams(); // Extract event ID from the URL parameters
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/event/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
      <p className="mb-2">
        <strong>Description:</strong> {event.description}
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {event.location}
      </p>
      <p className="mb-2">
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="mb-4">
        <strong>Participants:</strong>{" "}
        {event.participants && event.participants.length > 0 ? (
          <ul className="list-disc list-inside">
            {event.participants.map((participant) => (
              <li key={participant._id}>{participant.name}</li>
            ))}
          </ul>
        ) : (
          "No participants"
        )}
      </p>
      {event.image && (
        <div className="mb-4">
          <img
            src={event.image}
            alt={event.name}
            className="w-full rounded-md"
          />
        </div>
      )}
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        Back
      </button>
    </div>
  );
};

export default EventDetail;
