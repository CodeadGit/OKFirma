import React, { useRef, useEffect } from "react";
import { auth } from "../../firebase/firebase.config";
import InComeBox from "../boxes/InComeBox";
import SentBox from "../boxes/SentBox";
import Moment from "react-moment";

function Message({ message }) {
  const isMe = (item) => {
    return item.from === auth.currentUser.uid;
  };
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div className={isMe(message) ? "isent" : "incoming"} ref={scrollRef}>
      {message.active ? (
        <>
          {isMe(message) ? (
            <SentBox>
              {message.media ? (
                <img
                  className={`image ${isMe(message) ? "fromme" : "fromadmin"}`}
                  src={message.media}
                  alt=""
                />
              ) : null}
              <p>{message.text}</p>
              <br />
              <small>
                <Moment fromNow>{message.createdAt.toDate()}</Moment>
              </small>
            </SentBox>
          ) : (
            <InComeBox>
              {message.media ? (
                <a href={message.media} target="_blank">
                  <img
                    className={`image ${
                      isMe(message) ? "fromme" : "fromadmin"
                    }`}
                    src={message.media}
                    alt=""
                  />
                </a>
              ) : null}
              <p>{message.text}</p>
              <br />
              <small>
                <Moment fromNow>{message.createdAt.toDate()}</Moment>
              </small>
            </InComeBox>
          )}
        </>
      ) : (
        <div className="end-of-conv">
          görüşme sona erdi
          <small>
            {new Date(message.createdAt.seconds * 1000).toLocaleString()}
          </small>
        </div>
      )}
    </div>
  );
}

export default Message;
