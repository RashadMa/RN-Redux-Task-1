import { createStore } from 'redux';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category?: "category";
}

export interface RootState {
  todos: Todo[];
}

const initialState: RootState = {
  todos: [],
};

export enum ActionType {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
}

export interface AddTodoAction {
  type: ActionType.ADD_TODO;
  payload: string;
}

export interface RemoveTodoAction {
  type: ActionType.REMOVE_TODO;
  payload: number;
}

export interface CompleteTodoAction {
  type: ActionType.COMPLETE_TODO;
  payload: number;
}

export type TodoAction = AddTodoAction | RemoveTodoAction | CompleteTodoAction;

export const addTodo = (text: string): AddTodoAction => ({
  type: ActionType.ADD_TODO,
  payload: text,
});

export const removeTodo = (id: number): RemoveTodoAction => ({
  type: ActionType.REMOVE_TODO,
  payload: id,
});

export const completeTodo = (id: number): CompleteTodoAction => ({
  type: ActionType.COMPLETE_TODO,
  payload: id,
});

const reducer = (state = initialState, action: TodoAction): RootState => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    case ActionType.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case ActionType.COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
