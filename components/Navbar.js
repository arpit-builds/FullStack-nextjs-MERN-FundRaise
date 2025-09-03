"use client"
import React from 'react'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className='flex justify-between items-center bg-gray-900 text-white px-4 md:h-20 h-14'>
      <div>
        <Link href={"/"} className="logo font-bold flex items-center">
          <img className='' width={50} src="/mon-e.gif" alt="" />
          <span>Fund-Raise</span>
        </Link>
      </div>
      {/* <ul className='flex gap-4'>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
      </ul> */}
      <div className='relative'>
        {session && <>
          <button onClick={() => setShowDropDown(!showDropDown)} onBlur={() => setTimeout(() => setShowDropDown(false), 100)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Account
            {/* Animated Arrow Icons */}
            <span className="relative w-2.5 h-2.5 ms-3 inline-block">
              {/* Down Arrow */}
              <svg
                className={`absolute left-0 top-0 w-2.5 h-2.5 transition-all duration-200 ease-in-out ${showDropDown ? 'opacity-0 translate-y-1 scale-75' : 'opacity-100 translate-y-0 scale-100'}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
              {/* Up Arrow */}
              <svg
                className={`absolute left-0 top-0 w-2.5 h-2.5 transition-all duration-200 ease-in-out ${showDropDown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-75'}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 5 4-4 4 4"
                />
              </svg>
            </span>
          </button>

          <div id="dropdown" className={`z-10 mt-3 ${showDropDown ? "" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[118px] dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href={"/"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
              </li>
              <li>
                <Link href={"/about"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
              </li>
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link onClick={() => signOut({ redirect: false })} href={"/"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
              </li>
            </ul>
          </div>
        </>}
        {!session && <Link href={"/login"}><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">Login</button></Link>}
      </div>
    </nav>
  )
}

export default Navbar
