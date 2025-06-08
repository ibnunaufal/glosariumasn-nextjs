// import Avatar from '@/components/Avatar';
"use client";
import HeadComponent from "@/components/HeadComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/utils/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // router.push("/login");
      } else {
        // console.log(JSON.stringify(authUser));
        setUser(authUser);
      }
    });
    // getNextPrayer();
    // console.log(JSON.stringify(user));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <div className="h-screen py-2">
      <HeadComponent title={`Profile`} />
      {user && (
        <div>
          <div className="flex flex-col items-center">
            <Avatar className="mb-2">
              <AvatarFallback>
                {String(user.displayName).substring(0, 3)}
              </AvatarFallback>
            </Avatar>
            <span className=" text-sm">{user.displayName}</span>
            <span className=" text-sm mb-4">{user.email}</span>
          </div>

          <div>

          </div>

          <hr className="my-4" />
          <div className="flex justify-center">
            <Button className="w-fit" onClick={handleLogout}>
              <LogOut className="mr-1 w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
