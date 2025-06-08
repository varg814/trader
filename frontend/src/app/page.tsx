'use client'
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import Button from "./components/atoms/Button/Button";

interface User {
  fullName: string;
  email: string;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");

    if (!token) {
      router.push("/auth/sign-in");
      return;
    }

    const getUser = async () => {
      try {
        const resp = await fetch("http://localhost:5000/auth/current-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (resp.status === 200) {
          const data = await resp.json();
          setUser(data);
        } else {
          deleteCookie("accessToken");
          router.push("/auth/sign-in");
        }
      } catch (error) {
        console.log(error);
        deleteCookie("accessToken");
        router.push("/auth/sign-in");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

    const handleLogout = () => {
    deleteCookie("accessToken");
    router.push("/auth/sign-in");
  };

  return (
    <div>
      <h1>{user.fullName}</h1>
      <h1>{user.email}</h1>
      <Button onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Page;
