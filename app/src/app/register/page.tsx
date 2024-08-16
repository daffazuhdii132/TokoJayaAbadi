"use client";
import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullname,
        username,
        email,
        password,
      }),
    });
    const response = await res.json();
    console.log(response);
    if (!res.ok) {
      return Swal.fire({
        title: "Error!",
        text: `${response.message}`,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    router.push("/login");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Toko Jaya Abadi
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please fill in the form below to complete your registration
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="daffazuhdii"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="fullname">Full name</Label>
            <Input
              id="fullname"
              placeholder="Daffa Zuhdii"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="emailexample@mail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
