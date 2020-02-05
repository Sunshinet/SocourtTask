import React, { Component } from "react";
import { Button, Container } from "reactstrap";

import { connect } from "react-redux";
import SingleBook from "../../components/SingleBook/SingleBook.jsx";

import "./Books.css";

class Books extends Component {
  handleClick = event => {
    console.log("clicked");
    this.props.onLogout();
    this.props.history.replace("/login");
  };

  selectedBook = id => {
    console.log(this.props.history.push(`/book/${id}`));
  };

  render() {
    return (
      <Container>
        <div className="Book">
          <div className="btnLogOut">
            {" "}
            <Button onClick={this.handleClick}>Logout</Button>
          </div>
          {this.props.books.map(book => {
            const handleClick = () => {
              this.selectedBook(book.id);
            };
            return (
              <SingleBook info={book} key={book.id} onClick={handleClick} />
            );
          })}
        </div>{" "}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
