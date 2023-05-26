import { AttachFile, CloseOutlined } from "@mui/icons-material";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { auth, db, storage } from "../../firebase/firebase.config";
import RequestCases from "./RequestCases";
import { useNavigate } from "react-router-dom";

function NewSupport({ setAlert, setError }) {
  const [file, setFile] = useState("");
  const [selected, setSelected] = useState("seçmedi");
  const [request, setRequest] = useState("");
  const [priority, setPriority] = useState("");
  const [uploading, setUploading] = useState(false);

  let navigate = useNavigate();

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setRequest({ ...request, [name]: value });
  };
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const user = auth.currentUser.uid;

    const docRef = collection(db, "FirmRequests");
    let url;
    if (file) {
      const imgRef = ref(
        storage,
        `requests/${new Date().getTime() + file.name}`
      );
      const snap = await uploadBytes(imgRef, file);
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath)).catch(
        (e) => {
          setError(e.message);
          setUploading(false);
        }
      );
      url = dlurl;
    }
    await addDoc(docRef, {
      id: new Date().valueOf().toString().substring(5),
      createdAt: new Date(),
      statue: 0,
      lastResponse: user,
      unread: true,
      subject: selected,
      priority: priority,
      content: [
        {
          text: request.text,
          createdAt: Timestamp.fromDate(new Date()),
          media: url || "",
          from: user,
        },
      ],
      summary: request.summary,
      from: auth.currentUser.uid,
      fromName: auth.currentUser?.displayName,
      doc: "",
    })
      .then((result) =>
        updateDoc(doc(db, "FirmRequests", result.id), {
          doc: result.id,
        })
      )
      .then(() => setUploading(false))
      .then(() =>
        setAlert(
          "Talebinizi aldık, 'Destek Talebi' sekmesinden ilgili talebinizi takip edebilirsiniz."
        )
      )
      .then(() => {
        setRequest("");
        setFile("");
      })
      .finally(() => navigate("/mesajlarim/Destek-Talebi"))
      .catch((e) => {
        setUploading(false);
        setError(e.message);
      });
  };
  const caseList = [
    "Kombi",
    "Klima",
    "Kazan",
    "Doğalgaz Tesisat",
    "Doğalgaz Projesi",
    "Fatura",
    "Hesap",
    "Genel",
  ];
  const priorityList = ["Normal", "Orta", "Acil"];

  return (
    <div className="newSupportArea">
      <div className="header">
        <div className="header-left">Yeni Talep Oluştur</div>
        <div className="header-right">
          <small>{new Date().toLocaleString()}</small>
        </div>
      </div>
      {uploading ? (
        <Loading title="talebiniz gönderiliyor" />
      ) : (
        <form
          onSubmit={handleSubmit}
          id="create-request-form"
          className="request-form"
        >
          <RequestCases
            selected={selected}
            setSelected={setSelected}
            cases={caseList}
          />
          <input
            required
            onChange={handleInputChange}
            name="summary"
            placeholder="Konu : Lütfen mesajınızı bir kaç cümle ile özetleyin "
            className="support-summary"
          />
          <textarea
            required
            onChange={handleInputChange}
            name="text"
            className="support-text"
            placeholder="Yaşadığınız Sorunu Detaylı Olarak Yazınız"
          />
          <RequestCases
            selected={priority}
            setSelected={setPriority}
            cases={priorityList}
          />
          <div className="support-buttons">
            <div className="support-buttons-left">
              <input
                onChange={handleFileInputChange}
                name="file"
                type="file"
                id="file"
                style={{ display: "none" }}
              />

              <label className="add-file" htmlFor="file">
                <AttachFile />
                Dosya Ekleyin
              </label>
              {file ? (
                <div className="file-upload">
                  <CloseOutlined onClick={() => setFile("")} className="icon" />
                  <small>{file.name}</small>
                </div>
              ) : null}
            </div>
            <div className="support-buttons-right">
              <button name="send" type="submit" className="gonder">
                TALEP GÖNDER
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewSupport;
