import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ReadingList, SearchList } from './components'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getMyBooks()
  }
  handleShelf = (shelf, bookID) => {
    console.log(shelf, bookID);
    BooksAPI.update(bookID, shelf)
      .then((test) => {
        console.log(test)
        this.getMyBooks()
      })
  }
  getMyBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }


  render() {
    const { books } = this.state

    return (
      <Router>
        <div className="app">
          <Route
            path="/"
            exact
            render={() => <ReadingList books={books} handleShelf={this.handleShelf}></ReadingList>}>
          </Route>
          <Route path="/search" component={SearchList}></Route>
        </div>
      </Router>
    )
  }
}

export default BooksApp
