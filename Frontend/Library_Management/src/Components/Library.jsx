import React ,{ useState, useEffect } from 'react'
import { bookService } from '../Services/bookService'
import './Library.css'

export default function Library() {

    const [books, setBook] = useState([]);

    const [edit, setEdit] = useState(false);

    const [form, setForm] = useState({
        id : "",
        title : "",
        author : "",
        year:"",
        status :""
    })

    // useEffect

    useEffect(() => {
        bookService.getAllBooks().then((data)=>{
            console.log("Fetched data : ",data)
            setBook(data);
        })
    },[]);

    // onchange

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    }

    // onclick

    const handleAddBook = async()=>{
        
        await bookService.add(form);
        const updatedList = await bookService.getAllBooks();
        setBook(updatedList);

        setForm({
            title:"",
            author:"",
            year:"",
            status:""
        })
    }

    const handleEdit = (book) =>{
        setForm({
            id : book.bookId,
            title : book.title,
            author : book.author,
            year : book.year,
            status : book.status
        })

        setEdit(true);
    }

    const handleUpdateBook = async()=>{
        await bookService.update(form.id,form);
        const updatedList = await bookService.getAllBooks();
        setBook(updatedList);

        setForm({
            title:"",
            author:"",
            year:"",
            status:""
        })
        setEdit(false);
    }

    const handleDeleteBook = async(id)=>{

        await bookService.deletebook(id);
        const updatedList = await bookService.getAllBooks();
        setBook(updatedList);

    }

    return (
        <>
        
        <h1>Library Management System</h1>
        <hr />

        <form action="">
            <div>
                <input type="text" placeholder='Enter book title' name='title' value={form.title} onChange={handleChange} required/> 
                <input type="text" placeholder='Enter book author' name='author' value={form.author} onChange={handleChange} required/> 
                <input type="text" placeholder='Enter book publish year' name='year' value={form.year} onChange={handleChange} required/> 
                <input type="boolean" placeholder='Availability 0/1' name='status' value={form.status} onChange={handleChange} />
            </div>
            <div >
                <button onClick={handleAddBook} >Add Book</button>
                <button onClick={handleUpdateBook}>Update Book</button>
            </div>

        </form>

        <hr />

        <h2>All Books Data</h2>

        <table>
            <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Book Author</th>
                    <th>Publish Year</th>
                    <th>Availability</th>
                    <th>Buttons</th>
                </tr>
            </thead>

            <tbody>
                {
                    books.map((book) => (
                        <tr key={book.bookId}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>{book.status}</td>
                            <td>
                                <button onClick={()=>(handleEdit(book))}>Edit</button>
                                <button onClick={()=>(handleDeleteBook(book.bookId))}>Delete</button>
                            </td>
                        </tr>

                    ))
                }

            </tbody>
        </table>

        </>
    )
}
