import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import GoBackButton from "./GoBackButton";

const EditTicket = () => {
  const { ticketId } = useParams(); // Get ticketId from URL
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [newTicketData, setNewTicketData] = useState({
    title: "",
    description: "",
    priority: "",
    status: ""
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticketRef = doc(db, "tickets", ticketId);
        const ticketSnap = await getDoc(ticketRef);

        if (ticketSnap.exists()) {
          setTicket(ticketSnap.data());
          setNewTicketData(ticketSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicketData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, newTicketData); // Update the ticket in Firestore
      navigate(`/dashboard`); // Navigate to view page after edit
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    
    <div>
      <GoBackButton/>
      <h1>Edit Ticket</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newTicketData.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={newTicketData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Priority:
          <input
            type="text"
            name="priority"
            value={newTicketData.priority}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={newTicketData.status}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTicket;