const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

//-------------------------------------------------------------

const app = express();
const portNo = 1234;

//-------------------------------------------------------------

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

//-------------------------------------------------------------

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'library'
})

//-------------------------------------------------------------

db.connect((err)=>{
    if(err==null){
        console.log("COnnection create succefully.")
    }
    else{
        console.error(err.message)
    }
})

//-------------------------------------------------------------

const view = "Select * from Books";
const add = "Insert Into Books (title,author,year,status) Value (?,?,?,?)";
const update = "Update Books Set title=?, author=?, year=?, status=? where BookId=?";
const deleteBook = "Delete from Books Where BookId=?";

//-------------------------------------------------------------

app.get('/allBooks',(req,res)=>{

    db.query(view,(err,result)=>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        else{
            res.json(result);
        }
    })
})

app.post('/add',(req,res)=>{

    const {title,author,year,status} = req.body;

    const newstatus = (status==='true' || status===true ? 1 : 0);

    db.query(add,[title,author,year,newstatus],(err,result)=>{
        if(err){
            res.status(500).json({error:err.message})
            return;
        }
        else{
            const newbook ={
                bookid : result.insertId,
                title,
                author,
                year,
                status:newstatus
            }
            res.json(newbook);
        }
    })

})


app.put('/update/:id',(req,res)=>{

    const {id} = req.params;

    const {title,author,year,status} = req.body;

    const newstatus = (status==='true' || status===true ? 1 : 0);

    db.query(update, [title,author,year,newstatus,id], (err,result) =>{
        if(err){
            res.status(500).json({error:err.message})
            return;
        }
        else{
            const newbook ={
                bookid : result.insertId,
                title,
                author,
                year,
                status:newstatus
            }
            res.json(newbook);
        }
    })
})

app.delete('/delete/:id',(req,res)=>{

    const {id} = req.params;

    db.query(deleteBook, [id], (err,result) =>{

        if(err){
            res.status(500).json({error:err.message})
            return;
        }
        else{
            res.json(result);
        }
    })
})

//-------------------------------------------------------------

app.listen(portNo,(err)=>{

    if(err){
        console.error(err.message);
    }
    else{
        console.log(`Server connected at http://localhost:${portNo}`)
    }
}
)
