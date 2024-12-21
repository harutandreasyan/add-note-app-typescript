import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "react-modal";
import { INote, Types } from "../types";
import { addNote } from "../context/api";
import { NoteContext } from "../context/context";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "700px",
    height: "400px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0.75rem",
    padding: "0",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
};

export const AddNote: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<INote>();

  const context = useContext(NoteContext);
  if (!context) throw new Error("Outside of provider!");

  const { dispatch } = context;

  const handleAddNote: SubmitHandler<INote> = (data) => {
    addNote(data).then((response) => {
      dispatch({ type: Types.ADD_NOTE, payload: response });
      reset();
      onClose();
    });
  };

  return (
    <Modal isOpen={true} style={customStyles} onRequestClose={onClose}>
      <form
        onSubmit={handleSubmit(handleAddNote)}
        className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-6 text-white"
      >
        <h2 className="text-2xl font-bold text-gray-100">Add New Note</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content.message}</span>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Note
          </button>
        </div>
      </form>
    </Modal>
  );
};
