import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../register/register.scss";
import Logo from "./logo.svg";
import Behind from "./svg/behind.svg";
import Apple from "./svg/appStore.svg";
import Android from "./svg/androidStore.svg";
import Facebook from "./svg/facebook.svg";
import Instagram from "./svg/instagram.svg";
import Linkedin from "./svg/linkedin.svg";
import Twitter from "./svg/twitter.svg";
import Youtube from "./svg/youtube.svg";

import { AuthenticationContext } from "../../../context/authentication.context";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert } from "@mui/material";

const Login = ({
  setLoading,
  setMessage,
  setAlertMessage,
  alertMessage,
  warnMessage,
  setWarnMessage,
}) => {
  const { user, userData, setUser } = useContext(AuthenticationContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPass, setShowPass] = useState("password");

  let navigate = useNavigate();
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
      setAlertMessage(err);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      ).then(() => navigate("/"));
      setUser(user.user);
      setLoading(false);
      userData && !userData.firm
        ? setAlertMessage(
            "Şirket yetkiniz yoktur. Lütfen Firma olarak kaydolun."
          )
        : setAlertMessage("");
    } catch (error) {
      handleErrorMessage(error.message);
      setLoading(false);
    }
  };

  if (!user || !userData) {
    setAlertMessage("");
  }

  return (
    <div className="login">
      <img className="behindYellow" src={Behind} alt="" />
      <nav>
        <div className="left">
          <img src={Logo} alt="" />
        </div>
        <div className="right">
          <div className="supportButton">
            <a href="mailto:destek@onlinekesif.com">DESTEK</a>
          </div>
        </div>
      </nav>
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
          <Alert className="alert" severity="warning">
            {warnMessage}
          </Alert>
        </div>
      )}
      <div className="loginbody">
        <div className="formbody">
          <div className="formbodylight">
            <div className="innerbody">
              <div id="loginCenter" className="center">
                <div className="welcome">
                  <p className="headerTopText">Firma Paneline</p>
                  <h3 className="header">HOŞ GELDİNİZ</h3>
                  <div className="line"></div>
                </div>

                <p className="headerBottomText">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.{" "}
                </p>

                <p>{alertMessage}</p>

                <input
                  type="email"
                  className="input"
                  placeholder="E-posta adresi"
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
                <div className="inputWrapper">
                  <input
                    type={showPass}
                    className="inputinner"
                    placeholder="şifre"
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                    onSubmit={() =>
                      login(loginEmail, loginPassword, navigate("/"))
                    }
                  />
                  {showPass === "text" ? (
                    <VisibilityOffIcon
                      className="icon"
                      onClick={() =>
                        setShowPass((pre) =>
                          pre === "password" ? "text" : "password"
                        )
                      }
                    />
                  ) : (
                    <RemoveRedEyeIcon
                      onClick={() =>
                        setShowPass((pre) =>
                          pre === "password" ? "text" : "password"
                        )
                      }
                      className="icon"
                    />
                  )}
                </div>
                <div className="underLoginBox">
                  <div className="rememberMe">
                    <input type="checkbox" class="checkboxRounded" />
                    <label className="rememberMeText">Şifremi Hatırla</label>
                  </div>
                  <NavLink to="/sifremi-unuttum" className="forgotPassword">
                    Şifremi Unuttum
                  </NavLink>
                </div>

                <div className="btnArea">
                  <button
                    className="btn btn_login"
                    onClick={() => {
                      setWarnMessage("");
                      login(loginEmail, loginPassword, navigate("/"));
                    }}
                  >
                    Giriş Yap
                  </button>
                  <div className="loginRegisterArea">
                    <p className="registerText">
                      Online Keşif hesabınız yok mu?
                    </p>
                    <Link
                      to="/Kayit-Ol"
                      onClick={() => setMessage("")}
                      className="btn btn_signup"
                    >
                      Online Keşif Hesabınızı Oluşturun
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="bottomTop">
                  <div className="bottomTopText">
                    <p>Online Keşif uygulamasını ücretsiz indir</p>
                    <p>Bizi Takip Et</p>
                  </div>
                  <div className="bottomTopImages">
                    <div className="storeImages">
                      <img src={Apple} alt="apple" />
                      <img src={Android} alt="android" />
                    </div>
                    <div className="socialImages">
                      <img src={Facebook} alt="facebook" />
                      <img src={Instagram} alt="instagram" />
                      <img src={Linkedin} alt="linkedin" />
                      <img src={Twitter} alt="twitter" />
                      <img src={Youtube} alt="youtube" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="left">
          <span>© Onlinekeşif 2023</span>
        </div>
        {/* <div className="center">
                <img src={Kalite} alt=""/>
              </div> */}
        <div className="right">
          <div className="items">
            <a href="https://onlinekesif.com/" target="_blank" id="whitetag">
              OnlineKeşif
            </a>
            <a href="https://onlinekesif.com/hakkimizda" target="_blank">
              Hakkımızda
            </a>
            <a href="https://onlinekesif.com/" target="_blank">
              Hizmetler
            </a>
            <a href="https://onlinekesif.com/blog" target="_blank">
              Blog
            </a>
            <a href="https://onlinekesif.com/iletisim" target="_blank">
              İletişim
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
