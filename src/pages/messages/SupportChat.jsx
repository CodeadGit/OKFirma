import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { auth, db, storage } from "../../firebase/firebase.config";
import CloseIcon from "@mui/icons-material/Close";
import Attach from "../../components/livechat/svg/attachment.svg";
import MessageRequest from "./MessageRequest";
import { useNavigate } from "react-router-dom";

function SupportChat({ item }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `requests/${new Date().getTime() + img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlurl;
    }

    await updateDoc(doc(db, "FirmRequests", item.doc), {
      content: arrayUnion({
        createdAt: new Date(),
        from: auth.currentUser.uid,
        media: url || "",
        text: text,
      }),
    })
      .then(() => setText(""))
      .then(() => setImg(""))
      .then(() => navigate("/mesajlarim/Destek-Talebi"));
  };
  return (
    <div className="chatcontainer">
      <div className="chat-center messages">
        {item.content.length
          ? item.content.map((i, index) => {
              return (
                <MessageRequest message={i} key={index} />
                // <div className={isMe(i)?"isent":"incoming"}>
                //   {isMe(i)?<SentBox key={index}>{i.text}</SentBox>:<InComeBox key={index}>{i.text}</InComeBox>}
                //   <span>{timeCalc(i.time)}</span>
                // </div>
              );
            })
          : null}
      </div>
      <div className="chat-bottom">
        <form onSubmit={handleSubmit}>
          {img ? (
            <div className="img-box">
              <small>{img.name}</small>
              <CloseIcon onClick={() => setImg("")} className="icon" />
            </div>
          ) : null}
          <input
            className="chat-input"
            placeholder="mesajınızı yazın.."
            value={text}
            type="text"
            autoFocus
            onChange={(e) => setText(e.target.value)}
          />
          <div className="addFile">
            <label htmlFor="img">
              <img src={Attach} alt="" />
            </label>
            <input
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
              type="file"
              id="img"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <button
            disabled={!text && !img ? true : false}
            className={`send-chat ${text || img ? `ready` : `empty`}`}
            type="submit"
          >
            GÖNDER
          </button>
        </form>
      </div>
    </div>
  );
}

export default SupportChat;
