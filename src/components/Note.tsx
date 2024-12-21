import { useState, useContext } from "react";
import { INote, Types } from "../types";
import { EditNote } from "./EditNote";
import { deleteNote } from "../context/api";
import { NoteContext } from "../context/context";

interface NoteProps {
  note: INote;
}

export const Note: React.FC<NoteProps> = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const context = useContext(NoteContext);
  if (!context) throw new Error("Outside of provider!");

  const { dispatch } = context;

  const handleDelete = async () => {
    await deleteNote(note.id);
    dispatch({ type: Types.DELETE_NOTE, payload: note.id });
  };

  return (
    <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-green-400 mb-2">{note.title}</h3>
        <p className="text-gray-300 mb-4">{note.content}</p>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-lg shadow-sm transition duration-200"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg shadow-sm transition duration-200"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      {isEditing && <EditNote note={note} onClose={() => setIsEditing(false)} />}
    </div>
  );
};
