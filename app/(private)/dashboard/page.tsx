"use client"
import React from 'react'
import { useSession, signOut } from "next-auth/react";

const Dashboard = () => {
   const { data: session } = useSession();
  //  const dd = await auth()
  //  console.log(dd,'**************');
   
   console.log(session)
  return (
    <div>Dashboard <br />
    <p>sign in with {session?.user?.name}</p>
        <button
        onClick={() => {
          signOut();
        }}
        className="mt-5 bg-red-500 text-white px-5 py-2 rounded cursor-pointer"
      >
        Logout
        </button>
    </div>

  )
}

export default Dashboard