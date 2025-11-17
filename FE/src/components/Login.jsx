import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("dhoni@gmail.com");
  const [password, setPassword] = useState("Dhoni@893579");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // console.log(email, password);
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data);

      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data);
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-[80vh] bg-slate-300 ">
      <div className="flex flex-col items-center justify-center rounded-2xl px-10 py-5 bg-slate-600">
        <h2 className="font-medium text-2xl my-3">Login</h2>
        <div className="flex flex-col items-center justify-center">
          <input
            className="my-2 border-2 rounded-md py-0.5 px-1.5 text-l font-medium bg-slate-300"
            type="email"
            value={emailId}
            placeholder="Email"
            autoFocus="on"
            required={true}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            className="my-2 border-2 rounded-md py-0.5 px-1.5 text-l font-medium bg-slate-300"
            type="password"
            value={password}
            placeholder="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500">{error}</div>}

          <button
            onClick={handleLogin}
            className="px-6 py-2 my-3 border-1 rounded-2xl bg-gray-500 cursor-pointer text-l font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
