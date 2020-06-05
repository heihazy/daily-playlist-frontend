import SpotifyWebApi from "spotify-web-api-js";
import React, { Component } from "react";
import Axios from "axios";
import "./Playlist.css";
const spotifyApi = new SpotifyWebApi();

class Playlist extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      playlistName: "",
      link: null,
      // genre: "",
      mygenre: "",
    };
    // this.getGenre = this.getGenre.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:3001/Genre").then((res) => {
      const mygenre = res.data[res.data.length - 1].genre;
      this.setState({ mygenre });
    });
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getCall() {
    console.log(this.state.mygenre[0]);
    if (this.state.mygenre[0] === "Pop/Ballad") {
      return this.getPop();
    }
    if (this.state.mygenre[0] === "Jazz") {
      return this.getJazz();
    }
    if (this.state.mygenre[0] === "Metal") {
      return this.getMetal();
    }
    if (this.state.mygenre[0] === "Progressive Rock") {
      return this.getRock();
    }
    if (this.state.mygenre[0] === "Mixed") {
      return this.getMix();
    }
  }

  getJazz() {
    spotifyApi.getPlaylist("7pBWAhZGgqo3q1w672FoKl").then(
      (response) => {
        console.log(response);
        const link = response.external_urls.spotify;
        const playlistName = response.name;
        console.log(link);

        this.setState({
          playlistName: playlistName,
          link: link,
        });
      }

      // function (data) {
      //   console.log(data.playlists.items[0].uri);
      // },
      // function (err) {
      //   console.error(err);
      // }
    );
  }
  getPop() {
    spotifyApi.getPlaylist("37i9dQZF1DXaPCIWxzZwR1").then((response) => {
      console.log(response);
      const link = response.external_urls.spotify;
      const playlistName = response.name;
      console.log(link);

      this.setState({
        playlistName: playlistName,
        link: link,
      });
    });
  }
  getRock() {
    spotifyApi.getPlaylist("37i9dQZF1DXcF6B6QPhFDv").then((response) => {
      console.log(response);
      const link = response.external_urls.spotify;
      const playlistName = response.name;
      console.log(link);

      this.setState({
        playlistName: playlistName,
        link: link,
      });
    });
  }
  getMetal() {
    spotifyApi.getPlaylist("37i9dQZF1DWTcqUzwhNmKv").then((response) => {
      console.log(response);
      const link = response.external_urls.spotify;
      const playlistName = response.name;
      console.log(link);

      this.setState({
        playlistName: playlistName,
        link: link,
      });
    });
  }
  getMix() {
    spotifyApi.getPlaylist("37i9dQZF1DXdxcBWuJkbcy").then((response) => {
      console.log(response);
      const link = response.external_urls.spotify;
      const playlistName = response.name;
      console.log(link);

      this.setState({
        playlistName: playlistName,
        link: link,
      });
    });
  }
  // getGenre(e) {
  //   this.setState({
  //     genre: e.target.value,
  //   });
  //   console.log(this.state.genre);
  // }

  render() {
    return (
      <div className="playlist-bg">
        <div className="playlist-render">
          {/* <h3>What was the result you got from our quiz?</h3>
        <label>
          Genre:
          <select value={this.state.genre} onChange={this.getGenre} required>
            <option value="Jazz">Jazz</option>
            <option value="Rock">Progressive Rock</option>
            <option value="Metal">Metal</option>
            <option value="Pop">Pop/Ballad</option>
          </select>
        </label> */}
          <p>Music genre suits your mood today is {this.state.mygenre} </p>

          <input
            class="btn btn-success"
            type="button"
            value="Get your playlist"
            onClick={() => this.getCall()}
          ></input>
          <div className="playlist-result">
            Your playlist of the day is: {this.state.playlistName}
          </div>

          <a href={this.state.link} target="blank_" class="btn btn-success">
            Open Spotify and listen!
          </a>
          <a href="/quiz" class="btn btn-success">
            Start your new playlist of the day!
          </a>
        </div>
      </div>
    );
  }
}
export default Playlist;
