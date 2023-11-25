import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import icon from '../../../public/icons/online 1.svg'
import Image from 'next/image'
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
  const signIn = async (account: FormData) => {
    'use server'

    const email = account.get('email') as string
    const password = account.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Gagal Mengautentikasi Pengguna')
    }

    return redirect('/account')
  }

  return (
    <div>
      <Navbar 
      listOfNav={
          (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : (isInventaris ? NAV_INVENTARIS : NAV_PUBLIC)))
      }
      />
      <div className="animate-in flex-1 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg_dashboard">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <Image src={icon} alt="Logo" className="h-25 w-25" />
            </div>
            {/* Welcome Text */}
            <h1 className="flex justify-center bold-32 heading">Welcome</h1>

          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            action={signIn}
          >
            <label className="medium-16 heading" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-3"
              name="email"
              placeholder="Masukkan email anda"
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
              required
            />
            <button formAction={signIn} className="btn_blue rounded-md px-4 py-2 semibold-16 mb-3">
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
