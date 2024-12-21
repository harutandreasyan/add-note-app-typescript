import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "react-modal";
import { INote, Types } from "../types";
import { updateNote } from "../context/api";
import { NoteContext } from "../context/context";

Modal.setAppElement("#root");

interface IProps {
  note: INote;
  onClose: () => void;
}

const customStyles = {
  content: {
    maxHeight: "90vh",
    overflow: "hidden",
    width: "700px",
    height: "400px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0.75rem",
    padding: "0",
    backgroundColor: "transparent",
  },
};


export const EditNote: React.FC<IProps> = ({ note, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<INote>({
    defaultValues: note,
  });

  const context = useContext(NoteContext);
  if (!context) throw new Error("Outside of provider!");

  const { dispatch } = context;

  const handleEdit: SubmitHandler<INote> = (data) => {
    updateNote(note.id, data).then((response) => {
      dispatch({ type: Types.UPDATE_NOTE, payload: response });
      reset();
      onClose();
    });
  };

  return (
    <Modal isOpen={true} style={customStyles} onRequestClose={onClose}>
      <form
        onSubmit={handleSubmit(handleEdit)}
        className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 text-white"
      >
        <h2 className="text-xl font-bold text-gray-100">Edit Note</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
