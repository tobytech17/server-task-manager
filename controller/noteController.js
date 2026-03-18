const Note = require ("../models/noteModel")

//create note
const createNote = async (req , res) => {
  try {
    const {title , content} = req.body;
    const note = await Note.create({title , content , user: req.userId});
} catch (error) {
  res.status (400).json({message :error.message})
}};

//Get all notes
const getNotes = async (req,res) => {
  try {
    const notes = await Note.find({user: req.userId}).sort ({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({message : error.message})
  }
};

//Get Single Note
const getNoteById = async (req , res) => {
  try{
    const note = await Note.findOne({_id: req.params.id, user: req.userId});
    if (!note) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({message : error.message})
  }
};

//update note
const updateNote = async (req,res) => {
  try {
    const {title, content} = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      {_id: req.params.id, user: req.userId},
      {title, content},
      {new: true , runValidators: true}
    );
    if (!updatedNote) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({message : error.message})
  }
};

//delete note
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({_id: req.params.id, user: req.userId});
    if (!deletedNote) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: "Note deleted successfully"});
  } catch (error) {
    res.status(500).json({message : error.message})
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};
