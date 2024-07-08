
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './styles.css';
const spotifyApi = new SpotifyWebApi();
const Callback = () => {
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState(null);
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the access token and error from the URL
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');
        const error = params.get('error');
    
        // Log the access token and error
        console.log('Access Token:', accessToken);
        console.log('Error:', error);
    
        if (accessToken !== null) {
          // Set the access token for further API calls
          localStorage.setItem('token', accessToken);
          spotifyApi.setAccessToken(accessToken);
    
          // Use the access token to get the user's profile information
          const userResponse = await spotifyApi.getMe();
          const userDisplayName = userResponse.display_name;
    
          // Set the display name to be rendered in the component
          setDisplayName(userDisplayName);
        } else{
          window.location = '/login';
        }
        
      } catch (error) {
        console.error('Error during callback:', error);
        // Handle the error or redirect to an error page
        window.location = '/error';
      } finally {
        setLoading(false);
      }
    };
    handleCallback();
  }, []);
  const [topTracks, setTopTracks] = useState([]);
  const getTopTracks = async (time_range= 'short_term') => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log the token
      var response = 'https://api.spotify.com/v1/me/top/tracks?time_range='+time_range+'&limit=10'
      response = await fetch(response, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('Response:', data); // Log the entire response object
      if (data.items) {
        setTopTracks(data.items);
      } else {
        console.error('Error: items property not found in response', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
//   const [topArtists, setTopArtists] = useState([]);
// const getTopArtists = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     console.log('Token:', token); // Log the token
//     const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     const data = await response.json();
//     console.log('Response:', data); // Log the entire response object
//     if (data.items) {
//       setTopArtists(data.items);
//     } else {
//       console.error('Error: items property not found in response', data);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

const [topArtists, setTopArtists] = useState([]);
  const getTopArtists = async (time_range= 'short_term') => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log the token
      var response = 'https://api.spotify.com/v1/me/top/artists?time_range='+time_range+'&limit=10'
      response = await fetch(response, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('Response:', data); // Log the entire response object
      if (data.items) {
        setTopArtists(data.items);
      } else {
        console.error('Error: items property not found in response', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // Render loading or other UI elements while the callback is being processed

  const [topTracksClicked, setTopTracksClicked] = useState(false);
  const [topArtistsClicked, setTopArtistsClicked] = useState(false);

  return (
    <div className="container">
      {loading ? (
        <h2 className="loading">...</h2>
      ) : (
        <>
          <h2 className="header">Welcome, {displayName}!</h2>
          <button className="rounded-button" onClick={() => {getTopTracks(); setTopTracksClicked(true); setTopArtists([]); setTopArtistsClicked(false);}}>
            Top Tracks
          </button>
          <button className="rounded-button" onClick={() => {getTopArtists(); setTopArtistsClicked(true); setTopTracks([]); setTopTracksClicked(false);}}>
            Top Artists
          </button>
          {topTracksClicked && topTracks.length > 0 && (
            <>
              <h2 className="header">{displayName}'s Top Tracks</h2>
              {topTracks.map((track, index) => (
                <div className="top-track-list" key={index}>
                  <p>{index + 1}. {track.name} by {track.artists[0].name}</p>
                </div>
              ))}
            </>
          )}
          {topArtistsClicked && topArtists.length > 0 && (
            <>
              <h2 className="header">{displayName}'s Top Artists</h2>
              {topArtists.map((artist, index) => (
                <div className="top-artist-list" key={index}>
                  <p>{index + 1}. {artist.name}</p>
                </div>
              ))}
            </>
          )}
          {topTracksClicked && topTracks.length === 0 && (
            <p>Not enough data, keep listening to get your top tracks!</p>
          )}
          {topArtistsClicked && topArtists.length === 0 && (
            <p>Not enough data, keep listening to get your top artists!</p>
          )}
        </>
      )}
    </div>
  );
};
export default Callback;
