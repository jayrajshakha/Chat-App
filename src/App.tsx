import { Button } from "@nextui-org/react";
import { useEffect , useRef } from "react";
import { account } from "./config/AppwriteConfig";
import { useData } from "./data/UsersData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const App = () => {

  const isRendered = useRef<boolean>(false)
  const logedUser = useData()
  const navigate = useNavigate()

  useEffect(() => {
      if(!isRendered.current){
          account.get()
          .then((res) => {
            logedUser.updateUserSession(res)
            console.log(res);
             
          })
          .catch((err) => {
            toast.dismiss('Your session got expired ! please login again')
            logedUser.userReset()
            navigate('/login')
            console.log(err)
             
          })
      }
      isRendered.current = true
      
  } , [])

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Jay Rajshakha </h1>
      <Button color="success"> hello </Button>
      
    </div>
  );
};

export default App;
