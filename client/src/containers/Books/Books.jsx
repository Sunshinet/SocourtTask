import React, { Component } from "react";
import SingleBook from "../../components/SingleBook/SingleBook.jsx";
import books from "../../data/books.js";
import SideMenu from "../../containers/SideMenu/SideMenu.jsx";

class Books extends Component {
  state = {
    allBooks: books
  };

  render() {
    return this.state.allBooks.map(book => {
      return <SingleBook info={book} />;
    });
  }
}

export default Books;
