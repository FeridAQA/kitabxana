const { AllBook, createBook, delBook, BookById, updateBook } = require("../services/book.service");
const { isValidObjectId } = require("../utils/check.id");


const C_BookAll = async (req, res) => {
  try {
    let books = await AllBook(req.body)
    res.send(books)
  } catch (error) {
    console.log(error);
  }
}

// find by id
const C_BookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: 'Yalniş ID formati' });
    }

    let book = await BookById(id)
    if (book) {
      res.send(book)
    }
    else{
      res.status(404).send({ message: 'Kitap tapilmadi' })
    }
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

// delete controoler
const C_delBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: 'Yalniş ID formati' });
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

// update 
const C_updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: 'Yalniş ID formati' });
    }
    // Kitabın mövcud olub olmadığını yoxlamaq üçün əvv
    let book = await BookById(id);


    if (book) {
      // Kitabı güncəlləyirik
      let updatedBook = await updateBook(id, req.body);
      return res.status(200).json({ message: 'Kitab uğurla güncəndi', updatedBook })
    } else {
      return res.status(404).json({ message: 'Kitab tapılmadı' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server xətası ooo', error });
  }
}

module.exports = {
  C_BookAll,
  C_BookById,
  C_createBook,
  C_delBook,
  C_updateBook


};