import userEvent from "@testing-library/user-event";
import React, { useEffect, useRef } from "react";
import InComeBox from "../../components/boxes/InComeBox";
import SentBox from "../../components/boxes/SentBox";
import { auth } from "../../firebase/firebase.config";
import Logo from "../../pages/accountStack/login/svg/logo.svg";
import MiniLogo from "../../components/livechat/svg/miniLogo.svg";

function MessageRequest({ message }) {

  const isMe = (item) => {
    return item.from === auth.currentUser.uid;
  };

  const scrollRef = useRef();
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={isMe(message) ? "isent" : "incoming"} ref={scrollRef}>
      {isMe(message) ? (
        <div className="irequested">
          <div className="message-header">
            <div className="left">
              <img src={auth.currentUser.photoURL} alt="" />
              <span>{auth.currentUser.displayName}</span>
            </div>
            <div className="right">
              Tarih / Saat:{" "}
              {new Date(message.createdAt.seconds * 1000).toLocaleString()}
            </div>
          </div>
          <hr id="divider" />
          {message.media ? (
            <img
              className={`image ${isMe(message) ? "fromme" : "fromadmin"}`}
              src={message.media}
              alt=""
            />
          ) : null}
          <p>{message.text}</p>
          <br />
        </div>
      ) : (
        <div className="theyAnswered">
          <div className="message-header admin">
            <div className="left">
              <img src={MiniLogo} alt="" />
              <p>Online Keşif</p>
            </div>
            <div className="right">
              Tarih / Saat:{" "}
              {new Date(message.createdAt.seconds * 1000).toLocaleString()}
            </div>
          </div>
          <hr />
          {message.media ? (
            <a href={message.media} target="_blank">
              <img
                className={`image ${isMe(message) ? "fromme" : "fromadmin"}`}
                src={message.media}
                alt=""
              />
            </a>
          ) : null}
          <p>{message.text}</p>
          <br />
        </div>
      )}
    </div>
  );
}

export default MessageRequest;
