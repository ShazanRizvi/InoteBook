import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";
import Noteitem from "./Noteitem";
import { useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
 

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  let navigate = useNavigate();

  useEffect(() => {
      getNotes();
    }, []);

    
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <div className="row my-3" style={{ textAlign: "left" }}>
        <div className="modal1">
          <button
            type="button"
            ref={ref}
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Launch static backdrop modal
          </button>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Edit note
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {" "}
                  <form>
                    <div className="mb-3" style={{ textAlign: "left" }}>
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control my-3"
                        id="etitle"
                        name="etitle"
                        onChange={onChange}
                      />
                    </div>
                    <div style={{ textAlign: "left" }} className="mb-3">
                      <label htmlFor="edescription" className="form-label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control my-3"
                        id="edescription"
                        name="edescription"
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
                        id="etag"
                        name="etag"
                        onChange={onChange}
                      />
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto my-3"></div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    ref={refClose}
                    type="button"
                    className="btn btn-outline-dark"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleClick}
                  >
                    Update Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>

        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
