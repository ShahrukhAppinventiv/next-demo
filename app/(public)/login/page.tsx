"use client";

import Button from "@/app/components/button/Button";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Min 6 chars")
        .required("Password is required"),

      remember: Yup.boolean(),
    }),

    validateOnMount: true,

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error("Invalid credentials");
          return;
        }

        toast.success("Sign in successfully");
        router.push("/home");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-[450px] overflow-hidden rounded-[32px] border border-slate-200 bg-white px-10 py-8 shadow-xl">
        {/* Top Glow */}
        <div className="pointer-events-none absolute -right-14 top-10 h-32 w-32 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-14 bottom-10 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-3xl" />


        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/*  Forgot */}
          {/* <div className="flex items-center justify-end text-sm">
       
            <button
              type="button"
              onClick={() => router.push("/forgot")}
              className="font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              Forgot password?
            </button>
          </div> */}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            loading={formik.isSubmitting}
            // className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600"
            //  className={` ${formik.isValid
            //         ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 cursor-pointer"
            //         : "bg-gray-400 cursor-not-allowed"
            //         }`}
          >
            Sign in
          </Button>
               {/* <button
                type="submit"
                disabled={!formik.isValid }
                className={`w-full p-2 rounded text-white mt-4 ${formik.isValid
                    ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                Login   

            </button> */}
        </form>

        {/* Social Login */}
        <div className="mt-6 border-t border-slate-200 pt-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Continue with
          </p>

          <div className="mt-5 flex items-center justify-center gap-4">
            {/* Google */}
            <button
              type="button"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/home?signin=success",
                })
              }
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzf-mFSVPG0NB4zca3DW3zh0EEgYKyyjrmNg&s"
                alt="Google"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </button>

            {/* Github */}
            <button
              type="button"
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/home?signin=success",
                })
              }
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                alt="GitHub"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </button>

            {/* Apple */}
            {/* <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968672.png"
                alt="Apple"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </button> */}
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Login;
