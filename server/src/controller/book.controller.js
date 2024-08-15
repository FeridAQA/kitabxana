const { default: mongoose } = require("mongoose");
const { AllBook, createBook, delBook, BookById } = require("../services/book.service")


const C_BookAll = async (req, res) => {
  try {
    let books = await AllBook(req.body)
    res.send(books)
  } catch (error) {
    console.log(error);
  }
}

const C_createBook = async (req, res) => {
  try {
    let book = await createBook(req.body)
    res.send(book)
  } catch (error) {
    console.log(error);
  }
}

const C_delBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Yanlış ID formatı' });
    }

    // Kitabın mövcud olub olmadığını yoxlamaq üçün əvvəlcə onu tapırıq
    let book = await BookById(id);

    if (book) {
      // Kitabı silirik
      let deletedBook = await delBook(id);
      return res.status(200).send({ message: 'Kitab uğurla silindi', deletedBook });
    } else {
      return res.status(404).send({ message: 'Kitab tapılmadı' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server xətası', error });
  }
};

module.exports = {
  C_BookAll,
  C_createBook,
  C_delBook


};