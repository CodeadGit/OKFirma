import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext } from "react";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/text/Header";
import { AuthenticationContext } from "../../context/authentication.context";
import { auth, db, storage } from "../../firebase/firebase.config";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

function EditForm() {
  const { userData } = useContext(AuthenticationContext);
  const [file, setFile] = useState("");
  const [edit, setEdit] = useState({});
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    let url;
    if (file) {
      const imgRef = ref(storage, `logo/${auth.currentUser.uid + file.name}`);
      const snap = await uploadBytes(imgRef, file);
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlurl;
      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        logo: url,
      });
      await updateProfile(auth.currentUser, { photoURL: url });
    }
    await updateDoc(doc(db, "Users", auth.currentUser.uid), {
      ...edit,
      updatedAt: new Date(),
    })
      .then(() => setUploading(false))
      .finally(() => setAlert("Bilgiler başarıyla güncellendi"))
      .catch((e) => {
        setUploading(false);
        setError(e.message);
      });
  };

  const handleEdit = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  if (uploading) {
    return <Loading title="Yükleniyor" />;
  }

  return (
    <div className="formContainer">
      <Header className="header">Bilgilerim</Header>
      <div className="line"></div>
      <div className="inputContainer">
        {error ? (
          <Alert className="alert" severity="error">
            <span>{error}</span>
            <button onClick={() => setError("")}>Tamam</button>
          </Alert>
        ) : null}
        {alert ? (
          <Alert className="alert" severity="info">
            <span>{alert}</span>
            <button
              onClick={() => {
                navigate("/");
                setAlert("");
              }}
            >
              Tamam
            </button>
          </Alert>
        ) : null}

        <div className="myfields">
          <div className="row imgContainer">
            <img
              //src={auth.currentUser?.photoURL}
              src={
                file ? URL.createObjectURL(file) : auth.currentUser?.photoURL
              }
              alt=""
            />

<div class="file-input-container">
    <input type="file" class="file-input" id="photo" onChange={handleChange}  accept="image/*" aria-label="DEĞİŞTİR"
/>
    <button class="custom-button" >Dosya Seç</button>
  </div>

{/*            
            <input
              onChange={handleChange}
              type="file"
              id="photo"
              accept="image/*"
              aria-label="DEĞİŞTİR"
            /> */}
          </div>

          <div className="top-right">
            <div className="alan">
              <p className="title">İş Alanlarım</p>
              {userData?.fields?.map((i) => {
                return (
                  <span className="item" key={i}>
                    {i}
                  </span>
                );
              })}
            </div>

            <div className="row1">
              <div className="input1">
                <label>Hakkımda</label>
                <textarea
                  onChange={handleEdit}
                  name="bio"
                  placeholder={userData?.bio}
                />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input">
              <label>Firma Adı</label>
              <input
                placeholder={auth.currentUser?.displayName}
                disabled
                type="text"
              />
            </div>
            <div className="input">
              <label>Telefon Numarası</label>
              <input
                placeholder={userData?.firmPhone}
                name="firmPhone"
                onChange={handleEdit}
                type="text"
              />
            </div>
            <div className="input">
              <label>E-Posta</label>
              <input
                name="email"
                disabled
                onChange={handleEdit}
                placeholder={auth.currentUser?.email}
                type="text"
              />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label>TCKN/VN</label>
              <input disabled placeholder={userData?.TCKN} type="text" />
            </div>
            <div className="input">
              <label>İş Yeri Adresi</label>
              <input
                onChange={handleEdit}
                name="Address"
                placeholder={userData?.Address}
                type="text"
              />
            </div>
            <div className="input">
              <label>Şirket Türü</label>
              <input disabled placeholder={userData?.firmType} type="text" />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label>İl</label>
              <input placeholder={userData?.City} disabled type="text" />
            </div>
            <div className="input">
              <label>İlçe</label>
              <input disabled placeholder={userData?.Region} type="text" />
            </div>
            <div className="input">
              <label>Posta Kodu</label>
              <input disabled placeholder={userData?.ZIP} type="text" />
            </div>
          </div>

          <div className="row buttons">
            <button
              onClick={() => {
                navigate("/");
                setEdit({});
              }}
              className="exit"
            >
              ÇIKIŞ
            </button>
            <button type="submit" className="submit">
              KAYDET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
