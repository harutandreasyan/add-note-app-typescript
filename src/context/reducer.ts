import { IAction, IState, INote, Types } from "../types";

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case Types.SET_NOTES:
            return { ...state, notes: action.payload as INote[] };
        case Types.ADD_NOTE:
            return { ...state, notes: [...state.notes, action.payload as INote] };
        case Types.EDIT_NOTE:
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === (action.payload as INote).id ? (action.payload as INote) : note
                ),
            };
        case Types.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((n) => n.id !== action.payload)
            };
        case Types.UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === (action.payload as INote).id ? (action.payload as INote) : note
                ),
            };
        default:
            return state;
    }
};
