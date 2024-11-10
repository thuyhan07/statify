import React, { useEffect, useRef } from "react";
import { useData } from "../context/Context";
import axios from "axios";

function SpotifyItem({ item, itemType, reDesign, index }) {
  const { displayItem, token } = useData();

  const containerRef = useRef();
  const buttonRef = useRef();

  const getArtistInfo = (id) => {
    axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then((resp)=>displayItem(resp.data))
  }

  // const getTrackInfo = (id) => {
  //   axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
  //     headers: {Authorization: `Bearer ${token}`}
  //   }).then((resp)=>displayItem(resp.data))
  // }

  useEffect(() => {
    if (containerRef.current && buttonRef.current) {
      buttonRef.current.style.height = `${containerRef.current.offsetHeight}px`;
      buttonRef.current.style.width = `${containerRef.current.offsetWidth}px`;
    }
  }, [containerRef, buttonRef, item]);

  if (itemType === "artist") {
    return (
      <div
        ref={containerRef}
        className={`spotify-item-container text-align-center ${reDesign}`}
      >
        <button
          ref={buttonRef}
          className="spotify-item-showdetail-button"
          onClick={() => {
            if (item.images) {
              displayItem(item);
            } else {
              getArtistInfo(item.id);
            }
          }}
        ></button>
        {reDesign === "add-ranking" ? (
          <div className="ranking">
            <h2>{index + 1}</h2>
          </div>
        ) : (<div></div>)}
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            alt={item.name}
            className="artist-pfp spotify-item-image"
          />
        ) : (
          <p className="spotify-item-image artist-pfp">No image available</p>
        )}
        {item.name.length > 29 ? (
          <p className="spotify-item-name">{`${item.name.slice(0, 29)}...`}</p>
        ) : (
          <p className="spotify-item-name">{item.name}</p>
        )}
      </div>
    );
  } else if (itemType === "track") {
    return (
      <div
        ref={containerRef}
        className={`spotify-item-container text-align-left ${reDesign}`}
      >
        <button
          ref={buttonRef}
          className="spotify-item-showdetail-button"
          onClick={() => {
            displayItem(item);
          }}
        ></button>
        {reDesign === "add-ranking" ? (
          <div className="ranking">
            <h2>{index + 1}</h2>
          </div>
        ) : (<div></div>)}
        {item.album.images && item.album.images.length > 0 ? (
          <img
            src={item.album.images[0].url}
            alt={item.name}
            className="spotify-item-image"
          />
        ) : (
          <p className="spotify-item-image">No image available</p>
        )}
        {item.name.length > 29 ? (
          <p className="spotify-item-name">{`${item.name.slice(0, 29)}...`}</p>
        ) : (
          <p className="spotify-item-name">{item.name}</p>
        )}
      </div>
    );
  } else if (itemType === "album") {
    return (
      <div
        ref={containerRef}
        className={`spotify-item-container text-align-left ${reDesign}`}
      >
        <button
          ref={buttonRef}
          className="spotify-item-showdetail-button"
          onClick={() => {
            displayItem(item);
          }}
        ></button>
        {reDesign === "add-ranking" ? (
          <div className="ranking">
            <h2>{index + 1}</h2>
          </div>
        ) : (<div></div>)}
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            alt={item.name}
            className="spotify-item-image"
          />
        ) : (
          <p className="spotify-item-image">No image available</p>
        )}
        {item.name.length > 29 ? (
          <p className="spotify-item-name">{`${item.name.slice(0, 29)}...`}</p>
        ) : (
          <p className="spotify-item-name">{item.name}</p>
        )}
      </div>
    );
  }
}

export default SpotifyItem;
