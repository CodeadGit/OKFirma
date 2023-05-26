import React, { useContext } from "react";
import { CloudContext } from "../../context/cloud.context";
import NewsBox from "../boxes/NewsBox";
import DateText from "../text/DateText";
import Header from "../text/Header";
import NormalText from "../text/NormalText";
import "./rightSideBar.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function RightSideBar() {
  const { news } = useContext(CloudContext);
  return (
    <div className="rightSideBar">
      <NewsBox>
        <Header>Duyurular</Header>
        <Carousel
          axis="axis"
          autoPlay="autoPlay"
          dynamicHeight={false}
          infiniteLoop={true}
          labels={false}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          width={"50%"}
          height={400}
        >
          {news.map((item, id) => (
            <div key={id} className="newsItem">
              <NormalText>{item.body}</NormalText>
              <DateText>
                {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
              </DateText>
            </div>
          ))}
        </Carousel>
      </NewsBox>
      <NewsBox>
        <Header>Makaleler</Header>
        <br></br>
        {news.map((item, id) => (
          <div key={id} className="newsItem">
            <NormalText>{item.body}</NormalText>
            <DateText>
              {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
            </DateText>
          </div>
        ))}
        {news.map((item, id) => (
          <div key={id} className="newsItem">
            <NormalText>{item.body}</NormalText>
            <DateText>
              {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
            </DateText>
          </div>
        ))}
        {news.map((item, id) => (
          <div key={id} className="newsItem">
            <NormalText>{item.body}</NormalText>
            <DateText>
              {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
            </DateText>
          </div>
        ))}
      </NewsBox>
    </div>
  );
}

export default RightSideBar;
