import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import googleLogo from './google.png';
import DataContext from "../context/DataContext";
import { useContext } from "react";

function SignInwithGoogle() {
  const {googleLogin} = useContext(DataContext);
 
   
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={googleLogo} width={"60%"} alt="Google Sign-In" />
      </div>
    </div>
  );
}
export default SignInwithGoogle;