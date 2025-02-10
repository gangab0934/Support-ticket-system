import React from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
 

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page in the browser's history stack
  };

  return (
    <button onClick={handleGoBack} className="go-back-btn">
      <MdKeyboardBackspace size={30} /> 
    </button>
  );
};

export default GoBackButton;