import axios from "axios";
import { RefObject, useRef } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router";

export function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const loginHandler = async () => {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    console.log(email, password);

    try {
      const res = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
      console.log(res.data);
    } catch (error) {
      console.log("look");

      console.log(error);
    }
  };
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <div className="text-3xl font-extrabold text-center">Login</div>

          <div className="pt-2">
            <LabelledInput
              ref={emailRef}
              label="Email"
              placeholder="email@example.com"
            />
            <LabelledInput
              ref={passwordRef}
              label="Password"
              type={"password"}
              placeholder="123456"
            />
            <button
              type="button"
              className="mt-8 w-full text-white hover:bg-gray-700 bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={loginHandler}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelledInput({ label, placeholder, type, ref }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        ref={ref}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  ref: RefObject<HTMLInputElement | null>;
}
