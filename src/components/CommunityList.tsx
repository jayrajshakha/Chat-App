import { AppwriteException, Query } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { COLLECTION_ID, DATABASE, DATABASE_ID } from "../config/AppwriteConfig";
import { CommunityStore } from "../data/CommunityData";

const CommunityList = () => {

  const isFetch = useRef(false)
  const [loading , setLoading] = useState(false)

  const StoreData = CommunityStore()

  useEffect(() => {

    if(!isFetch.current){
      setLoading(true)
      DATABASE.listDocuments(DATABASE_ID, COLLECTION_ID, [
         Query.select(['$id', 'name'])
      ]).then((res) => {
          setLoading(false)
          console.log(res);
          
          StoreData.AddCommunities(res.documents)

      }).catch((err : AppwriteException) => {
         setLoading(false)
         console.log(err.message);
         
      })
        
    }

  } , [])

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Communities
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Connect with one of our available Communities providers or create a new
        one.
      </p>
      <ul className="my-4 space-y-3">
         {
            StoreData.community.length > 0 && StoreData.community.map((item) => {
                return (
                  <li 
                  key={item.$id}
                  className= ''>
                  <a
                    href="#"
                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap"> {item.name}</span>
                  </a>
                </li>
                )
            })
         }
      </ul>
      <div>
        <a
          href="#"
          className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            className="w-3 h-3 me-2"
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
              d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Why do I need to connect with my community ?
        </a>
      </div>
    </div>
  );
};

export default CommunityList;
