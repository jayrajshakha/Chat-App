import { Models } from "appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type state = {
  chats: Array<Models.Document> | [];
};

type Action = {
  AddChats: (data: Models.Document) => void;
  AddAllChats: (data: Array<Models.Document>) => void;
  DeleteChat : (id : string) =>  void
};

export const ChatStore = create<state & Action>()(
  devtools((set) => ({
    chats: [],
    AddChats: (data: Models.Document) =>
      set((state) => ({ chats: [...state.chats, data] })),
    AddAllChats: (data: Array<Models.Document>) =>
      set(() => ({
        chats: data,
      })),
      DeleteChat : (id : string) => 
      set((state) => ({
         chats : state.chats.filter(f => f.$id !== id)
      })),
  }))
);
