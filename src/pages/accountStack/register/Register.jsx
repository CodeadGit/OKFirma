import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import Logo from "../login/logo.svg";
import Behind from "../login/svg/behind.svg";
import { AuthenticationContext } from "../../../context/authentication.context";
import ChevronBack from "./svg/leftchevron.svg";
import FirstArea from "./FirstArea";
import SecondArea from "./SecondArea";
import ThirdArea from "./ThirdArea";
import { doc, setDoc } from "firebase/firestore";
import Apple from "./svg/appStore.svg";
import Android from "./svg/androidStore.svg";
import Facebook from "./svg/facebook.svg";
import Instagram from "./svg/instagram.svg";
import Linkedin from "./svg/linkedin.svg";
import Twitter from "./svg/twitter.svg";
import Youtube from "./svg/youtube.svg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Register = ({ setAlertMessage, setLoading }) => {
  const { register } = useContext(AuthenticationContext);
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorSecond, setErrorSecond] = useState("");
  const [errorLast, setErrorLast] = useState("");
  const [file, setFile] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedinfo, setCheckedinfo] = useState(false);
  const [regForm, setRegForm] = useState({
    userName: "",
    firmPhone: "",
    email: "",
    fields: [],
    firmName: "",
    TCKN: "",
    firmType: "",
    Address: "",
    City: "",
    Region: "",
    ZIP: "",
    bio: "",
    notification: false,
  });
  const [dolu, setDolu] = useState("first");

  let navigate = useNavigate();

  const handleUpload = async (result) => {
    const storageRef = ref(storage, `/logos/${result.user.uid + file.name}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const photoURL = getDownloadURL(ref(storage, uploadTask.ref.fullPath));
    photoURL.then((url) =>
      setDoc(doc(db, "Users", result.user.uid), {
        userid: result.user.uid,
        userName: regForm.userName,
        firmPhone: regForm.firmPhone,
        email: regForm.email,
        fields: regForm.fields,
        firmName: regForm.firmName,
        TCKN: regForm.TCKN,
        firmType: regForm.firmType,
        Address: regForm.Address,
        City: regForm.City,
        Region: regForm.Region,
        ZIP: regForm.ZIP,
        bio: regForm.bio,
        notification: regForm.notification,
        createdAt: new Date(),
        isOnline: true,
        confirmed: false,
        firm: true,
        client: false,
        logo: url,
        userUnique: new Date().valueOf().toString().substring(7),
        KPU: 0,
        updatedAt: "",
      }).then(() => updateProfile(result.user, { photoURL: url }))
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        regForm.email,
        regPassword
      );
      await handleUpload(result)
        .then(() =>
          updateProfile(result.user, { displayName: regForm.firmName })
        )
        .then(() => navigate("/"));

      setRegForm({
        userName: "",
        firmPhone: "",
        email: "",
        fields: [],
        firmName: "",
        TCKN: "",
        firmType: "",
        Address: "",
        City: "",
        Region: "",
        ZIP: "",
        bio: "",
        notification: false,
      });
      setFile("");

      setLoading(false);
      setAlertMessage("Formlar Başarıyla Yüklendi, Onay Durumunuzu Takip Edin");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  function CheckPassword(text) {
    var passw = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);

    return passw.test(text);
  }
  function CheckFile(file) {
    if (file) {
      return URL.createObjectURL(file).length > 0;
    } else {
      return false;
    }
  }
  return (
    <>
      <div className="login">
        {/* <img className="behindYellow" src={Behind} alt="" /> */}
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

        <div className="loginbody">
          <div className="formbody">
            <div className="formbodylight">
              <div className="innerbody">
                <div className="top">
                  {(dolu === "second") | (dolu === "third") ? (
                    <img
                      onClick={() => {
                        setDolu((pre) =>
                          pre === "second" ? "first" : "second"
                        );
                        setErrorLast("");
                        setErrorSecond("");
                      }}
                      className="chevron back"
                      src={ChevronBack}
                      alt=""
                    />
                  ) : null}
                  <div className="processbar">
                    <div className="processItem">
                      <div
                        onClick={() => setDolu("first")}
                        className="processleft "
                      ></div>
                      <div>Üyelik İşlemleri</div>
                    </div>
                    <div className="processItem">
                      <div
                        onClick={() => setDolu("second")}
                        className={`processcenter ${dolu}`}
                      ></div>
                      <div>Firma Bilgileri</div>
                    </div>
                    <div className="processItem">
                      <div className={`processright ${dolu}`}></div>
                      <div>Kayıt Ol</div>
                    </div>
                  </div>
                </div>
                <div className="center">
                  {dolu === "first" ? (
                    <FirstArea
                      error={error}
                      regForm={regForm}
                      setRegForm={setRegForm}
                      regEmail={regEmail}
                      setRegEmail={setRegEmail}
                    />
                  ) : dolu === "second" ? (
                    <SecondArea
                      error={error}
                      file={file}
                      setFile={setFile}
                      regForm={regForm}
                      setRegForm={setRegForm}
                    />
                  ) : (
                    <ThirdArea
                      setError={setError}
                      checked={checked}
                      setChecked={setChecked}
                      checkedinfo={checkedinfo}
                      setCheckedinfo={setCheckedinfo}
                      regPassword={regPassword}
                      setRegPassword={setRegPassword}
                      confirmPassword={confirmPassword}
                      setConfirmPassword={setConfirmPassword}
                      error={error}
                      file={file}
                      regForm={regForm}
                      setRegForm={setRegForm}
                      register={register}
                      errorLast={errorLast}
                      setErrorLast={setErrorLast}
                    />
                  )}
                </div>
                <div className="login-bottom">
                  <button
                    className="btn btn_login"
                    onClick={() => {
                      if (dolu === "first") {
                        if (
                          regForm.userName &&
                          regForm.firmPhone &&
                          regForm.email &&
                          regForm.fields.length > 0
                        ) {
                          setDolu((pre) =>
                            pre === "first" ? "second" : "third"
                          );
                          setError("");
                        } else {
                          setError("Bütün alanlara değer girmelisiniz");
                        }
                      } 
                      else if (dolu === "second") 
                      {
                        if (
                          regForm.firmName &&
                          regForm.TCKN &&
                          regForm.firmType &&
                          regForm.Address &&
                          regForm.City &&
                          regForm.Region &&
                          regForm.ZIP &&
                          CheckFile(file)
                        ) {
                          if(regForm.TCKN.length<10){
                            setErrorSecond("TC No 11 Haneden, Vergi No 10 haneden az olamaz");

                          }else{
                            setDolu((pre) =>
                            pre === "first" ? "second" : "third"
                          );
                          setErrorSecond("");
                        
                          } 
                          
                        } else {
                          setErrorSecond("Bütün alanlara değer girmelisiniz");
                        }
                      } else {
                        if (checkedinfo) {
                          if (regForm.bio)
                            if (regPassword === confirmPassword) {
                              if (CheckPassword(regPassword)) {
                                setErrorLast("");
                                handleSubmit();
                              } else {
                                setErrorLast(
                                  "Şifre gerekliliklerine dikkat et"
                                );
                              }
                            } else {
                              setErrorLast("Şifreler eşleşmiyor");
                            }
                          else {
                            setErrorLast("Bütün alanlara değer girmelisiniz");
                          }
                        } else {
                          setErrorLast("Aydınlatma Metnini okuyup, onaylayın!");
                        }
                      }
                    }}
                  >
                    {(dolu === "first") | (dolu === "second")
                      ? `DEVAM ET`
                      : `KAYIT OL`}
                  </button>
                  {error &&
                  !regForm.email | !regForm.userName | !regForm.firmPhone ? (
                    <p className="error">{error}</p>
                  ) : null}

                  {errorSecond &&
                  !CheckFile(file) |
                    !regForm.firmName |
                    !regForm.TCKN |
                    !regForm.TCKN.length<10|
                    !regForm.firmType |
                    !regForm.Address |
                    !regForm.City |
                    !regForm.Region |
                    !regForm.ZIP ? (
                    <p className="error">{errorSecond}</p>
                  ) : null}

                  {errorLast &&
                  !regForm.bio | (regPassword !== confirmPassword) ? (
                    <p className="error">{errorLast}</p>
                  ) : null}
                  <div className="loginRegisterArea">
                    <p className="registerText">Zaten bir hesabınız var mı?</p>
                    <Link
                      to="/"
                      onClick={() => setAlertMessage("")}
                      className="btn btn_signup"
                    >
                      Hesabınıza Giriş Yapın
                    </Link>
                  </div>
                </div>
                <div className="login-bottom">
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
            <span>© Onlinekeşif 2022</span>
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
    </>
  );
};

export default Register;
