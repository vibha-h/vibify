//import { useNavigate } from 'react-router-dom';
//import SpotifyWebApi from 'spotify-web-api-js';


//const spotifyApi = new SpotifyWebApi();
const redirectUri = 'http://localhost:3000/callback'; //URL where the user will be redirected after login


const SpotifyLogin = () => {
 
//const history = useNavigate(); //this is the hook that will be used to redirect the user to the home page after login
 const handleLoginClick = () => {
    // Define the Spotify authorization URL
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const clientId = 'fd2cf4a4901d4e53a90b36bfa3ef2048'; // Replace with your Spotify Client ID
    const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];


   // Construct the authorization URL
    const redirectUriEncoded = encodeURIComponent(redirectUri);
    const scopeString = encodeURIComponent(scopes.join(' '));


   const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUriEncoded}&scope=${scopeString}&response_type=token&show_dialog=true`;


   // Redirect the user to Spotify login
    window.location.href = authUrl;
  };


 return (
    <div className='container'>
      <h2 className='header'>Welcome</h2>
      <button onClick={handleLoginClick}>Login with Spotify</button>
    </div>
  );
};


export default SpotifyLogin;