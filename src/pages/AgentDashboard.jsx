import React, { useContext } from "react";
import { Table, Button, Space, Select, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import DataContext from "../context/DataContext";
import { db, doc, updateDoc } from "../firebase";
import GoBackButton from "./GoBackButton";

const { Option } = Select;

const AgentDashboard = () => {
  const { tickets, setTickets } = useContext(DataContext);
  <GoBackButton/>

  // Function to update ticket status
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await updateDoc(doc(db, "tickets", ticketId), { status: newStatus });
      setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
      message.success("Ticket status updated!");
    } catch (error) {
      message.error("Failed to update status.");
    }
  };

  // Function to assign tickets to agents
  const handleAssign = async (ticketId, agentEmail) => {
    try {
      await updateDoc(doc(db, "tickets", ticketId), { assignedTo: agentEmail });
      setTickets(tickets.map(t => t.id === ticketId ? { ...t, assignedTo: agentEmail } : t));
      message.success("Ticket assigned successfully!");
    } catch (error) {
      message.error("Failed to assign ticket.");
    }
  };

  const columns = [
    { title: "Ticket ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Priority", dataIndex: "priority", key: "priority" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (_, record) => (
        <Select defaultValue={record.assignedTo} onChange={(value) => handleAssign(record.id, value)} style={{ width: 120 }}>
          <Option value="agent1@support.com">Agent 1</Option>
          <Option value="agent2@support.com">Agent 2</Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Select defaultValue={record.status} onChange={(value) => handleStatusChange(record.id, value)}>
            <Option value="Open">Open</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Resolved">Resolved</Option>
          </Select>
          <Button icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Support Agent Dashboard</h2>
      <Table columns={columns} dataSource={tickets} rowKey="id" />
    </div>
  );
};

export default AgentDashboard;