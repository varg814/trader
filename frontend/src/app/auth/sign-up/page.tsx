"use client";

import React, { useState } from "react";
import Input from "@/app/components/atoms/input/Input";

import Button from "@/app/components/atoms/button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !fullName) return;
    if (password !== repeatedPassword) {
      alert("Passwords do not match");
      return;
    }

    const resp = await fetch("http://localhost:5000/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        fullName,
      }),
    });
    if (resp.status === 201) {
      router.push("/auth/sign-in");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[600px] flex flex-col gap-5 rounded-lg p-5 bg-white"
    >
      <h1>Sign Up</h1>
      <section className="flex flex-col gap-5">
        <Input
          type="text"
          name="fullName"
          placeholder="full name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="text"
          name="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.263-3.428M3 3l18 18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.879 9.88a3 3 0 104.242 4.242"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="relative">
          <Input
            type={showRepeatedPassword ? "text" : "password"}
            name="repeatedPassword"
            placeholder="repeated password"
            required
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            aria-label={
              showRepeatedPassword
                ? "Hide repeated password"
                : "Show repeated password"
            }
            tabIndex={-1}
          >
            {showRepeatedPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.263-3.428M3 3l18 18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.879 9.88a3 3 0 104.242 4.242"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </section>
      <section className="flex justify-between items-center gap-2.5">
        <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
          Already Have an Account? Sign In
        </Link>
        <Button type="submit">Sign Up</Button>
      </section>
    </form>
  );
};

export default SignUp;
