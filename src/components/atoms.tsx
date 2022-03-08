import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDos {
  [toDos: string]: IToDo[];
}

export const toDoState = atom<IToDos>({
  key: "toDos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const categoryState = atom({
  key: "category",
  default: "To Do",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos[category];
  },
});

export const categorySelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return Object.keys(toDos);
  },
});
