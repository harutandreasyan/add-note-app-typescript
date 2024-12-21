import React, { useContext } from "react";
import { NoteContext } from "../context/context";
import { Note } from "./Note";

export const NoteList = () => {
    const context = useContext(NoteContext);

    if (!context) throw new Error("Out of provider!");

    const { state } = context;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-8">
            <h2 className="text-3xl font-bold text-indigo-400 mb-6">Your Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full px-4">
                {state.notes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
        </div>
    );
};
