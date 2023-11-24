import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../config/AppwriteConfig";
import { AppwriteException } from "appwrite";
import { toast } from "react-toastify";
import { useData } from "../../data/UsersData";

const Login = () => {
  const userState = useData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const promise = account.createEmailSession(
      authState.email,
      authState.password
    );

    promise
      .then((res) => {
        setLoading(false);
        userState.updateUserData(res);
        toast.success("Login succesfuly ", { theme: "colored" });
        navigate("/");
      })
      .catch((error: AppwriteException) => {
        setLoading(false);
        toast.error(error.message, { theme: "colored" });
      });
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[31rem] p-2 rounded-md shadow">
        <h1 className="text-center m-2 text-3xl font-bold text-[#65b9f5]">
          {" "}
          chat app
        </h1>
        <h1 className="text-center m-1 text-2xl font-bold ">Login</h1>
        <p className="text-center text-gray-400 p-2">
          {" "}
          welcome back to chat app
        </p>
        <form onSubmit={submitHandler} action="">
          <div className="m-5">
            <Input
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
              label={"Email"}
              type="Email"
            />
          </div>
          <div className="m-5">
            <Input
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
              label={"Password"}
              type="Password"
            />
          </div>
          <div className="m-5">
            <Button
              disabled={loading}
              className="bg-[#65b9f5] text-black w-full"
              type="submit"
            >
              {loading ? "Processing..." : "Submit"}{" "}
            </Button>
          </div>
          <div className="w-full m-5">
            <Link to={"/register"}>
              {" "}
              <h1 className="text-black font-semibold my-auto text-center ">
                Sign up for <span className="text-[#65b9f5]">Chat App</span>
              </h1>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
