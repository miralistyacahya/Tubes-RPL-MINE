import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PlaceholderImage from "../../public/icons/Logo-Mine.png"
import IconProfile from "../../public/icons/icon-profile.svg"
import IconMenu from "../../public/icons/menu.svg"
import { NAV_ADMIN, NAV_INVENTARIS } from '../constants'
import { link } from 'fs'
import Button from './Button'

// cek role di page, component navbar nerima passing keterangan rolenya siapa, hasil passing dibuat manggil nav_admin/nav_inventaris/nav_kasir

const Navbar = () => {
  return (
    <nav className='flexBetween max-container padding-container bg-white relative z-30 py-3'>
      <Link href="/">
        <Image src={PlaceholderImage} alt="logo" width={88}/>
      </Link>

      <ul className='hidden h-full gap-12 lg:flex'>
        {/* ini nanti diatur rolenya dulu, cek role -> terus di mapping panggil NAV yang siapa */}
        {NAV_INVENTARIS.map((link) => (
          <Link href={link.href} key={link.key} className='medium-16 text-blue-500 flexCenter cursor-pointer transition-all hover:font-bold'>
            {link.label}
          </Link>
        ))}
      </ul>

      <div className='lg:flexCenter hidden'>
        <Button 
          type="button"
          title="Profile"
          icon={IconProfile}
          round="rounded-full"
          variant="btn_blue"
          size="semibold-14"
        />
      </div>

      <Image src={IconMenu} alt="menu" width={24} height={24} className='inline-block cursor-pointer lg:hidden'/>
    </nav>
  )
}

export default Navbar