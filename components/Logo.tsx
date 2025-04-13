'use client';

import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export const navItems = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Luxury Men',
        href: '/luxury-men',
    },
    {
        label: 'Luxury Female',
        href: '/luxury-female',
    },
    {
        label: 'Concert captures',
        href: '/concert-pics',
    },
    {
        label: 'Beach Vibes',
        href: '/beach-pics',
    },
    {
        label: 'Dinner',
        href: '/dinner-pics',
    },
    {
        label: 'Studio Shoot',
        href: '/studio-work',
    },
    {
        label: 'Contact Me',
        href: '/contact',
    }
]

export default function Logo(){
    const [show, setShow] = useState(false)
    return (
        <div className="flex flex-col ">
        <div className="w-full flex items-center justify-between p-3 sticky bg-black/80 bg-blur-4xl">
            <h2 className="font-bold flex items-center text-3xl  text-yellow">
                {/* <Image 
               src='/camera.png'
               alt='camera'
               width={32} 
               height={32} /> */}
               #Olalifestyle 
               </h2>
            
               
            <div className='flex items-center gap-5'>
            <button
             className="bg-blur-3xl hover:bg-black/80 rounded-full transition-all delay-300 "
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#fff"} fill={"none"}>
                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </button>
            <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#fff" fill="none">
                <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </button>
            </div>
            

    
            
        </div>
        <nav className="flex gap-4 p-2 flex-wrap sticky top-0 right-0 left-0 text-white items-center justify-center  w-full ">
                    {navItems.map(({ label, href }) => (
                        <Link
                         href={href} 
                         key={label} 
                         className="leading-6  hover:text-yellow hover:underline transition-all duration-300 uppercase text-sm md:text-xl !font-normal ">
                            <h1>{label}</h1>
                        </Link>

                    ))}
        </nav>
        </div>
    )
}