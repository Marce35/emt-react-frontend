import axios from '../custom-axios/axios';

const BookShopService = {
    fetchCategories: () => {
        return axios.get("/books/categories");
    },
    fetchBooks: () => {
        return axios.get("/books/");
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    fetchAuthors: () => {
        return axios.get("/books/authors");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name, category, authorId, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },
    editBook: (id, name, category, authorId, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },

}

export default BookShopService;