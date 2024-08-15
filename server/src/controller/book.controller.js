const { AllBook, createBook } = require("../services/book.service")


const C_BookAll = async (req, res) => {
  try {
    let books = await AllBook(req.body)
    res.send(books)
  } catch (error) {
    console.log(error);
  }
}

const C_createBook=async(req,res)=>{
  try {
    let book = await createBook(req.body)
    res.send(book)
    } catch (error) {
      console.log(error);
      }
}

module.exports = {
  C_BookAll,
  C_createBook

};