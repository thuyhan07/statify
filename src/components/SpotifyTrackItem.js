import React, { useEffect, useRef } from "react";
import { useData } from "../context/Context";
import axios from "axios";

function SpotifyTrackItem({ item, index, imageRedesign, titleRedesign, redesign, overallRedesign, currentTime, played_at }) {
  const { displayItem, token } = useData();
  const songDuration = item.duration_ms;
  const min = Math.floor(songDuration / 60000);
  const sec = Math.floor((songDuration % 60000) / 1000);
  const displayDuration = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  const containerRef = useRef();
  const buttonRef = useRef();

  const getTrackInfo = (id) => {
    axios
      .get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => displayItem(resp.data));
  };

  function calcTime(time) {
    const secondsAgo = Math.floor((currentTime - time) / 1000); 
    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return minutesAgo === 1 ? "a minute ago" : `${minutesAgo} minutes ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return hoursAgo === 1 ? "an hour ago" : `${hoursAgo} hours ago`;
    } else if (secondsAgo < 2592000) { 
      const daysAgo = Math.floor(secondsAgo / 86400);
      return daysAgo === 1 ? "a day ago" : `${daysAgo} days ago`;
    } else if (secondsAgo < 31536000) { 
      const monthsAgo = Math.floor(secondsAgo / 2592000);
      return monthsAgo === 1 ? "a month ago" : `${monthsAgo} months ago`;
    } else {
      const yearsAgo = Math.floor(secondsAgo / 31536000);
      return yearsAgo === 1 ? "a year ago" : `${yearsAgo} years ago`;
    }
  }

  useEffect(() => {
    if (containerRef.current && buttonRef.current) {
      buttonRef.current.style.height = `${containerRef.current.offsetHeight}px`;
      buttonRef.current.style.width = `${containerRef.current.offsetWidth}px`;
    }
  }, [containerRef, buttonRef, item]);

  return (
    <div className={overallRedesign}>
    <div className="spotify-track-item" ref={containerRef}>
      <button
        ref={buttonRef}
        className="spotify-item-showdetail-button"
        onClick={() => {
          if (item.album) {
            displayItem(item);
          } else {
            getTrackInfo(item.id);
          }
        }}
      ></button>
      {overallRedesign ? <div className="display-none"></div> : <h3 className="track-num">{index + 1}</h3>}
      {item.album && item.album.images && item.album.images.length > 0 ? (
        <img
          src={item.album.images[0].url}
          alt={item.name}
          className={`spotify-track-item-image ${redesign} ${imageRedesign}`}
        />
      ) : (
        <p className={`spotify-track-item-image ${redesign} ${imageRedesign}`}>
          No image available
        </p>
      )}
      <div className={`spotify-track-details ${titleRedesign}`}>
        <h3 className="track-name">{item.name}</h3>
        <h3 className="track-duration">{displayDuration}</h3>
      </div>
    </div>
    {overallRedesign ? <h3 className="recently-played-time">{calcTime(played_at)}</h3> : <div className="display-none"></div>}
    </div>
  );
}

export default SpotifyTrackItem;
