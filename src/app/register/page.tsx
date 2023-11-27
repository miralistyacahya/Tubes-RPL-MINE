"use client"

import Link from 'next/link'
import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import icon from '../../../public/icons/online 1.svg'
import Image from 'next/image'
import Navbar from '@/src/components/Navbar';
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from '@/src/constants';

const isAdmin = false 
const isKasir = false
const isInventaris = false

export default function Register({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const router = useRouter();

  const signUp = async (account: FormData) => {
    const supabase = createClient();

    const origin = window.location.origin;
    const username = account.get('username') as string;
    const email = account.get('email') as string;
    const password = account.get('password') as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    try {
      const role = ''
      const { data : responsedata, error: err } = await supabase
      .from('account')
      .upsert([{username: username, password: password, role: role, email: email}])
    } catch (err) {
      console.log(err);
    }
    
    if (error) {
      router.push('register?message=Gagal Mendaftarkan Pengguna')
    }

    router.push('login')
  }

  return (
    <div>
      <Navbar 
      listOfNav={
          (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : (isInventaris ? NAV_INVENTARIS : NAV_PUBLIC)))
      }
      />
      <div className="animate-in flex-1 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg_dashboard">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
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
              signUp(new FormData(e.currentTarget));
            }}
          >
            <label className="medium-16 heading" htmlFor="username">
              Username
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-3"
              name="username"
              placeholder="Masukkan username anda"
              required
            />
            <label className="block" htmlFor="email">
              <span className="medium-16 heading">Email</span>
            
            <input
              className="rounded-md px-4 py-2 bg-inherit border my-2 w-full peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              type="email"
              name="email"
              placeholder="Masukkan email anda"
              required
              pattern={
                '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
              }
            />
            <span className="hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Harap masukkan alamat email yang valid
            </span>
            </label>
            <label  htmlFor="password" className='block'>
            <span className="block medium-16 heading">Password</span>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mt-2 mb-4 w-full peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <span className="hidden text-sm mb-2 text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Harap masukkan paling tidak 6 karakter
            </span>
            </label>
            <button type="submit" className="btn_blue rounded-md px-4 py-2 semibold-16 mb-3">
              Daftar
            </button>

            <p className="flexCenter regular-14">
              Sudah terdaftar ? 
              <Link href='login' className="text-blue-500 hover:text-blue-600 px-1">
                Masuk ke akunmu
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