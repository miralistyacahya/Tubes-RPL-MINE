"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { createClient } from '@/src/utils/supabase/client';
import { useRouter } from 'next/navigation';
import icon from '../../../public/icons/online 1.svg';
import Image from 'next/image';
import Navbar from '@/src/components/Navbar';
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from '@/src/constants';

const isAdmin = false //role === "admin"
const isKasir = false
const isInventaris = false


export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const signIn = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      router.push('/login?message=Gagal Mengautentikasi Pengguna')
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    console.log("ini user", user)
    console.log("ini email", user?.email)

    let role;
    const {data: roles} = await supabase.from('account').select('role').eq('email', user?.email);
    
    if(roles && roles.length> 0) {
      role = roles[0].role;
      console.log("ini role", role);


      if (role === "admin") {
        console.log("Redirecting to /account");
        router.push('/account');
      } else if (role === "kasir") {
        router.push('/cart')
      } else if (role === "inventaris") {
        console.log("Redirecting to /product");
        router.push('/product');
      }
    }
  }

  return (
    <div>
      <Navbar 
      listOfNav={
          (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : (isInventaris ? NAV_INVENTARIS : NAV_PUBLIC)))
      }
      />
      <div className="animate-in flex-1 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg_dashboard">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <Image src={icon} alt="Logo" className="h-25 w-25" />
            </div>
            {/* Welcome Text */}
            <h1 className="flex justify-center bold-32 heading">Welcome</h1>

          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"

            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <label className="medium-16 heading" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-3"
              name="email"
              placeholder="Masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="medium-16 heading"  htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn_blue rounded-md px-4 py-2 semibold-16 mb-3">
              Masuk
            </button>

            <p className="flexCenter regular-14">
              Belum terdaftar ? 
              <Link href='register' className="text-blue-500 hover:text-blue-600 px-1">
                Daftarkan akunmu
              </Link>
            </p>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
        </div>
      </div>
    </div>  
  )
}
