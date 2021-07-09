import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import "./movie-view.scss"
import axios from "axios";

export class MovieView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    addFavorite(movie) {
        const token = localStorage.getItem("token");
        const url = "https://calm-chamber-83197.herokuapp.com/users" + localStorage.getItem("user") + movie._id;

        axios.post(url, "", {
            headers: {Authorization: 'Bearer ${token}'},
        })
        .then((response) => {
            console.log(response);
                alert(movie.Title + "has been added to favorites");
            });
        }
  


  render() {
    const { movie, onBackClick } = this.props;
    
    return (
      <div className="movie-view">
          <div>
              <Button variant="warning" onClick={() => {this.addFavorite(movie);}}>Favorite</Button>
          </div>
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="value">{movie.Title}</span>
          <span className="value">({movie.Year})</span>
        </div>
        <div className="movie-description">
            <span className="label">Description:</span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
            <span className="label">Genre</span>
            <span className="link">
                <Link to={`/genres/${movie.Title}`}>
                <Button variant="link">Genre</Button>
            </Link>
            </span>
        </div>
        <div className="movie-director">
            <span className="label">Directed by: </span>
            <span className="link">
                <Link to={`/directors/${movie.Title}`}>
                <Button variant="link">Director</Button>
            </Link>
         </span>
        </div>
        <button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back to list
        </button>
      </div>
    );
  }
}

MovieView.propTypes = {
    movieData2: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };