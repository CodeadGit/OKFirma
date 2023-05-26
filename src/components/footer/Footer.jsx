import React from "react";
import "./footer.scss";
import Kalite from "../../pages/accountStack/login/svg/kalite.svg";
function Footer() {
  return (
    <footer>
      <div className="left">
        <span>© Onlinekeşif 2022</span>
      </div>
      <div className="center">
        <img src={Kalite} alt="" />
      </div>
      <div className="right">
        <div className="items">
          <a href="#" target="_blank" id="whitetag">
            OnlineKeşif
          </a>
          <a href="https://onlinekesif.com/hakkimizda" target="_blank">
            Hakkımızda
          </a>
          <a href="https://onlinekesif.com/" target="_blank">
            Hizmetler
          </a>
          <a href="#">Blog</a>
          <a href="https://onlinekesif.com/iletisim" target="_blank">
            İletişim
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
