import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Adjust import based on your setup

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.signOut().then(() => {
      navigate("/"); // Redirect to login after logout
    });
  }, []);

  return <h3>Logging out...</h3>;
}

export default Logout;
