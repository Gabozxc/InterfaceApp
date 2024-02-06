"use client"
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '@/context/authContext';

export default function Navigation() {
  const { dispatch } = useContext(AuthContext);
  const [token, setToken] = useState<string | null>("");
  const { state } = useContext(AuthContext);

  useEffect(() => {
    setToken(state.token);
  }, [state.token]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-4xl">
        <div className="text-sm lg:flex-grow">
          {!token ? <>
            <Link href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Login
            </Link>
            <Link href="/signup" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Sign up
            </Link>
          </> : <>
            <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Home
            </Link>
            <button
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              onClick={() => {
                dispatch({ type: "REMOVE_TOKEN" });
                localStorage.removeItem('token');
              }}
            >
              Log out
            </button>


          </>
          }

        </div>
      </div>
    </nav>

  );
}