import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function ThirdArea({
  file,
  error,
  setRegForm,
  regForm,
  regPassword,
  setRegPassword,
  confirmPassword,
  setConfirmPassword,
  checked,
  setChecked,
  checkedinfo,
  setCheckedinfo,
}) {
  const [showPass, setShowPass] = useState("password");

  return (
    <div className="inputs">
      <div className="imgContainer">
        <img className="logodiv" src={URL.createObjectURL(file)} />
        <p className="headerBottomText">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
      </div>
      <div className="zippedArea">
        <textarea
          value={regForm.bio}
          placeholder="Tanıtım Yazısı ( Örn: 1994*ten beri güven,kalite,memnuniyet için çalışıyoruz…)"
          className={`input ${error && !regForm.Address ? "red" : "valid"}`}
          onChange={(event) => {
            setRegForm({ ...regForm, bio: event.target.value });
          }}
        ></textarea>
        <div className="inputWrapper">
          <input
            type={showPass}
            className={`inputinner ${
              error && !regForm.Address ? "red" : "valid"
            }`}
            placeholder="Şifre (Şifre en az 8, en fazla 15 karakterden ve en az 1 rakam ve 1 büyük harf içermelidir.)"
            value={regPassword}
            onChange={(event) => {
              setRegPassword(event.target.value);
            }}
          />
          {showPass === "text" ? (
            <VisibilityOffIcon
              className="icon"
              onClick={() =>
                setShowPass((pre) => (pre === "password" ? "text" : "password"))
              }
            />
          ) : (
            <RemoveRedEyeIcon
              onClick={() =>
                setShowPass((pre) => (pre === "password" ? "text" : "password"))
              }
              className="icon"
            />
          )}
        </div>
        <div className="inputWrapper">
          <input
            type={showPass}
            className={`inputinner ${
              error && !regForm.Address ? "red" : "valid"
            }`}
            placeholder="Lütfen şifreyi tekrar giriniz"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          {showPass === "text" ? (
            <VisibilityOffIcon
              className="icon"
              onClick={() =>
                setShowPass((pre) => (pre === "password" ? "text" : "password"))
              }
            />
          ) : (
            <RemoveRedEyeIcon
              onClick={() =>
                setShowPass((pre) => (pre === "password" ? "text" : "password"))
              }
              className="icon"
            />
          )}
        </div>
        <div className="radios">
          <div className="inputRow">
            <input
              type="radio"
              id="huey"
              name="drone"
              value="Bana özel kampanya ve indirimlerden haberdar olmak için (Rıza Metni kapsamında) elektronik
                              İleti almak istiyorum."
              checked={checked}
              onClick={() => {
                setChecked((pre) => !pre);
                setRegForm({ ...regForm, notification: checked });
              }}
            />
            <label htmlFor="huey">
              Bana özel kampanya ve indirimlerden haberdar olmak için{" "}
              <b>(Rıza Metni kapsamında)</b> elektronik İleti almak istiyorum.
            </label>
          </div>
          <div className="inputRow">
            <input
              type="radio"
              id="metin"
              name="mrone"
              value="Aydınlatma Metnini okudum onaylıyorum."
              checked={checkedinfo}
              onClick={() => {
                setCheckedinfo((pre) => !pre);
              }}
            />
            <label htmlFor="metin">
              <b>
                <u>Aydınlatma Metnini</u>
              </b>{" "}
              okudum onaylıyorum.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdArea;
