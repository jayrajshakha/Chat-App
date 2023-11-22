import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ID, account } from "../../config/AppwriteConfig";
import { AppwriteException } from "appwrite";
import { toast } from "react-toastify";

const Register = () => {
  const nevigate = useNavigate();
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, SetLoading] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetLoading(true);

    const promis = account.create(
      ID.unique(),
      authState.email,
      authState.password,
      authState.name
    );
    promis
      .then(() => {
        SetLoading(false);
        nevigate("/login");
        toast.success("Account created successfully!  please login now", {
          theme: "colored",
        });
      })
      .catch((err: AppwriteException) => {
        SetLoading(false);
        toast.error(err.message, { theme: "colored" });
      });
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[31rem] p-2 rounded-md shadow">
        <h1 className="text-center m-2 text-3xl font-bold text-[#65b9f5]">
          {" "}
          chat app
        </h1>
        <h1 className="text-center m-1 text-2xl font-bold ">Register</h1>
        <p className="text-center text-gray-400 p-2"> welcome to chat app</p>
        <form onSubmit={submitHandler} action="">
          <div className="m-5">
            <Input
              onChange={(e) =>
                setAuthState({ ...authState, name: e.target.value })
              }
              label={"Name"}
              type="text"
            />
          </div>
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
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
          <div className="w-full m-5">
            <Link to={"/login"}>
              {" "}
              <h1 className="text-black font-semibold my-auto text-center ">
                Already have an account ?
              </h1>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
