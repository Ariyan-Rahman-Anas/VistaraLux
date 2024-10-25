import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignUpMutation } from "../../../redux/api/userApi";
import { useForm } from "react-hook-form";
import { User } from "../../../types/types";
import { useEffect } from "react";

export default function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<User>();

  // The mutation hook with proper typing
  const [signUp, { data, isSuccess, isLoading, error }] = useSignUpMutation();

  const currentDate = Date.now()
  const randomId = String(Math.ceil(Math.random() * currentDate * 999 * 999))

  const signUpHandler = async (formData) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      _id: randomId
    };

    try {
      await signUp(payload);
    } catch (error) {
      toast.error("Failed to make user registration")
      console.error("Sign-up failed:", error);
    }
  }

  useEffect(() => {
    if (error?.data) {
      console.log("err is ", error)
      toast.error(
        error?.data?.message,
        {
          duration: 3000,
        }
      );
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error?.data?.message}`,
      });
    }

    if (isSuccess) {
      console.log("isSuccess ", isSuccess)
      toast.success(data?.message, { duration: 3000 });
      navigate("/sign-in");
    }
  }, [error, setError, isSuccess, data, navigate]);

  const googleSignUpHandler = async () => {
    await window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-slate-600 p-2 md:px-16">

      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Left Section - Welcome Text */}
        <div className="col-span-5 md:col-span-3 p-3 md:p-8 space-y-8 text-white md:pl-12   w-full ">
          <div>
            <Link to={"/"} className="text-white animate-pulse font-semibold text-7xl underline underline-offset-4 italic ">VistaraLux</Link>
          </div>
          <div>
            <h1 className="font-bold text-4xl mb-3">Join VistaraLux Today!</h1>
            <p className="mb-8 text-base w-full md:w-3/4">Explore our wide range of products, share your picks, and enjoy exclusive offers. Join today and start shopping smarter!</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Already have an account?</p>
            <span>
              <Link to={"/sign-in"} className="text-slate-300 hover:text-slate-200 font-semibold underline duration-500 text-lg underline-offset-2">Sign in here</Link>
              &nbsp;to continue your journey.
            </span>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="col-span-5 md:col-span-2 bg-white bg-opacity-20 backdrop-blur-md p-5 md:p-8 rounded-3xl shadow-lg w-full">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Registration</h1>
          <form
            onSubmit={handleSubmit(signUpHandler)}
            className="flex flex-col space-y-3">

            {/* Name Input */}
            <div className="flex flex-col gap-0.5">
              <label htmlFor="name" className="text-sm font-semibold text-white">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="form-text-input"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="text-black font-semibold">{errors.name.message}</span>}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-0.5">
              <label htmlFor="email" className="text-sm font-semibold text-white">Email</label>
              <input
                type="email"
                placeholder="example@suppose.com"
                className="form-text-input"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                })}
              />
              {errors.email && <span className="text-black font-semibold">{errors.email.message}</span>}
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-0.5">
              <label htmlFor="password" className="text-sm font-semibold text-white">Password</label>
              <input
                type="password"
                placeholder="Your password"
                className="form-text-input"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              />
              {errors.password && <span className="text-black font-semibold">{errors.password.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-slate-600 text-white py-3 rounded-md shadow-lg transition duration-500 font-semibold flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Creating your account
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="flex items-center gap-1 mt-4 ">
            <div className="border-[.1rem] rounded-full w-[32.5%] "></div>
            <p className="w-[35%] border2 text-center text-white font-normal tracking-wider ">Continue with</p>
            <div className="border-[.1rem] rounded-full w-[32.5%]"></div>
          </div>

          <div className="flex items-center justify-center mt-2">
            <button onClick={googleSignUpHandler} className="bg-gray-50 hover:bg-opacity-85 duration-300 rounded-full border-none shadow-2xl ">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}