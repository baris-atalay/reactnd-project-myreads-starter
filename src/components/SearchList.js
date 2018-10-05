import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class SearchList extends PureComponent {
  state = {
    query: '',
    books: []
  }
  handleQuery(query) {
    if(query !== '')
      BooksAPI.search(query)
        .then((result) => {
          this.setState(() => ({
            books: result.error ? [] : result
          }))
        })
    else
      this.setState(() => ({
        books: []
      }))

    this.setState(() => ({
      query: query
    }))
  }

  render() {
    const { query, books } = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.handleQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {books.map((book, idx) => {
              return (
                <li key={idx}>
                  <div className="book">
                    <div className="book-top">
                      {book.imageLinks &&
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                      }
                      <div className="book-shelf-changer">
                        <select defaultValue="none">
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors &&
                      <div className="book-authors">{book.authors.join(', ')}</div>
                    }
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchList
