import React from "react";
import "./register.scss";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import SlideCard from "./SlideCard";

function FirstArea({ regForm, setRegForm, error }) {
  const items = [
    {
      id: "01",
      title: "Kombi",
      body: "Kombi değişimi ve projelendirme hizmetleri veriyorum.",
    },
    {
      id: "02",
      title: "Kazan",
      body: "Kazan kurulumu ve değişimi hizmetleri veriyorum.",
    },
    {
      id: "03",
      title: "Klima",
      body: "Klima kurulumu ve değişimi hizmetleri veriyorum.",
    },
    {
      id: "04",
      title: "Doğalgaz Tesisatı",
      body: "Doğalgaz tadilatı, kurulum ve proje hizmetleri veriyorum.",
    },
  ];

  return (
    <div className="inputs">
      <div className="imgRegisterContainer">
        <div className="welcome">
          <p className="headerTopText">Firma Paneline</p>
          <h3 className="header">HOŞ GELDİNİZ</h3>
          <div className="line"></div>
        </div>
        <p className="headerBottomText">
        Lütfen aşağıdaki bilgileri eksiksiz doldurunuz.
        </p>
      </div>
      <div className="zippedArea">
        <div className="inputRow">
          <input
            type="text"
            className={`input ${error && !regForm.userName ? "red" : "valid"}`}
            value={regForm.userName}
            placeholder="Kullanıcı Adı"
            onChange={(event) => {
              setRegForm({ ...regForm, userName: event.target.value });
            }}
          />

          <input
            type="email"
            value={regForm.firmPhone}
            className={`input ${error && !regForm.firmPhone ? "red" : "valid"}`}
            placeholder="+90 (xxx) xxx xx xx"
            onChange={(event) => {
              setRegForm({ ...regForm, firmPhone: event.target.value });
            }}
            //onChange={(event)=>{setLoginEmail(event.target.value)}}
          />
        </div>
        <input
          type="email"
          className={`input ${error && !regForm.email ? "red" : "valid"}`}
          value={regForm.email}
          placeholder="E-Posta adresi"
          onChange={(event) => {
            setRegForm({ ...regForm, email: event.target.value });
          }}
          //onChange={(event)=>{setLoginEmail(event.target.value)}}
        />

        <div
          id="carouselWrapper"
          className={`carouselWrapper ${
            error && regForm.fields.length < 1 ? "red" : "valid"
          }`}
        >
          <AliceCarousel
            //disableButtonsControls
            disableDotsControls
            infinite
            autoWidth={true}
            mouseTracking
            //items={items}
          >
            {items.map((i) => {
              return (
                <div
                  key={i.id}
                  className="itemWrapper"
                  style={{ display: "flex" }}
                >
                  <SlideCard
                    setRegForm={setRegForm}
                    regForm={regForm}
                    item={i}
                  />
                </div>
              );
            })}
          </AliceCarousel>
        </div>
      </div>
    </div>
  );
}

export default FirstArea;
