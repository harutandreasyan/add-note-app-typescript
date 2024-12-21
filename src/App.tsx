import { useEffect, useReducer } from "react";
import { Dashboard } from "./components/dashboard";
import { reducer } from "./context/reducer";
import { initialState } from "./context/state";
import { NoteContext } from "./context/context";
import { getAllNotes } from "./context/api";
import { Types } from "./types";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getAllNotes().then((response) => {
      dispatch({ type: Types.SET_NOTES, payload: response });
    });
  }, []);

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      <Dashboard />
    </NoteContext.Provider>
  );
}
