import './App.css';
import React, {Component} from "react";
import BookShopService from "../../repository/bookShopRepository";
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "../Header/header";
import Categories from "../Categories/categories";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import Books from "../Books/BookList/books";
import Authors from "../Authors/authors";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            books: [],
            authors: [],
            selectedBook: {}
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.loadCategories();
        this.loadBooks();
        this.loadAuthors();
    };

    loadBooks = () => {
        BookShopService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                });
            });
    }

    loadCategories = () => {
        BookShopService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                });
            });
    }

    loadAuthors = () => {
        BookShopService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                });
            });
    }

    deleteBook = (id) => {
        BookShopService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    };

    addBook = (name, category, authorId, availableCopies) => {
        BookShopService.addBook(name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    };

    getBook = (id) => {
        BookShopService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                });
            });
    };

    editBook = (id, name, category, authorId, availableCopies) => {
        BookShopService.editBook(id, name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    };

    render() {
        return (
            <Router>
                <Header />
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/categories"} element={<Categories categories={this.state.categories} />} />
                            <Route path={"/authors"} element={<Authors authors={this.state.authors} />} />
                            <Route path={"/books/add"} element={<BookAdd categories={this.state.categories} authors={this.state.authors} onAddBook={this.addBook} />} />
                            <Route path={"/books/edit/:id"} element={<BookEdit categories={this.state.categories} authors={this.state.authors} onEditBook={this.editBook} book={this.state.selectedBook} />} />
                            <Route path={"/books"} element={<Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook} />} />
                            {/*<Route path="/login" element={<Login onLogin={this.fetchData} />} />*/}
                            <Route path={"/*"} element={<Navigate replace to="/books" />} />
                        </Routes>
                    </div>
                </main>
            </Router>
        );
    }


}


export default App;
