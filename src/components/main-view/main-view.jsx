import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import {LoginView} from '../login-view/login-view';
import {RegistrarionView} from '../registration-view/registration-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super(); // refers to OOP, means call the constructor of the parent class, in this case 'React.Component'
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
        };
    }

    componentDidMount(){
        axios.get('https://calm-chamber-83197.herokuapp.com/movies')
          .then(response => {
            this.setState({
              movies: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    render() {
        const {movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

        if (movies.length === 0) return <div className="main-view" />;

       return (
  <div className="main-view">
    {selectedMovie
      ? (
        <Row>
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        </Row>
      )
      : movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
      ))
    }
  </div>
);
    }
}
export default MainView;