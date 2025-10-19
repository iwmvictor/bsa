import React, { useEffect, useState } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import { LuX } from "react-icons/lu";
import { TbEyeCheck } from "react-icons/tb";
import { WiCloudRefresh } from "react-icons/wi";
import { Tooltip } from "react-tooltip";
import { api } from "../api/api";
import toast from "react-hot-toast";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [viewedMessage, setViewedMessage] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const data = await api.getAllMessages();
      setMessages(data);
      toast.success("Your messages");
    } catch (error) {
      toast.error("Failed to fetch messages.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle individual checkbox toggle
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sel) => sel !== id) : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(messages.map((msg) => msg.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = async () => {
    if (selected.length === 0) {
      toast.info("Select at least one message to delete.");
      return;
    }

    try {
      await Promise.all(selected.map((id) => api.deleteMessage(id)));
      toast.success("Message(s) deleted.");
      setSelected([]);
      fetchMessages();
    } catch (error) {
      toast.error("Error deleting message(s).");
    }
  };

  // Handle open/close modal
  const toggleView = (message = null) => {
    setViewedMessage(message);
    setViewModal((prev) => !prev);
  };

  return (
    <>
      <div className="admin-inbox">
        <div className="container">
          <div className="content">
            <div className="title">
              <div>
                <h2>Inbox</h2>
                <p>Your messages</p>
              </div>
              <ul>
                <li className="sort">
                  <select>
                    <option value="old">Oldest</option>
                    <option value="latest" defaultValue>
                      Latest
                    </option>
                  </select>
                </li>
                <li className="refresh" onClick={fetchMessages}>
                  <span>
                    <WiCloudRefresh />
                  </span>
                </li>
              </ul>
            </div>

            <div className="messages-list">
              <div className="tb">
                <div className="th">
                  <div
                    className="select"
                    data-tooltip-id="select"
                    data-tooltip-content="Select All"
                  >
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      id="selectall"
                    />
                    <label htmlFor="selectall"></label>
                  </div>

                  <div
                    className="delete"
                    onClick={handleDelete}
                    data-tooltip-id="delete"
                    data-tooltip-content="Delete Selected"
                  >
                    <span>
                      <CgTrashEmpty />
                    </span>
                  </div>

                  <Tooltip
                    style={{ padding: ".3rem .4rem", fontSize: ".6rem" }}
                    id="select"
                  />
                  <Tooltip
                    style={{ padding: ".3rem .4rem", fontSize: ".6rem" }}
                    id="delete"
                  />
                </div>

                {messages.map((msg) => (
                  <div className="message-data" key={msg.id}>
                    <div className="td" onClick={() => toggleView(msg)}>
                      <div
                        className="select"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(msg.id)}
                          onChange={() => handleSelect(msg.id)}
                          id={msg.id}
                        />
                        <label htmlFor={msg.id}></label>
                      </div>
                      <div className="name">
                        <span>{msg.full_name}</span>
                      </div>
                      <div className="date">
                        <span>{new Date(msg.created_at).toDateString()}</span>
                      </div>
                      <div className="data">
                        <p>{msg.message.slice(0, 100)}...</p>
                      </div>
                    </div>
                  </div>
                ))}

                {messages.length === 0 && (
                  <div className="empty">
                    <p>No messages found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewModal && viewedMessage && (
        <div className="view-message-modal">
          <div className="message-cont">
            <button onClick={toggleView}>
              <span>
                <LuX />
              </span>
            </button>
            <div className="div">
              <span>Names:</span>
              <h3>{viewedMessage.full_name}</h3>
            </div>
            <div className="div">
              <span>Phone:</span>
              <h3>{viewedMessage.phone}</h3>
            </div>
            <div className="div">
              <span>Email:</span>
              <h3>{viewedMessage.email}</h3>
            </div>
            <div className="div msg">
              <span>Message:</span>
              <h3>{viewedMessage.message}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminMessages;
