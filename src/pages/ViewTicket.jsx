import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; 
import GoBackButton from "./GoBackButton";


const ViewTicket = () => {
  const { ticketId } = useParams(); 
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticketRef = doc(db, "tickets", ticketId);
        const ticketSnap = await getDoc(ticketRef);

        if (ticketSnap.exists()) {
          setTicket(ticketSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (!ticket) {
    return <div className="loading">Loading...</div>; 
  }

  return (
    <div className="ticket-container">
      <GoBackButton/>
      <h1>Ticket Details</h1>
      <div className="ticket-field">
        <strong>Title:</strong>
        <p>{ticket.title}</p>
      </div>
      <div className="ticket-field">
        <strong>Description:</strong>
        <p>{ticket.description}</p>
      </div>
      <div className="ticket-field">
        <strong>Priority:</strong>
        <p>{ticket.priority}</p>
      </div>
      <div className="ticket-field">
        <strong>Status:</strong>
        <p>{ticket.status}</p>
      </div>
    </div>
  );
};

export default ViewTicket;