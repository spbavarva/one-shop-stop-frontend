import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/sp_bavarva";
  };
  return (
    <div className="aboutSection">
      <div />
      <div className="aboutSectionGradient" />
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dapwwrmtk/image/upload/v1644646212/products/WhatsApp_Image_2021-12-24_at_12.51.22_PM_1_ly5tvg.jpg"
              alt="Founder"
            />
            <Typography>Sneh Patel</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This One Shop Stop website is made with MERN stack technology by
              @sp_bavarva. You can contact me at{" "}
              <a href="mailto:snehbavarva@gmail.com" />
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UCTcZmt1NTtzhTMZhy5iX98w/videos"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/sp_bavarva" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
