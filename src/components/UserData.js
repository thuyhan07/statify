import React, { useState, useEffect } from "react";
import axios from "axios";
import { useData } from "../context/Context";
import { CiLock } from "react-icons/ci";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaSpotify,
} from "react-icons/fa";
import SpotifyItemDisplay from "./SpotifyItemDisplay";
import SpotifyItem from "./SpotifyItem";
import SpotifyTrackItem from "./SpotifyTrackItem";

function UserData() {
  const { token } = useData();

  const [timeRange, setTimeRange] = useState("short_term");
  const [timeRangeDisplay, setTimeRangeDisplay] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [userTopGenres, setUserTopGenres] = useState([]);
  const [userTopArtists, setUserTopArtists] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState([]);
  const [userTopAlbums, setUserTopAlbums] = useState([]);
  const [userRecentlyPlayed, setUserRecentlyPlayed] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [userTrackLog, setUserTrackLog] = useState([]);

  const [scrollPos, setScrollPos] = useState([
    { start: 0, end: 8 },
    { start: 0, end: 8 },
    { start: 0, end: 8 },
  ]);

  // const displayTimeRange = () => {
  //   if (timeRange === "short_term") {
  //     setTimeRangeDisplay("from the past 4 weeks");
  //   } else if (timeRange === "medium_term") {
  //     setTimeRangeDisplay("from the past 6 months");
  //   } else {
  //     setTimeRangeDisplay("from the past year");
  //   }
  // };

  // const getUserProfile = () => {
  //   axios
  //     .get("https://api.spotify.com/v1/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((resp) => {
  //       console.log(resp.data);
  //       setUserProfile(resp.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  // const getUserTopArtists = () => {
  //   axios
  //     .get("https://api.spotify.com/v1/me/top/artists", {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: {
  //         time_range: timeRange,
  //         limit: 50,
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp.data);
  //       setUserTopArtists(resp.data.items);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  // const getUserTopTracks = () => {
  //   axios
  //     .get("https://api.spotify.com/v1/me/top/tracks", {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: {
  //         time_range: timeRange,
  //         limit: 50,
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp.data);
  //       setUserTopTracks(resp.data.items);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  const displayNext = (index, startPos, endPos, list) => {
    let newPos = [...scrollPos];
    newPos[index] = { start: startPos + 8, end: endPos + 8 };
    if (newPos[index].end > Math.ceil(list.length / 8) * 8) {
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
      newPos[index] = {
        start: Math.ceil(list.length / 8) * 8 - 8,
        end: Math.ceil(list.length / 8) * 8,
      };
      setScrollPos(newPos);
    } else {
      setScrollPos(newPos);
    }
    console.log(scrollPos);
  };

  // const getUserTopGenres = () => {
  //   let genresList = [];
  //   let newGenresList = userTopArtists
  //     .map((artist) => artist.genres)
  //     .forEach((genres) => {
  //       genresList.push(...genres);
  //     });
  //   genresList = genresList.sort();
  //   if (genresList.length > 0) {
  //     let i;
  //     let l;
  //     let counter = 1;
  //     let genres = [];
  //     let genresCount = [];
  //     for (i = 0; i < genresList.length; i++) {
  //       if (genresList[i] === genresList[i + 1]) {
  //         counter = counter + 1;
  //       } else {
  //         genresCount.push(counter);
  //         genres.push(genresList[i]);
  //         counter = 1;
  //       }
  //     }
  //     let completeGenresArray = [];
  //     for (l = 0; l < genres.length; l++) {
  //       completeGenresArray.push({ genre: genres[l], count: genresCount[l] });
  //     }
  //     completeGenresArray = completeGenresArray.sort(
  //       (a, b) => b.count - a.count
  //     );
  //     setUserTopGenres(completeGenresArray.map((item) => item.genre));
  //   }
  // };

  // const getUserTopAlbums = () => {
  //   let albumsList = userTopTracks
  //     .map((track) => track.album)
  //     .sort((a, b) => a.name.localeCompare(b.name));
  //   console.log("albumsList");
  //   console.log(albumsList);
  //   if (albumsList.length > 0) {
  //     let i;
  //     let l;
  //     let counter = 1;
  //     let albums = [];
  //     let albumsCount = [];
  //     for (i = 0; i < albumsList.length - 1; i++) {
  //       if (albumsList[i].id === albumsList[i + 1].id) {
  //         counter = counter + 1;
  //       } else {
  //         albumsCount.push(counter);
  //         albums.push(albumsList[i]);
  //         counter = 1;
  //       }
  //     }
  //     let completeAlbumsArray = [];
  //     for (l = 0; l < albums.length; l++) {
  //       completeAlbumsArray.push({ album: albums[l], count: albumsCount[l] });
  //     }
  //     completeAlbumsArray = completeAlbumsArray.sort(
  //       (a, b) => b.count - a.count
  //     );
  //     console.log(albums);
  //     console.log(albumsCount);
  //     console.log(completeAlbumsArray.map((item) => item.album));
  //     setUserTopAlbums(completeAlbumsArray.map((item) => item.album));
  //   }
  // };

  // const getUserRecentlyPlayed = () => {
  //   axios
  //     .get("https://api.spotify.com/v1/me/player/recently-played", {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: {
  //         limit: 50,
  //         before: currentTime,
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp.data.items);
  //       setUserRecentlyPlayed(resp.data.items);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  // const getUserHistoryByDate = () => {
  //   const groupedData = userRecentlyPlayed.reduce((acc, item) => {
  //     const date = item.played_at.split("T")[0];
  //     const existingGroup = acc.find((group) => group.date === date);

  //     if (existingGroup) {
  //       existingGroup.content.push(item);
  //     } else {
  //       acc.push({ date, content: [item] });
  //     }
  //     return acc; 
  //   }, []);
  //   console.log(groupedData);
  //   setUserTrackLog(groupedData);
  // };

  const dateConverter = (date) => {
    let day = Number(date.slice(date.length - 2, date.length));
    let month = Number(date.slice(5, 7));
    let year = Number(date.slice(0, 4));

    let displayDate;

    let last2digits = day % 100;
    let lastdigit = day % 10;
    if (last2digits === 11 || last2digits === 12 || last2digits === 13) {
      day = day + "th";
    } else if (lastdigit === 1) {
      day = day + "st";
    } else if (lastdigit === 2) {
      day = day + "nd";
    } else if (lastdigit === 3) {
      day = day + "rd";
    } else {
      day = day + "th";
    }
    console.log(day);
    switch (month) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
      default:
        month = "December";
    }
    displayDate = month + " " + day + ", " + year;
    console.log(displayDate);
    return displayDate;
  };

  useEffect(() => {
    const displayTimeRange = () => {
      if (timeRange === "short_term") {
        setTimeRangeDisplay("from the past 4 weeks");
      } else if (timeRange === "medium_term") {
        setTimeRangeDisplay("from the past 6 months");
      } else {
        setTimeRangeDisplay("from the past year");
      }
    };
  
    const getUserProfile = () => {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          console.log(resp.data);
          setUserProfile(resp.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    const getUserTopArtists = () => {
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            time_range: timeRange,
            limit: 50,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          setUserTopArtists(resp.data.items);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    const getUserTopTracks = () => {
      axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            time_range: timeRange,
            limit: 50,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          setUserTopTracks(resp.data.items);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getUserProfile();
    getUserTopArtists();
    getUserTopTracks();
    displayTimeRange();
    setCurrentTime(Date.now());
    setScrollPos([
      { start: 0, end: 8 },
      { start: 0, end: 8 },
      { start: 0, end: 8 },
    ]);
  }, [timeRange, token]);

  useEffect(() => {
    const getUserRecentlyPlayed = () => {
      axios
        .get("https://api.spotify.com/v1/me/player/recently-played", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit: 50,
            before: currentTime,
          },
        })
        .then((resp) => {
          console.log(resp.data.items);
          setUserRecentlyPlayed(resp.data.items);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getUserRecentlyPlayed();
  }, [currentTime, token]);

  useEffect(() => {
    const getUserHistoryByDate = () => {
      const groupedData = userRecentlyPlayed.reduce((acc, item) => {
        const date = item.played_at.split("T")[0];
        const existingGroup = acc.find((group) => group.date === date);
  
        if (existingGroup) {
          existingGroup.content.push(item);
        } else {
          acc.push({ date, content: [item] });
        }
        return acc; 
      }, []);
      console.log(groupedData);
      setUserTrackLog(groupedData);
    };
    getUserHistoryByDate();
  }, [userRecentlyPlayed, token]);

  useEffect(() => {
    const getUserTopGenres = () => {
      let genresList = [];
      let newGenresList = userTopArtists
      .map((artist) => artist.genres)
      newGenresList.forEach((genres) => {
        genresList.push(...genres);
      });
      genresList = genresList.sort();
      if (genresList.length > 0) {
        let i;
        let l;
        let counter = 1;
        let genres = [];
        let genresCount = [];
        for (i = 0; i < genresList.length; i++) {
          if (genresList[i] === genresList[i + 1]) {
            counter = counter + 1;
          } else {
            genresCount.push(counter);
            genres.push(genresList[i]);
            counter = 1;
          }
        }
        let completeGenresArray = [];
        for (l = 0; l < genres.length; l++) {
          completeGenresArray.push({ genre: genres[l], count: genresCount[l] });
        }
        completeGenresArray = completeGenresArray.sort(
          (a, b) => b.count - a.count
        );
        setUserTopGenres(completeGenresArray.map((item) => item.genre));
      }
    };
    getUserTopGenres();
  }, [userTopArtists]);

  useEffect(() => {
    const getUserTopAlbums = () => {
      let albumsList = userTopTracks
        .map((track) => track.album)
        .sort((a, b) => a.name.localeCompare(b.name));
      console.log("albumsList");
      console.log(albumsList);
      if (albumsList.length > 0) {
        let i;
        let l;
        let counter = 1;
        let albums = [];
        let albumsCount = [];
        for (i = 0; i < albumsList.length - 1; i++) {
          if (albumsList[i].id === albumsList[i + 1].id) {
            counter = counter + 1;
          } else {
            albumsCount.push(counter);
            albums.push(albumsList[i]);
            counter = 1;
          }
        }
        let completeAlbumsArray = [];
        for (l = 0; l < albums.length; l++) {
          completeAlbumsArray.push({ album: albums[l], count: albumsCount[l] });
        }
        completeAlbumsArray = completeAlbumsArray.sort(
          (a, b) => b.count - a.count
        );
        console.log(albums);
        console.log(albumsCount);
        console.log(completeAlbumsArray.map((item) => item.album));
        setUserTopAlbums(completeAlbumsArray.map((item) => item.album));
      }
    };
    getUserTopAlbums();
  }, [userTopTracks, token]);

  if (!token) {
    return (
      <div className="error-page">
        <CiLock className="error-page-icon" />
        <p className="error-page-text">Unable to access page. Please login.</p>
      </div>
    );
  } else {
    if (userProfile) {
      return (
        <div className="user-profile pages">
          <div className="user-profile-page">
            <div className="user-profile-header">
              {userProfile.images && userProfile.images.length > 0 ? (
                <img src={userProfile.images[1].url} className="user-pfp" alt=""/>
              ) : (
                <p className="user-pfp">No image available</p>
              )}
              <div className="user-profile-header-title">
                <h1>{userProfile.display_name}</h1>
                <h3>{userProfile.followers.total} followers</h3>
                <a
                  href={userProfile.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="spotify-redirect"
                >
                  <FaSpotify />
                </a>
              </div>
            </div>
            <div className="user-top-items-section">
              <div className="user-data-time-range-section">
                <select
                  className="user-data-time-range-select"
                  onChange={(e) => {
                    e.preventDefault();
                    setTimeRange(e.target.value);
                  }}
                >
                  <option value="short_term">4 weeks</option>
                  <option value="medium_term">6 months</option>
                  <option value="long_term">1 year</option>
                </select>
              </div>
              <div className="user-top-genres-section">
                <h1 className="browse-display-title">Top Genres</h1>
                <h3 className="browse-display-subtitle">
                  {`Here are your top genres ${timeRangeDisplay}`}
                </h3>
                <div className="user-top-genres-scroll">
                  <div className="user-top-genres-container">
                    {userTopGenres.map((item) => (
                      <p className="artist-genre-item">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="browse-display">
                <SpotifyItemDisplay />
                <div className="browse-display-section">
                  <div className="browse-display-header">
                    <div className="browse-display-container-text">
                      <h1 className="browse-display-title">Top Artists</h1>
                      <h3 className="browse-display-subtitle">
                        {`Here are your top artists ${timeRangeDisplay}`}
                      </h3>
                    </div>
                    <div className="browse-display-container-buttons">
                      <button
                        onClick={() => {
                          displayPrev(
                            0,
                            scrollPos[0].start,
                            scrollPos[0].end,
                            userTopArtists
                          );
                        }}
                        className="browse-nav-button"
                      >
                        <FaRegArrowAltCircleLeft />
                      </button>
                      <button
                        onClick={() => {
                          displayNext(
                            0,
                            scrollPos[0].start,
                            scrollPos[0].end,
                            userTopArtists
                          );
                        }}
                        className="browse-nav-button"
                      >
                        <FaRegArrowAltCircleRight />
                      </button>
                    </div>
                  </div>

                  <div className="spotify-item-display">
                    {userTopArtists
                      .slice(scrollPos[0].start, scrollPos[0].end)
                      .map((item, index) => (
                        <SpotifyItem
                          itemType={item.type}
                          item={item}
                          index={userTopArtists.indexOf(item)}
                          key={userTopArtists[index].id}
                          reDesign={"add-ranking"}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <div className="browse-display">
                <SpotifyItemDisplay />
                <div className="browse-display-section">
                  <div className="browse-display-header">
                    <div className="browse-display-container-text">
                      <h1 className="browse-display-title">Top Tracks</h1>
                      <h3 className="browse-display-subtitle">
                        {`Here are your top tracks ${timeRangeDisplay}`}
                      </h3>
                    </div>
                    <div className="browse-display-container-buttons">
                      <button
                        onClick={() => {
                          displayPrev(
                            1,
                            scrollPos[1].start,
                            scrollPos[1].end,
                            userTopTracks
                          );
                        }}
                        className="browse-nav-button"
                      >
                        <FaRegArrowAltCircleLeft />
                      </button>
                      <button
                        onClick={() => {
                          displayNext(
                            1,
                            scrollPos[1].start,
                            scrollPos[1].end,
                            userTopTracks
                          );
                        }}
                        className="browse-nav-button"
                      >
                        <FaRegArrowAltCircleRight />
                      </button>
                    </div>
                  </div>
                  <div className="spotify-item-display">
                    {userTopTracks
                      .slice(scrollPos[1].start, scrollPos[1].end)
                      .map((item, index) => (
                        <SpotifyItem
                          itemType={item.type}
                          item={item}
                          index={userTopTracks.indexOf(item)}
                          key={userTopTracks[index].id}
                          reDesign={"add-ranking"}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="browse-display">
                <SpotifyItemDisplay />
                <div className="browse-display-section">
                  <div className="browse-display-header">
                    <div className="browse-display-container-text">
                      <h1 className="browse-display-title">Albums</h1>
                      <h3 className="browse-display-subtitle">{`Here are your top albums ${timeRangeDisplay}`}</h3>
                    </div>
                    <div className="browse-display-container-buttons">
                      <button
                        onClick={() => {
                          displayPrev(
                            2,
                            scrollPos[2].start,
                            scrollPos[2].end,
                            userTopAlbums
                          );
                        }}
                        className="browse-nav-button"
                      >
                        <FaRegArrowAltCircleLeft />
                      </button>
                      <button
                        onClick={() => {
                          displayNext(
                            2,
                            scrollPos[2].start,
                            scrollPos[2].end,
                            userTopAlbums
                          );
                        }}
                        className="browse-nav-button"
                      >
                        <FaRegArrowAltCircleRight />
                      </button>
                    </div>
                  </div>
                  <div className="spotify-item-display">
                    {userTopAlbums
                      .slice(scrollPos[2].start, scrollPos[2].end)
                      .map((item, index) => (
                        <SpotifyItem
                          itemType={item.type}
                          item={item}
                          index={userTopAlbums.indexOf(item)}
                          key={userTopAlbums[index].id}
                          reDesign={"add-ranking"}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="user-play-history-section">
                <div className="browse-display-container-text">
                  <h1 className="browse-display-title">Recent streams</h1>
                  <h3 className="browse-display-subtitle">
                    Here are your recently played tracks
                  </h3>
                </div>
                <div className="user-recently-played-container">
                  {userTrackLog.map((item) => (
                    <div className="user-recently-played-section">
                      <h3 className="browse-display-subtitle user-recently-played-date">
                        {dateConverter(item.date)}
                      </h3>
                      <div className="user-recently-played-list">
                        {item.content.map((item, index) => (
                          <SpotifyTrackItem
                            item={item.track}
                            index={index}
                            imageRedesign={"recently-played-track-image"}
                            titleRedesign={"recently-played-track-title"}
                            overallRedesign={"recently-played-track"}
                            currentTime={currentTime}
                            played_at={new Date(item.played_at).getTime()}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default UserData;
