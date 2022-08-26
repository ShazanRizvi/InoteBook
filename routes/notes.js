const express = require("express");
const router = express.Router();
fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE1: Fetching all the notes from the particular user
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error!");
  }
});

//ROUTE2: add a new note from the particular user
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Description must not be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req); //returns bad request and the error log
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);

//ROUTE3:update an existing from the particular user
router.put(
  "/updatenote/:id",
  fetchUser,

  async (req, res) => {
    const { title, description, tag } = req.body;

    //Creating a new note object
try{
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note not found");
    }

    //Checking if the note belongs to the same user who is logged in
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("function not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
}catch (error) {
     console.log(error.message);
     res.status(500).send("Internal server error!");
   }
  }
);

//ROUTE4:Delete an existing from the particular user
router.delete(
  "/deletenote/:id",
  fetchUser,

  async (req, res) => {
    const { title, description, tag } = req.body;
try{
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note not found");
    }

    //Checking if the note belongs to the same user who is logged in and then only allow deletion
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("function not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Deleted", note: note });
}catch (error) {
     console.log(error.message);
     res.status(500).send("Internal server error!");
   }
  }
);

module.exports = router;
