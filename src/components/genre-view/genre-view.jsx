import React from 'react'
import PropTypes from 'prop-types'

// React-bootstrap component
import { Container, Row, Col, Button, Spinner} from 'react-bootstrap'

//Custome Component 
import { MovieCard } from '../movieCard/movieCard'

const  GenreView = ({ movies, onBackClick }) => {
  return (
    <>
      <Button onClick={onBackClick}> Back </Button>
      <div>
        <pre>{movies[0].genre.name}</pre>
        <pre>{movies[0].genre.description}</pre>
      </div>
      <Container>
        <Row>
          {
            movies.map( (m, i) => (
              <Col xs={4} lg={3} key={i} className="p-2">
                <MovieCard key={m._id} movie={m} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  )
}

GenreView.propType = {
  movies: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default GenreView;