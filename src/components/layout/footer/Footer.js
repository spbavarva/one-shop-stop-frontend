import React, { Fragment } from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
      <Fragment>

    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>One Shop Stop</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; sp_bavarva</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/sp_bavarva/">Instagram</a>
        <a href="https://www.youtube.com/channel/UCTcZmt1NTtzhTMZhy5iX98w/videos">Youtube</a>
      </div>
    </footer>
      </Fragment>
  );
};

export default Footer;
