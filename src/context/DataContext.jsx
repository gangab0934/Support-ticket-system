import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc } from "firebase/firestore";
import { Button, Modal, Form, Input, Select, Table, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import UseWindowSize from "../Hooks/UseWindowSize";


const DataContext = createContext();

export const Dataprovider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const {width}=UseWindowSize();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (email === 'agent@support.com' && password === 'agent123') {
            toast.success('Agent logged in successfully!');
            navigate('/agent-dashboard'); 
        } else {
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        }
        } catch (error) {
        toast.error(error.message);
        }
    };

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
          const user = result.user;
          if (user) {
            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              firstName: user.displayName,
              photo: user.photoURL,
              lastName: "",
            });
            toast.success("User logged in Successfully", {
              position: "top-center",
            });
            navigate("/dashboard");
          }
        });
      };


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          if (user) {
            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              firstName: fname,
              lastName: lname,
              photo: "",
            });
          }
          toast.success("User Registered Successfully!", {
            position: "top-center",
          });
          navigate("/dashboard");
          setEmail("");
          setPassword("");
          setFname("");
          setLname("");
        } catch (error) {
          toast.error(error.message, {
            position: "bottom-center",
          });
        }
      };

      // Firebase Authentication 
      useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false); 
        });
      
        return () => unsubscribe();
      }, []);
      

  //dashboard
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: '', category: '', contact: '' });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tickets')); // Use modular approach
        setTickets(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        message.error('Failed to fetch tickets');
      }
    };
    fetchTickets();
  }, []);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleInputChange = (e) => setNewTicket({ ...newTicket, [e.target.name]: e.target.value });


  const handleCreateTicket = async () => {
    try {
      await addDoc(collection(db, 'tickets'), newTicket); 
      message.success('Ticket created successfully');
      setNewTicket({ title: '', description: '', priority: '', category: '', contact: '' });
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to create ticket');
    }
  };

  const deleteTicket = async (ticketId) => {
    try{
      await deleteDoc(doc(db, "tickets", ticketId));
      setTickets(tickets.filter(ticket => ticket.id !== ticketId)); 
      message.success('Ticket deleted successfully');
    } catch (error) {
      message.error('Failed to delete ticket');
    }
  };
  

  
  const handleViewTicket = (ticketId) => {
    navigate(`/ticket/${ticketId}`); 
  };
  
  const handleEditTicket = (ticketId) => {
    navigate(`/edit-ticket/${ticketId}`); 
  };
  

  const columns = [
    { title: 'Ticket ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Created By', dataIndex: 'createdBy', key: 'createdBy' },
    { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handleViewTicket(record.id)} />
          <Button icon={<EditOutlined />} onClick={() => handleEditTicket(record.id)} />
          <Button icon={<DeleteOutlined />} onClick={() => deleteTicket(record.id)} />
        </Space>
      ),
    },
  ];
    

    return (
        <DataContext.Provider value = {{ email, setEmail,password, setPassword, navigate,handleSubmit,
            googleLogin,handleRegister,setFname,setLname,tickets,width,
            setTickets,loading, setLoading,
            isModalVisible,setIsModalVisible,newTicket,
            setNewTicket,handleViewTicket, handleEditTicket,showModal,handleCancel,columns,
            handleInputChange,handleCreateTicket,userRole, setUserRole,
            
          }}>
              {children}
        </DataContext.Provider>
    )
}
 export default DataContext;
