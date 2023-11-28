import { useEffect, useRef, useState } from "react";
import {
  CHAT_ID,
  DATABASE,
  DATABASE_ID,
  ID,
  client,
} from "../config/AppwriteConfig";
import { useData } from "../data/UsersData";
import { AppwriteException, Models } from "appwrite";
import { useParams } from "react-router-dom";
import { ChatStore } from "../data/Chat";
import { toast } from "react-toastify";

const Chat = () => {
  const [massseage, setMasseage] = useState("");
  const [loading, setLoading] = useState(false);
  const isFetch = useRef(false);
  const params = useParams();

  const user = useData((s) => s.userSession) as Models.User<Models.Preferences>;
  const chat = ChatStore();

  // console.log(chat.chats);

  useEffect(() => {
    if (!isFetch.current) {
      fetchMessage();

      /* for realtime Things */

      client.subscribe(
        `databases.${DATABASE_ID}.collections.${CHAT_ID}.documents`,
        (res) => {
          const payload = res.payload as Models.Document;
          console.log(res);
          

          if (
            res.events.includes("databases.*.collections.*.documents.*.create")
          ) {
            if (user.$id !== payload.user_id) {
              chat.AddChats(payload);
            }
          }
          else if (res.events.includes("databases.*.collections.*.documents.*.delete")){
              chat.DeleteChat(payload.$id)
          }

        }
      );

      isFetch.current = true;
    }
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    DATABASE.createDocument(DATABASE_ID, CHAT_ID, ID.unique(), {
      communities_id: params.id,
      name: user.name,
      message: massseage,
      user_id: user.$id,
    })
      .then((res) => {
        chat.AddChats(res);
        // console.log(res);
      })
      .catch((err: AppwriteException) => {
        console.log(err);
        toast.error(err.message, { theme: "colored" });
      });
    setMasseage("");
  };

  const fetchMessage = () => {
    setLoading(true);
    DATABASE.listDocuments(DATABASE_ID, CHAT_ID)
      .then((res) => {
        setLoading(false);
        //  console.log(res.documents);
        chat.AddAllChats(res.documents);
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        toast.error(err.message, { theme: "colored" });
      });
  };

  const deletFun = (id : string) => {

      DATABASE.deleteDocument(DATABASE_ID, CHAT_ID, id)
      .then(()=> {
         chat.DeleteChat(id)
      })
      .catch((err: AppwriteException)=> {
         toast.error(err.message, {theme : "colored"})
      })
  }

  return (
    <div className=" h-screen w-screen">
      <div className="flex flex-col mb-10">
        {chat.chats.length > 0 &&
          chat.chats.map((i) => {
            return i.user_id === user.$id ? (
              <div key={i.$id} className=" flex sm:mx-4 justify-end mb-20 ">
                <p className="bg-purple-500 text-sm rounded-2xl text-white p-2 m-2">
                  {" "}
                  <span className="font-bold text-black p-2 block">
                    {" "}
                    {i.name}
                  </span>
                  {i.message}
                </p>
                <div 
                onClick={() => deletFun(i.$id)}
                className="cursor-pointer mr-4 bg-red-700 h-full rounded-full p-2">
                  <h1>d</h1>
                </div>
              </div>
            ) : (
              <div key={i.$id} className="flex justify-start mb-20">
             
                <p className="bg-green-500  max-w-[60%] sm:mx-4 text-sm rounded-2xl p-2 m-2">
                  <span className="font-bold text-black p-2 block text-[12px]">
                    {" "}
                    {i.name}
                  </span>{" "}
                  {i.message}
                </p>
              </div>
            );
          })}

        <div className="fixed bottom-0 w-full">
          <form onSubmit={submitHandler}>
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
              <input
                onChange={(e) => setMasseage(e.target.value)}
                value={massseage}
                id="chat"
                type="text"
                className="block outline-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              />
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
