import React from "react";
import { useState } from "react";
import "../register/register.scss";
import { sendPasswordResetEmail } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { auth } from "../../../firebase/firebase.config";

function ForgotPassword() {
  const [validMail, setValidMail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [warnMessage, setWarnMessage] = useState("");

  const handleErrorMessage = (err) => {
    if (err === "Firebase: Error (auth/email-already-exists).") {
      setAlertMessage(
        "Sağlanan e-posta zaten mevcut bir kullanıcı tarafından kullanılıyor. Her kullanıcının benzersiz bir e-posta adresi olmalıdır"
      );
    } else if (err === "Firebase: Error (auth/id-token-expired).") {
      setAlertMessage("kullanıcı hatırlama süresi doldu.");
    } else if (err === "Firebase: Error (auth/internal-error).") {
      setAlertMessage(
        "Kimlik doğrulama sunucusu beklenmeyen bir hatayla karşılaştı. "
      );
    } else if (err === "Firebase: Error (auth/invalid-email).") {
      setAlertMessage(
        "email kullanıcı özelliği için sağlanan değer geçersiz. mail adresi, geçerli e-posta adresi olmalıdır."
      );
    } else if (err === "Firebase: Error (auth/wrong-password).") {
      setAlertMessage("şifreyi yanlış girdiniz");
    } else if (err === "Firebase: Error (auth/user-not-found).") {
      setAlertMessage("Kullanıcı bulunamadı, kaydolun veya tekrar deneyin");
    } else {
      setAlertMessage("Bir hata meydana geldi, tekrar deneyin");
    }
  };

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, validMail)
      .then(() =>
        setWarnMessage("Şifre Yenileme E-Postası adresinize gönderildi.")
      )
      .catch((e) => handleErrorMessage(e.message));
  };

  return (
    <div className="login">
      <div className="form">
        <div className="form-container reg">
          <div className="left">
            <div className="header">
              <h3>HOŞ GELDİNİZ</h3>
              <div className="underline"></div>
            </div>
            <p>
              Kayıtlı olan email adresinizi gönderin, şifre yenileme linki email
              adresinize gönderilecektir.
            </p>
            <form className="form-inputs" onSubmit={handleSubmit}>
              <input
                required
                className="input"
                onChange={(e) => setValidMail(e.target.value)}
                placeholder="email"
                name="email"
                value={validMail}
              />

              <button type="submit" className="login-button">
                Gönder
              </button>
            </form>
            {alertMessage && (
              <div className="alertdiv">
                <Alert className="alert" severity="error">
                  {alertMessage}
                </Alert>

                {/* <Alert className='alert' severity="warning">This is a warning alert — check it out!</Alert>
            <Alert className='alert' severity="info">This is an info alert — check it out!</Alert>
            <Alert className='alert' severity="success">This is a success alert — check it out!</Alert> */}
              </div>
            )}
            {warnMessage && (
              <div className="alertdiv">
                <Alert className="alert" severity="success">
                  {warnMessage}
                </Alert>

                {/* <Alert className='alert' severity="warning">This is a warning alert — check it out!</Alert>
            <Alert className='alert' severity="info">This is an info alert — check it out!</Alert>
            <Alert className='alert' severity="success">This is a success alert — check it out!</Alert> */}
              </div>
            )}
            <NavLink className="link" to="/giris-yap">
              Zaten üye misiniz ? <strong>Giriş Yap</strong>
            </NavLink>
            <NavLink className="link" to="/kayit-ol">
              <strong>Kayıt Ol</strong>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
