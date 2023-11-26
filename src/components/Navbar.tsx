'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PlaceholderImage from "../../public/icons/Logo-Mine.png"
import IconProfile from "../../public/icons/icon-profile.svg"
import IconMenu from "../../public/icons/menu.svg"
import Button from './Button'
import { NavItem } from '../constants/types'
import { useRouter } from 'next/router'
import AuthButton from './AuthButton'


// cek role di page, component navbar nerima passing keterangan rolenya siapa, hasil passing dibuat manggil nav_admin/nav_inventaris/nav_kasir

const Navbar = ({
  listOfNav
}: {
  listOfNav: NavItem[]
}) => {
  return (
    <nav className='flexBetween max-container padding-container bg-white relative z-30 py-3'>
      <Link href="/">
        <Image src={PlaceholderImage} alt="logo" width={88}/>
      </Link>
      {listOfNav.length >= 1 ? 
        <div className='flex flex-row gap-12 items-center'>
          <ul className='hidden h-full gap-12 md:flex'>
            {/* ini nanti diatur rolenya dulu, cek role -> terus di mapping panggil NAV yang siapa */}
            {listOfNav.map((link) => (
              <Link href={link.href} key={link.key} className='medium-16 text-blue-500 flexCenter cursor-pointer transition-all hover:font-bold'>
                {link.label}
              </Link>
            ))}
          </ul>
          <div className='md:flexCenter hidden medium-16 text-blue-500 flexCenter cursor-pointer transition-all hover:font-bold'>
              <AuthButton/>
          </div>
        </div>
      : 
        <div>
        </div>
      }  
      

      <Image src={IconMenu} alt="menu" width={24} height={24} className='inline-block cursor-pointer md:hidden'/>
    </nav>
  )
}

export default Navbar