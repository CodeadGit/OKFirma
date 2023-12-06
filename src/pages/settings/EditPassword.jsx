import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import "./settings.scss";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/text/Header";

function EditPassword() {
  const [showOld, setShowOld] = useState("password");
  const [showNews, setShowNews] = useState("password");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCon, setNewPasswordCon] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === newPasswordCon && CheckPassword(newPassword)) {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        auth.currentUser.email,
        oldPassword
      )
        .then(() => updatePassword(auth.currentUser, newPassword))
        .then(() => alert("şifre değişti"))
        .finally(() => navigate("/"))
        .catch((e) => alert(e.message));
    } else {
      alert("yeni şifre eşleşmiyor veya şifre gerekliliklerine dikkat edin");
    }
  };
  function CheckPassword(text) {
    var passw = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);

    return passw.test(text);
  }
  let navigate = useNavigate();
  if (loading) {
    return <Loading title="İşleniyor" />;
  }
  return (
    // <div className="formContainer">
    <div className="inputContainer">
      <Header className="header">Şifremi Değiştir</Header>
      <div className="line-two"></div>

      <form className="pass" onSubmit={handleSubmit}>
        <label>Eski Şifreniz</label>
        <div className="inputver">
          <input
            placeholder="eski şifreniz"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type={showOld}
          />
          <div
            onClick={() =>
              setShowOld((pre) => (pre === "password" ? "text" : "password"))
            }
            className="eye"
          >
            {showOld === "password" ? (
              <RemoveRedEyeIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </div>
        </div>

        <label>Yeni Şifreniz</label>
        <div className="inputver">
          <input
            placeholder="yeni şifreniz"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={showNews}
          />
          <div
            onClick={() =>
              setShowNews((pre) => (pre === "password" ? "text" : "password"))
            }
            className="eye"
          >
            {showNews === "password" ? (
              <RemoveRedEyeIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </div>
        </div>

        <label>Yeni Şifreniz Tekrar</label>
        <div className="inputver">
          <input
            placeholder="yeni şifreniz"
            value={newPasswordCon}
            onChange={(e) => setNewPasswordCon(e.target.value)}
            type={showNews}
          />
          <div
            onClick={() =>
              setShowNews((pre) => (pre === "password" ? "text" : "password"))
            }
            className="eye"
          >
            {showNews === "password" ? (
              <RemoveRedEyeIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </div>
        </div>
        <ul className="regExp">
          <li>* Şifre en az 8, en fazla 15 karakterden oluşmalıdır</li>
          <li>* Şifre en az 1 rakam ve 1 büyük harf içermelidir.</li>
        </ul>
        <div className="row buttons">
          <button
            onClick={() => {
              navigate("/");
              setNewPassword("");
              setNewPasswordCon("");
            }}
            className="exit"
          >
            ÇIKIŞ
          </button>
          <button type="submit" className="submit">
            DEĞİŞTİR
          </button>
        </div>
      </form>
    </div>
    // </div>
  );
}

export default EditPassword;
