import { Button } from "@nextui-org/react";
import { useEffect , useRef } from "react";
import { account } from "./config/AppwriteConfig";
import { useData } from "./data/UsersData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";

const App = () => {

  const isRendered = useRef<boolean>(false)
  const logedUser = useData()
  const navigate = useNavigate()

  useEffect(() => {
      if(!isRendered.current){
          account.get()
          .then((res) => {
            logedUser.updateUserSession(res)
    
             
          })
          .catch(() => {
            toast.dismiss('Your session got expired ! please login again')
            logedUser.userReset()
            navigate('/login')
   
             
          })
      }
      isRendered.current = true
      
  } , [])

  return (
    <div>
       <AppNavbar />
    </div>
  );
};

export default App;
