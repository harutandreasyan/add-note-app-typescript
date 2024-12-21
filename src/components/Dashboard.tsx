import React, { useState } from "react";
import { AddNote } from "./AddNote";
import { NoteList } from "./NoteList";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 flex flex-col items-center">
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 mb-6"
        onClick={() => setOpen(true)}
      >
        Add Note
      </button>

      {open && <AddNote onClose={() => setOpen(false)} />}
      <NoteList />
    </div>
  );
};

