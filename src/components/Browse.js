import React, { useState} from "react";
import axios from "axios";
import { useData } from "../context/Context";
import { BiSearch } from "react-icons/bi";
import SpotifyItem from "./SpotifyItem";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import SpotifyItemDisplay from "./SpotifyItemDisplay";


function Browse() {
  const { token } = useData();

  const [searchKey, setSearchKey] = useState("");
  const [searchDisplay, setSearchDisplay] = useState("");
  const [artistList, setArtistList] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [albumList, setAlbumList] = useState([]);

  const [scrollPos, setScrollPos] = useState([
    { start: 0, end: 8 },
    { start: 0, end: 8 },
    { start: 0, end: 8 },
  ]);

  const getSearchItems = (e) => {
    e.preventDefault();
    setScrollPos([
      { start: 0, end: 8 },
      { start: 0, end: 8 },
      { start: 0, end: 8 },
    ]);
    setSearchDisplay(searchKey.trim());
    axios
      .get("https://api.spotify.com/v1/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          q: searchKey,
          limit: 49,
          type: "artist,track,album",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setArtistList(resp.data.artists.items);
        setAlbumList(resp.data.albums.items);
        setTrackList(resp.data.tracks.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setSearchKey('')
    console.log(searchDisplay);
  };

  const displayNext = (index, startPos, endPos, list) => {
    let newPos = [...scrollPos];
    newPos[index] = { start: startPos + 8, end: endPos + 8 };
    if (newPos[index].end > Math.ceil(list.length/8)*8) {
      newPos[index] = { start: 0, end: 8 };
      setScrollPos(newPos);
    } else {
      setScrollPos(newPos);
    }
    console.log(scrollPos);
  };

  const displayPrev = (index, startPos, endPos, list) => {
    let newPos = [...scrollPos];
    newPos[index] = { start: startPos - 8, end: endPos - 8 };
    if (newPos[index].start < 0) {
      newPos[index] = { start: (Math.ceil(list.length/8)*8)-8, end: Math.ceil(list.length/8)*8 };
      setScrollPos(newPos);
    } else {
      setScrollPos(newPos);
    }
    console.log(scrollPos);
  };

  if (!token) {
    return (
      <div className="error-page">
        <CiLock className="error-page-icon"/>
        <p className="error-page-text">Unable to access page. Please login.</p>
        </div>
    );
  } else {
    return (
      <div className="browse pages">
      <div className="browse-page">
        <form className="browse-search-bar" onSubmit={getSearchItems}>
          <input
            type="text"
            placeholder="What are you searching for?"
            className="browse-input"
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
          <button
            type="submit"
            onClick={getSearchItems}
            className="browse-submit-button"
          >
            <BiSearch />
          </button>
        </form>
        {(searchDisplay === "") ? (
          <div className="error-browse">
            <p className="error-page-text">What are you looking for?😊</p>
        </div>
      ) : (
      <div className="browse-display">
        <SpotifyItemDisplay/>
          <div className="browse-display-section">
            <div className="browse-display-header">
              <div className="browse-display-container-text">
                <h1 className="browse-display-title">Artists</h1>
                <h3 className="browse-display-subtitle">{`Artists matching "${searchDisplay}"`}</h3>
              </div>
              <div className="browse-display-container-buttons">
                <button
                  onClick={() => {
                    displayPrev(0, scrollPos[0].start, scrollPos[0].end, artistList);
                  }}
                  className="browse-nav-button"
                >
                  <FaRegArrowAltCircleLeft />
                </button>
                <button
                  onClick={() => {
                    displayNext(0, scrollPos[0].start, scrollPos[0].end, artistList);
                  }}
                  className="browse-nav-button"
                >
                  <FaRegArrowAltCircleRight />
                </button>
              </div>
            </div>

            <div className="spotify-item-display">
              {artistList
                .slice(scrollPos[0].start, scrollPos[0].end)
                .map((item, index) => (
                  <SpotifyItem
                    itemType={item.type}
                    item={item}
                    index={index}
                    key={artistList[index].id}
                  />
                ))}
            </div>
          </div>
          <div className="browse-display-section">
            <div className="browse-display-header">
              <div className="browse-display-container-text">
                <h1 className="browse-display-title">Tracks</h1>
                <h3 className="browse-display-subtitle">{`Tracks matching "${searchDisplay}"`}</h3>
              </div>
              <div className="browse-display-container-buttons">
                <button
                  onClick={() => {
                    displayPrev(1, scrollPos[1].start, scrollPos[1].end, trackList);
                  }}
                  className="browse-nav-button"
                >
                  <FaRegArrowAltCircleLeft />
                </button>
                <button
                  onClick={() => {
                    displayNext(1, scrollPos[1].start, scrollPos[1].end, trackList);
                  }}
                  className="browse-nav-button"
                >
                  <FaRegArrowAltCircleRight />
                </button>
              </div>
            </div>
            <div className="spotify-item-display">
              {trackList
                .slice(scrollPos[1].start, scrollPos[1].end)
                .map((item, index) => (
                  <SpotifyItem
                    itemType={item.type}
                    item={item}
                    index={index}
                    key={trackList[index].id}
                  />
                ))}
            </div>
          </div>
          <div className="browse-display-section">
            <div className="browse-display-header">
              <div className="browse-display-container-text">
                <h1 className="browse-display-title">Albums</h1>
                <h3 className="browse-display-subtitle">{`Albums matching "${searchDisplay}"`}</h3>
              </div>
              <div className="browse-display-container-buttons">
                <button
                  onClick={() => {
                    displayPrev(2, scrollPos[2].start, scrollPos[2].end, albumList);
                  }}
                  className="browse-nav-button"
                >
                  <FaRegArrowAltCircleLeft />
                </button>
                <button
                  onClick={() => {
                    displayNext(2, scrollPos[2].start, scrollPos[2].end, albumList);
                  }}
                  className="browse-nav-button"
                >
                  <FaRegArrowAltCircleRight />
                </button>
              </div>
            </div>
            <div className="spotify-item-display">
              {albumList
                .slice(scrollPos[2].start, scrollPos[2].end)
                .map((item, index) => (
                  <SpotifyItem
                    itemType={item.type}
                    item={item}
                    index={index}
                    key={albumList[index].id}
                  />
                ))}
            </div>
          </div>
        </div>)}
      </div>
      </div>
    );
  }
}

export default Browse;