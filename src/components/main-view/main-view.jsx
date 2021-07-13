import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';


import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//export export keyword removed from here 

class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      //movies: [], movies state removed from here
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      //this.setState({
      //  user: localStorage.getItem('user')
     // });
      this.getUsers(accessToken);
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://calm-chamber-83197.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //this.setState({movies: response.data});
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  getUsers(token) {
    axios.get('https://calm-chamber-83197.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUsers(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegister(register) {
    console.log(register);
    this.setState({
      register,
    });
  }

  render() {
   let { movies } = this.props;
   let { user } = this.state;
    
    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies}/>
            //movies.map(m => (<Col md={3} key={m._id}><MovieCard movie={m} /></Col>))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView movies={movies} director={movies.find(m => m.Title === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/users/:Username" render={({ match, history }) => {
            if (!user) return
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Container>
                <Row>
                  <Col className="p-0">
                    <NavView user={user} />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                <Col md={8}>
              <ProfileView user={user}  onBackClick={() => history.goBack()} />
            </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col md={10}>
                    <FavoritesView user={user} movies={movies} />
                  </Col>
                </Row>
              </Container>
            )
            
          }
          } />

          

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView movies={movies} genre={movies.find(m => m.Title == match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}
export default connect (mapStateToProps, {setMovies} ) (MainView);