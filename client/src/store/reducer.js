import books from "../data/books";
import genre from "../data/genres";

let allbooks = books;

const initialState = {
  allbooks: allbooks,
  books: books,
  booksByGenre: [],
  genres: genre,
  currentGenre: "",
  search: [],
  searchWords: [],
  checkedGenre: [],
  isChecked: false,
  isAuthenticated: false,
  message: false
};

const reducer = (state = initialState, action) => {
  if (action.type === "GENRE") {
    const choosenGenre = action.value.target.name;
    const isChecked = action.value.target.checked;
    let genree = state.checkedGenre;
    if (isChecked) {
      genree.push(choosenGenre);
    } else {
      const neeGenresArr = genree.filter(e => e !== choosenGenre);
      genree = [...neeGenresArr];
    }
    const filterBooks = books.filter(el => {
      return genree.some(e => e === el.genre);
    });

    const newBooks = filterBooks.length ? filterBooks : allbooks;
    return {
      ...state,
      search: "",
      genres: genre,
      checkedGenre: genree,
      books: newBooks,
      isChecked: !isChecked
    };
  }

  if (action.type === "SEARCH_INPUT") {
    const searchInputValue = action.value.target.value;
    const searchWords = searchInputValue.split(" ");

    return {
      ...state,
      search: searchInputValue,
      searchWords: searchWords
    };
  }
  if (action.type === "ON_SEARCH_BUTTON") {
    const currentGenre = state.checkedGenre;
    const words = state.searchWords;
    let newFilteredBooks = [];
    let currBooks = state.books;

    //filter the titles if genre is selected
    if (currentGenre.length > 0) {
      newFilteredBooks = currBooks.filter(el => {
        let hasSearchWord = false;
        if (el.title) {
          for (let i = 0; i < words.length; i += 1) {
            const title = el.title.toLowerCase();
            if (title.includes(words[i].toLowerCase())) {
              hasSearchWord = true;
              break;
            }
          }
        }
        return hasSearchWord;
      });
      //filter trough titles and genres if no genre is selected
    } else {
      newFilteredBooks = currBooks.filter(el => {
        let hasSearchWord = false;
        if (el.title && el.genre) {
          for (let i = 0; i < words.length; i += 1) {
            const title = el.title.toLowerCase();
            const genre = el.genre.toLowerCase();
            if (
              title.includes(words[i].toLowerCase()) ||
              genre.includes(words[i].toLowerCase())
            ) {
              hasSearchWord = true;
              break;
            }
          }
        }
        return hasSearchWord;
      });
      console.log(newFilteredBooks);
    }

    return {
      ...state,
      books: newFilteredBooks
    };
  }
  if (action.type === "REGISTRATION") {
    //very secure :D
    localStorage.setItem("userdata", JSON.stringify(action.user));
    return {
      ...state
    };
  }
  if (action.type === "LOGIN") {
    let auth = false;
    let msg = false;
    let userData = JSON.parse(localStorage.getItem("userdata"));
    if ( userData &&
      userData.name === action.user.name &&
      userData.password === action.user.password
    ) {
      auth = true;
      console.log(true);
    }else{
        msg = true 
    }

    return {
      ...state,
      isAuthenticated: auth,
      message: msg
    };
  }
  if (action.type === "LOGOUT") {
    localStorage.removeItem("userdata");
    console.log("this is logout");
    return {
      ...state,
      isAuthenticated: false,
      
    };
  }
  return state;
};

export default reducer;
