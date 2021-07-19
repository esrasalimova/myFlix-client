import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';

import { NavView } from '../nav-view/nav-view';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';

import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import  ProfileView  from '../profile-view/profile-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

 

class MainView extends React.Component {

  constructor() {
    super();
    
    this.state = {
      
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      
      this.getUsers(accessToken);
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://calm-chamber-83197.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.error;
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  getUsers(token) {
    const user = localStorage.getItem("user")
    axios.get('https://calm-chamber-83197.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        
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
        <Container className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Container>
            <Row>
              <Col className="p-0">
                <NavView user={user} />
              </Col>
            </Row>
            <Row>
            
              {<MoviesList movies={movies}/>}
             
            </Row>
        </Container>
            
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

          <Route path="/users/:Username" render={({ history }) => {
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
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}
export default connect (mapStateToProps, {setMovies} ) (MainView);