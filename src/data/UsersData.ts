
import { Models } from "appwrite";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type state = {
      userData : Models.Session | object,
      userSession : Models.User<Models.Preferences> | object
}

type Action = {
      updateUserData : (data : Models.Session) => void,
      updateUserSession : (data : Models.User<Models.Preferences> | object) => void,
      userReset : () => void
}

export const useData = create<state & Action>()(
      devtools(
           persist(
               (set) => ({
                     userData : {},
                     userSession : {},

                     updateUserData : (data : Models.Session) => 
                     set(() => ({userData : data})),

                     updateUserSession : (data : Models.User<Models.Preferences> |object) =>
                     set(() => ({userSession : data})),

                     userReset : () => 
                     set(() => ({userData : {}, userSession : {}}))

               })

           ,{name : 'users'})
      )
)