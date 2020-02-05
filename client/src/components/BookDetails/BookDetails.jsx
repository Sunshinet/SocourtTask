import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row } from 'reactstrap';

const BookDetails = props => {
  console.log(props);
  let book = props.books.find(e => e.id === props.match.params.id);
  if (!book) {
    <Redirect to="/" />;
  }

  return (
    <Container>
        <Row>
        <h3> {book.title}</h3>
        </Row>
        <Row>
        <h6> {book.authors}</h6>
        </Row>
        <Row>
        <p> {book.longDescription}</p>
        </Row>
     
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    books: state.allbooks
  };
};

export default connect(mapStateToProps)(BookDetails);
