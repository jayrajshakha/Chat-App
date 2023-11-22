
import { Models } from "appwrite";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type state = {
      userData : Models.Session | object
}

type Action = {
      updateUserData : (data : Models.Session) => void
}

export const useData = create<state & Action>()(
      devtools(
           persist(
               (set) => ({
                     userData : {},
                     updateUserData : (data : Models.Session) => 
                     set(() => ({userData : data}))
               })

           ,{name : 'users'})
      )
)