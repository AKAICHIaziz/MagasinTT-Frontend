import React, { useEffect, useState, useRef } from 'react';
import styles from './chat.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure you import jwt-decode
import { IoSend } from "react-icons/io5";


function Chat() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // For storing chat messages
  const [newMessage, setNewMessage] = useState(''); // For the message input
  const [selectedUserId, setSelectedUserId] = useState('66cdae05fb525049339a51ec'); // For tracking selected user

  const token = sessionStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const endOfMessagesRef = useRef(null); // Ref for scrolling to the bottom

  // Fetch all users (admin only)
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.log('No token found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3001/api/users/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (err) {
        console.log('Error fetching users:', err);
      }
    };

    if (decodedToken.isAdmin) {
      fetchUsers(); // Only fetch users if the logged-in user is admin
    }
  }, [decodedToken.isAdmin, token]);

  // Set selectedUserId for non-admin users
  useEffect(() => {
    if (!decodedToken.isAdmin && !selectedUserId) {
      setSelectedUserId('66cdae05fb525049339a51ec'); // Set to admin ID
    }
  }, [decodedToken.isAdmin, selectedUserId]);

  // Fetch chat messages between logged-in user and the selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUserId) return; // Don't fetch if no user is selected
      try {
        const response = await axios.get(
          `http://localhost:3001/api/chat/${decodedToken.id}/${selectedUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data); // Set the fetched messages in the state
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedUserId, decodedToken.id, token]);

  // Scroll to the bottom of the chat whenever messages are updated
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send message to backend
  const handleSendMessage = async () => {
    if (!newMessage) return; // Prevent sending empty messages

    try {
      const response = await axios.post('http://localhost:3001/api/chat/send', {
        sender: decodedToken.id,
        receiver: selectedUserId,
        message: newMessage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is sent in headers
        },
      });

      // Add the new message to the chat
      setMessages([...messages, response.data]); // Append the new message
      setNewMessage(''); // Clear input after sending
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized! Redirecting to login.');
        // Handle unauthorized error (e.g., redirect to login)
      } else {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.chat_page}>

        <div className={styles.chat_container}>
          <div className={styles.selected_user}>
            {selectedUserId ? `Chat with ${users.find(user => user._id === selectedUserId)?.username || 'Admin'}` : 'Select a user to chat with'}
          </div>

          <div className={styles.chat}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === decodedToken.id
                    ? styles.sender_message_container
                    : styles.receiver_message_container
                }
              >
                <div
                  className={
                    msg.sender === decodedToken.id
                      ? styles.sender_message
                      : styles.receiver_message
                  }
                >
                  {msg.message}
                </div>
              </div>
            ))}
            {/* This div ensures the chat scrolls to the bottom */}
            <div ref={endOfMessagesRef} />
          </div>

          <div className={styles.bottom}>
            <input
              type="text"
              placeholder='Type your message'
              className={styles.input}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className={styles.button} onClick={handleSendMessage}>
              <IoSend />
              Send
            </button>
          </div>
        </div>

        {decodedToken.isAdmin && (
          <div className={styles.users_list}>
            <div className={styles.title}>Users list</div>
            {users.map((user) => (
              <div
                className={styles.user}
                key={user._id}
                onClick={() => setSelectedUserId(user._id)} // Select user for chat
              >
                {user.username}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;