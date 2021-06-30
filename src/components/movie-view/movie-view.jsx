import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
        <div className="main-view">
          {selectedMovie
            ? (
              <Row className="justify-content-md-center">
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
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

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }
}