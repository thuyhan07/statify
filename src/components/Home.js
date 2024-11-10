import React from "react";
import { useData } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosLock } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";

function Home() {
  const { token } = useData();
  const navigate = useNavigate();

  if (token) {
    navigate("/myprofile");
  }

  return (
    <div className="home pages">
      <div className="home-header">
        <div className="home-header-text">
          <h1>
            <span className="hover-green">Your</span> music,
          </h1>
          <h1>
            <span className="home-header-text-emphasize hover-green">your</span>{" "}
            stats,
          </h1>
          <h1>
            <span className="home-header-text-emphasize hover-green">your</span>{" "}
            story.
          </h1>
          <p className="home-header-subtitle">
            Enter a new dimension of music by getting unique insights into your
            music taste.
          </p>
          <a
            href="https://www.youtube.com/watch?v=ABqhwEmR7E0"
            className="home-header-subtitle home-link"
            target="_blank"
          >
            Watch the video <IoIosArrowForward className="link-arrow" />
          </a>
        </div>
        <img src="https://spotistats.app/images/app_3.webp" alt="" />
      </div>
      <div className="home-body">
        <div className="home-overview">
          <img src="https://spotistats.app/images/app_2.webp" alt="" />
          <div className="home-overview-desc">
            <h1 className="no-margin">Easy, extensive and secure</h1>
            <p className="home-header-subtitle no-margin">
              With the click of a button, you'll be logged into your account,
              instantly gaining access to a valhalla of cool stats and insights
            </p>
            <div className="home-overview-feature-list">
              <div className="home-overview-feature-list-item">
                <div className="home-overview-list-item-title">
                  <div className="feature-icon-container">
                  <IoIosLock className="feature-icon" />
                  </div>
                  <h2 className="no-margin ">Safe & secure</h2>
                </div>
                <p className="home-header-subtitle no-margin">
                  We prioritize privacy and security. We only store the data we
                  need to store to provide you with a magical experience, and
                  all data is stored securely.
                </p>
              </div>
              <div className="home-overview-feature-list-item">
                <div className="home-overview-list-item-title">
                  <div className="feature-icon-container">
                  <IoStatsChart className="feature-icon" />
                  </div>
                  <h2 className="no-margin ">Enhanced personalized stats</h2>
                </div>
                <p className="home-header-subtitle no-margin">
                  Thanks to state of the art algorithms you'll always be
                  welcomed with relevant, advanced and personalized stats for
                  each item you click on.
                </p>
              </div>
              <div className="home-overview-feature-list-item">
                <div className="home-overview-list-item-title">
                  <div className="feature-icon-container">
                  <FaListUl className="feature-icon" />
                  </div>
                  <h2 className="no-margin ">
                    Top tracks, artists and albums at a glance*
                  </h2>
                </div>
                <p className="home-header-subtitle no-margin">
                  Many users love checking their top lists here—it's a magical
                  experience. You can organize lists by playtime, stream count,
                  or use provided ordering methods from connected services.
                </p>
              </div>
              <div className="home-overview-feature-list-item">
                <div className="home-overview-list-item-title">
                  <div className="feature-icon-container">
                  <LuHistory className="feature-icon" />
                  </div>
                  <h2 className="no-margin ">Import your lifetime history*</h2>
                </div>
                <p className="home-header-subtitle no-margin">
                  Take advantage of our unique import process to bring in your
                  complete streaming history and unleash a wave of fantastic
                  features. Believe us, it's really cool!
                </p>
              </div>
            </div>
            <p className="home-header-subtitle">
              * import of streaming history may be required to unlock (part of)
              this feature
            </p>
          </div>
        </div>
        <div className="home-features"></div>
      </div>
    </div>
  );
}

export default Home;
