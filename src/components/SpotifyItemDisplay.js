import React, { useState, useEffect } from "react";
import { useData } from "../context/Context";
import { RxCross2 } from "react-icons/rx";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaSpotify,
} from "react-icons/fa";
import axios from "axios";
import SpotifyTrackItem from "./SpotifyTrackItem";
import SpotifyItem from "./SpotifyItem";

function SpotifyItemDisplay() {
  const {
    token,
    showDetails,
    setShowDetails,
    itemDetails,
  } = useData();

  const [albumTracks, setAlbumTracks] = useState([]);
  const [artistGenres, setArtistGenres] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [scrollPos, setScrollPos] = useState([{ start: 0, end: 6 }]);
  // const [trackArtists, setTrackArtists] = useState("");
  const [trackAudioFeatures, setTrackAudioFeatures] = useState({});

  const trackKeys = [
    "C",
    "C♯/D♭",
    "D",
    "D♯/E♭",
    "E",
    "F",
    "F♯/G♭",
    "G",
    "G♯/A♭",
    "A",
    "A♯/B♭",
    "B",
  ];

  const trackTimeSignatures = ["3/4", "4/4", "5/4", "6/4 or 6/8", "7/4 or 7/8"];

  const trackAudioFeaturesBars = trackAudioFeatures
    ? [
        { label: "Danceability", stats: trackAudioFeatures.danceability * 100 },
        { label: "Loudness", stats: (trackAudioFeatures.loudness / -60) * 100 },
        { label: "Acousticness", stats: trackAudioFeatures.acousticness * 100 },
        { label: "Liveness", stats: trackAudioFeatures.liveness * 100 },
        { label: "Energy", stats: trackAudioFeatures.energy * 100 },
        { label: "Speechiness", stats: trackAudioFeatures.speechiness * 100 },
        {
          label: "Instrumentalness",
          stats: trackAudioFeatures.instrumentalness * 100,
        },
        { label: "Valence", stats: trackAudioFeatures.valence * 100 },
      ]
    : [];

  

//   const getAlbumTracks = () => {
//     axios
//       .get(
//         `https://api.spotify.com/v1/albums/${itemDetails.id}/tracks
// `,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: {
//             limit: 50,
//           },
//         }
//       )
//       .then((resp) => {
//         setAlbumTracks(resp.data.items);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const getTrackAudioFeatures = () => {
//     axios
//       .get(`https://api.spotify.com/v1/audio-features/${itemDetails.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((resp) => {
//         console.log("audio features", resp.data);
//         setTrackAudioFeatures(resp.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const getArtistTopTracks = () => {
//     axios
//       .get(`https://api.spotify.com/v1/artists/${itemDetails.id}/top-tracks`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           limit: 10,
//         },
//       })
//       .then((resp) => {
//         console.log(resp.data.tracks);
//         setTopTracks(resp.data.tracks);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const getArtistTopAlbums = () => {
//     axios
//       .get(`https://api.spotify.com/v1/artists/${itemDetails.id}/albums`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           limit: 49,
//         },
//       })
//       .then((resp) => {
//         console.log(resp.data.items);
//         setTopAlbums(resp.data.items);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const getRelatedArtists = () => {
//     axios
//       .get(
//         `https://api.spotify.com/v1/artists/${itemDetails.id}/related-artists`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: {
//             limit: 49,
//           },
//         }
//       )
//       .then((resp) => {
//         console.log(resp.data);
//         setRelatedArtists(resp.data.artists);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

  const displayNext = (index, startPos, endPos) => {
    let newPos = [...scrollPos];
    newPos[index] = { start: startPos + 6, end: endPos + 6 };
    if (newPos[index].end > Math.ceil(topAlbums.length / 6) * 6) {
      newPos[index] = { start: 0, end: 6 };
      setScrollPos(newPos);
    } else {
      setScrollPos(newPos);
    }
    console.log(scrollPos);
  };

  const displayPrev = (index, startPos, endPos) => {
    let newPos = [...scrollPos];
    newPos[index] = { start: startPos - 6, end: endPos - 6 };
    if (newPos[index].start < 0) {
      newPos[index] = {
        start: Math.ceil(topAlbums.length / 6) * 6 - 6,
        end: Math.ceil(topAlbums.length / 6) * 6,
      };
      setScrollPos(newPos);
    } else {
      setScrollPos(newPos);
    }
    console.log(scrollPos);
  };

  useEffect(() => {
    const getAlbumTracks = () => {
      axios
        .get(
          `https://api.spotify.com/v1/albums/${itemDetails.id}/tracks
  `,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              limit: 50,
            },
          }
        )
        .then((resp) => {
          setAlbumTracks(resp.data.items);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    const getTrackAudioFeatures = () => {
      axios
        .get(`https://api.spotify.com/v1/audio-features/${itemDetails.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          console.log("audio features", resp.data);
          setTrackAudioFeatures(resp.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    const getArtistTopTracks = () => {
      axios
        .get(`https://api.spotify.com/v1/artists/${itemDetails.id}/top-tracks`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit: 10,
          },
        })
        .then((resp) => {
          console.log(resp.data.tracks);
          setTopTracks(resp.data.tracks);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    const getArtistTopAlbums = () => {
      axios
        .get(`https://api.spotify.com/v1/artists/${itemDetails.id}/albums`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit: 49,
          },
        })
        .then((resp) => {
          console.log(resp.data.items);
          setTopAlbums(resp.data.items);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    const getRelatedArtists = () => {
      axios
        .get(
          `https://api.spotify.com/v1/artists/${itemDetails.id}/related-artists`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              limit: 49,
            },
          }
        )
        .then((resp) => {
          console.log(resp.data);
          setRelatedArtists(resp.data.artists);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    if (itemDetails.type === "artist") {
      setArtistGenres(itemDetails.genres);
      getArtistTopTracks();
      getArtistTopAlbums();
      getRelatedArtists();
      setScrollPos([{ start: 0, end: 6 }]);
    } else if (itemDetails.type === "track") {
      getTrackAudioFeatures();
      console.log(trackAudioFeaturesBars);
    } else if (itemDetails.type === "album") {
      getAlbumTracks();
    }
  }, [itemDetails]);

  if (showDetails === true) {
    if (itemDetails.type === "artist") {
      return (
        <div className="spotify-item-detail-screen">
          <div className="spotify-item-detail-container spotify-item-detail-container-artist">
            <button
              className="spotify-item-exit-button"
              onClick={() => {
                setShowDetails(false);
                setScrollPos([{ start: 0, end: 6 }]);
              }}
            >
              <RxCross2 />
            </button>
            <div className="artist-spotify-item-detail-section1">
              <div className="artist-overview">
                {itemDetails.images && itemDetails.images.length > 0 ? (
                  <img
                    src={itemDetails.images[0].url}
                    alt={itemDetails.name}
                    className="artist-pfp spotify-item-detail-image"
                  />
                ) : (
                  <p className="spotify-item-detail-image artist-pfp">
                    No image available
                  </p>
                )}
                <div className="spotify-item-detail-header no-margin">
                  <h1 className="artist-name no-margin">{itemDetails.name}</h1>
                  <h3 className="artist-follower-count no-margin">{`${itemDetails.followers.total.toLocaleString()} followers`}</h3>
                  <h4 className="artist-popularity no-margin">{`${itemDetails.popularity}/100 popularity`}</h4>
                  <a
                    href={itemDetails.external_urls.spotify}
                    target="_blank"
                    className="spotify-redirect"
                  >
                    <FaSpotify />
                  </a>
                </div>
              </div>
              <div className="artist-genre-container">
                {artistGenres.map((item) => (
                  <p className="artist-genre-item">{item}</p>
                ))}
              </div>
              <div className="top-songs-container">
                {topTracks.map((item, index) => (
                  <SpotifyTrackItem item={item} index={index} />
                ))}
              </div>
            </div>
            <div className="artist-spotify-item-detail-section2">
              <div className="artist-top-albums">
                <div className="artist-details-header">
                  <div className="artist-details-header-title">
                    <h1 className="no-margin artist-details-title">
                      Top albums
                    </h1>
                    <h3 className="no-margin artist-details-subtitle">{`${itemDetails.name}'s top albums`}</h3>
                  </div>
                  <div className="browse-display-container-buttons">
                    <button
                      onClick={() => {
                        displayPrev(0, scrollPos[0].start, scrollPos[0].end);
                      }}
                      className="browse-nav-button"
                    >
                      <FaRegArrowAltCircleLeft />
                    </button>
                    <button
                      onClick={() => {
                        displayNext(0, scrollPos[0].start, scrollPos[0].end);
                      }}
                      className="browse-nav-button"
                    >
                      <FaRegArrowAltCircleRight />
                    </button>
                  </div>
                </div>
                <div className="artist-albums-display">
                  {topAlbums
                    .slice(scrollPos[0].start, scrollPos[0].end)
                    .map((item, index) => (
                      <SpotifyItem
                        itemType={item.type}
                        item={item}
                        index={index}
                        key={topAlbums[index].id}
                        reDesign="artist-top-albums-items"
                      />
                    ))}
                </div>
              </div>
              <div className="artist-related">
                <div className="artist-details-header">
                  <div className="artist-details-header-title">
                    <h1 className="no-margin artist-details-title">
                      Related artists
                    </h1>
                    <h3 className="no-margin artist-details-subtitle">{`${itemDetails.name}'s fans might like`}</h3>
                  </div>
                </div>
                <div className="artist-related-display-grid">
                  {relatedArtists.map((item, index) => (
                    <SpotifyItem
                      itemType={item.type}
                      item={item}
                      index={index}
                      key={relatedArtists[index].id}
                      reDesign="artist-related-item"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (itemDetails.type === "track") {
      return (
        <div className="spotify-item-detail-screen">
          <div className="spotify-item-detail-container">
            <button
              className="spotify-item-exit-button"
              onClick={() => {
                setShowDetails(false);
              }}
            >
              <RxCross2 />
            </button>
            <div className="spotify-display-track-details">
              <div className="spotify-track-details-header">
                <a
                  href={itemDetails.external_urls.spotify}
                  target="_blank"
                  className="spotify-track-link spotify-redirect"
                >
                  <FaSpotify />
                </a>
                {itemDetails.album.images &&
                itemDetails.album.images.length > 0 ? (
                  <img
                    src={itemDetails.album.images[0].url}
                    alt={itemDetails.name}
                    className="spotify-track-details-image"
                  />
                ) : (
                  <p className="spotify-track-details-image">
                    No image available
                  </p>
                )}
                <div className="spotify-track-details-header-title">
                  <div className="spotify-item-artist-extra-details-container">
                {itemDetails.artists.map((item, index)=> <>
                <SpotifyItem item={item} itemType={item.type} reDesign={"spotify-item-artist-extra-details"}/>
                {index < itemDetails.artists.length - 1 ? <h3 className="comma">,</h3> : ""}
                </>
              )}</div>
                
                  {itemDetails.name.length > 32 ? (
                    <h1>{`${itemDetails.name.slice(0, 32)}...`}</h1>
                  ) : (
                    <h1>{itemDetails.name}</h1>
                  )}
                </div>
              </div>
              <div className="spotify-track-details-audio-features">
                <div className="spotify-track-details-title">
                  <h1>Audio features</h1>
                  <h3>This track's audio features</h3>
                </div>
                <div className="spotify-track-details-blocks-container">
                  <div className="spotify-track-details-block">
                    <h1>
                      {trackAudioFeatures && trackAudioFeatures.loudness
                        ? trackAudioFeatures.loudness.toFixed(1)
                        : "N/A"}
                    </h1>
                    <p>Loudness</p>
                  </div>
                  <div className="spotify-track-details-block">
                    {trackAudioFeatures.key === -1 ? (
                      <h1>None</h1>
                    ) : (
                      <h1>{trackKeys[trackAudioFeatures.key]}</h1>
                    )}
                    <p>Key</p>
                  </div>
                  <div className="spotify-track-details-block">
                    {trackAudioFeatures.mode === 0 ? (
                      <h1>Minor</h1>
                    ) : (
                      <h1>Major</h1>
                    )}
                    <p>Mode</p>
                  </div>
                  <div className="spotify-track-details-block">
                    <h1>
                      {
                        trackTimeSignatures[
                          trackAudioFeatures.time_signature - 3
                        ]
                      }
                    </h1>
                    <p>Time signature</p>
                  </div>
                  <div className="spotify-track-details-block">
                    <h1>
                      {trackAudioFeatures && trackAudioFeatures.tempo
                        ? trackAudioFeatures.tempo.toFixed(1)
                        : "N/A"}
                    </h1>
                    <p>Tempo</p>
                  </div>
                </div>
                <div className="spotify-track-details-bars-container">
                  {trackAudioFeaturesBars.map((item) => (
                    <div className="spotify-track-details-bar-item">
                      <h3>{item.label}</h3>
                      <div className="spotify-track-details-bar">
                        <div
                          className="spotify-track-details-bar-body"
                          style={{ width: `${item.stats}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (itemDetails.type === "album") {
      return (
        <div className="spotify-item-detail-screen">
          <div className="spotify-item-detail-container spotify-item-detail-container-album">
            <button
              className="spotify-item-exit-button"
              onClick={() => {
                setShowDetails(false);
              }}
            >
              <RxCross2 />
            </button>
            <div className="spotify-item-detail-album-header">
              {itemDetails.images && itemDetails.images.length > 0 ? (
                <img
                  src={itemDetails.images[0].url}
                  alt={itemDetails.name}
                  className="spotify-item-detail-album-image"
                />
              ) : (
                <p className="spotify-item-detail-album-image">
                  No image available
                </p>
              )}
              <div className="spotify-item-detail-album-title">
                <h3 className="spotify-item-detail-album-type">{itemDetails.type.replace(itemDetails.type.charAt(0), itemDetails.type.charAt(0).toUpperCase())}</h3>
                <h1>{itemDetails.name}</h1>
                <div className="spotify-item-album-extra-details-container">
                <div className="spotify-item-artist-extra-details-container">
                {itemDetails.artists.map((item, index)=> <>
                <SpotifyItem item={item} itemType={item.type} reDesign={"spotify-item-artist-extra-details"}/>
                {index < itemDetails.artists.length - 1 ? <h3 className="comma">,</h3> : ""}
                </>
              )}</div>
                <h3 className="spotify-item-album-extra-details">{`• ${itemDetails.release_date.slice(0,4)} • ${albumTracks.length} songs`}</h3>
                </div>
                
              </div>
            </div>
            <div className="spotify-item-detail-album-body">
              <div className="spotify-item-detail-album-subtitle">
                <h1>Album content</h1>
                <h3>This album's tracklist</h3>
              </div>
              <div className="spotify-item-detail-album-track-list-container">
              <div className="spotify-item-detail-album-track-list">
                {albumTracks.map((item, index) => (
                  <SpotifyTrackItem item={item} index={index} redesign={"album-track-item-image"} className="album-track-grid-item"/>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return;
  }
}

export default SpotifyItemDisplay;
