import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chat1.css";
// import HamburgerMenu from "./HamburgerMenu";

export default function Chat1() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [botMsgs, setBotMsgs] = useState([]);
  const msgBodyRef = useRef(null);

  useEffect(() => {
    if (msgBodyRef.current) {
      msgBodyRef.current.scrollTop = msgBodyRef.current.scrollHeight;
    }
  }, [msgs]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!msg.trim()) return;

    setMsgs((prevMsgs) => [...prevMsgs, msg]);
    setMsg("");
    try {
      const response = await axios.post(
        "https://ai-backend-x3fl.onrender.com/msg",
        {
          message: msg,
        }
      );

      const botReply = response.data.reply;

      setBotMsgs((prevBotMsgs) => [...prevBotMsgs, botReply]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const [flagforHam, setFlagforHam] = useState(true);
  const HandleHam = () => {
    setFlagforHam(!flagforHam);
  };
  return (
    <div>
      <div className="main">
        {flagforHam && (
          <div className="navbar">
            <div className="child-navbar">
              <div className="ais">Text-Text</div>
              <div className="ais">Text,Image-Text</div>
              <div className="ais">Text-Image</div>
              <div className="ais">Image-Image</div>
            </div>
          </div>
        )}
        <div className="child-main">
          <div className="ham1" onClick={HandleHam}>
            ☰
          </div>
          <div className="box">
            <h3>AI-Chat</h3>
            <div className="ul" ref={msgBodyRef}>
              {msgs.map((message, index) => (
                <div className="parent-msg" key={index}>
                  <div className="user-msg msg">
                    <p className="user-p">{message}</p>
                  </div>
                  <div className="bot-msg msg">
                    <p>{botMsgs[index]}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={HandleSubmit}>
              <input
                className="child-form"
                type="text"
                placeholder="Ask anything"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
              <button className="child-form btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
