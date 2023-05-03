import React from "react";
import { useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = () => {
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added Successfully","success")
    
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2 className="my-3" style={{ textAlign: "left" }}>
        Add  Note
      </h2>
      <form>
        <div className="mb-3" style={{ textAlign: "left" }}>
          <label className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control my-3"
            id="title"
            name="title"
            onChange={onChange}
          />
        </div>
        <div style={{ textAlign: "left" }} className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control my-3"
            id="description"
            name="description"
            rows="10"
            onChange={onChange}
          />
        </div>
        <div style={{ textAlign: "left" }} className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control my-3"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto my-3">
          <button
            type="submit"
            disabled={note.title.length<5 ||note.description.length<5}
            className="btn btn-dark"
            onClick={handleClick}
            style={{fontWeight:"600"}}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
