import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PlaceholderImage from "../../public/icons/Logo-Mine.png"
import { NAV_ADMIN } from '../constants'
import { link } from 'fs'

const Navbar = () => {
  return (
    <nav className='flexBetween max-container padding-container relative z-30 px-5 py-3'>
      <Link href="/">
        <Image src={PlaceholderImage} alt="logo" width={120}/>
      </Link>

      <ul className='hidden h-full gap-12 lg:flex'>
        {NAV_ADMIN.map((link) => (
          <Link href={link.href} key={link.key} className='medium-16 text-blue-500 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold'>
            {link.label}
          </Link>
        ))}
      </ul>

      <div className='lg:flexCenter hidden'>
        
      </div>

    </nav>
  )
}

export default Navbar