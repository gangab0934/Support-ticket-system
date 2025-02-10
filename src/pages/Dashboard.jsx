import React, { useState, useContext } from 'react';
import { Button, Modal, Form, Input, Select, Table, Space, message } from 'antd';
import DataContext from '../context/DataContext';
import GoBackButton from './GoBackButton';



const { Option } = Select;

const Dashboard = () => {
  const {tickets,setTickets,isModalVisible,setIsModalVisible,newTicket, setNewTicket , 
    handleEditTicket,handleDeleteTicket,showModal,handleCancel,
    handleInputChange,handleCreateTicket,columns,userRole,user,role,loading} = useContext(DataContext); 

   

  return (
    <div>
      <GoBackButton/>
      <Button type="primary" onClick={showModal}>
        Raise Ticket
      </Button>

      <Table columns={columns} dataSource={tickets} rowKey="id" />

      <Modal title="Raise Ticket" open={isModalVisible} onCancel={handleCancel} onOk={handleCreateTicket}>
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input name="title" value={newTicket.title} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea name="description" value={newTicket.description} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Priority">
            <Select name="priority" value={newTicket.priority} onChange={value => setNewTicket({ ...newTicket, priority: value })}>
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category">
            <Input name="category" value={newTicket.category} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Contact Email">
            <Input name="contact" value={newTicket.contact} onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;