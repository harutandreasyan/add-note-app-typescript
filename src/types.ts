import { Dispatch } from "react";

export type InputNote = Omit<INote, "id">;

export interface INote {
  id: string;
  title: string;
  content: string;
}

export interface IState {
  notes: INote[];
}

export interface IAction {
  type: Types;
  payload: unknown;
}

export enum Types {
  DELETE_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  SET_NOTES,
  EDIT_NOTE
}

export interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}
