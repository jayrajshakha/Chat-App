import { Models } from "appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type state = {
  community: Array<Models.Document> | [];
};

type Action = {
  AddCommunity: (data: Models.Document) => void;
};

export const CommunityStore = create<state & Action>()(
  devtools((set) => ({
    community: [],
    AddCommunity: (data: Models.Document) =>
      set((state) => ({
        community: [data, ...state.community],
      })),
  }))
);
