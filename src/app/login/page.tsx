import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import icon from '../../../public/icons/online 1.svg'
import Image from 'next/image'
import Navbar from '@/src/components/Navbar';
import { NextResponse, type NextRequest } from 'next/server'
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from '@/src/constants';
// import { useEffect, useState } from 'react'

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

    // const [jwt, setJwt] = useState(null)

    // useEffect(()=>{
    //   const {user, session} = supabase.auth.getSession()
    //   if (user &&session){
    //     setJwt(session.access_token)
    //   }
    // }, [])
    try {
      const {data: {user},} = await supabase.auth.getUser()
      console.log("ini user", user)

      let role;
      const {data: roles} = await supabase.from('account').select('role').eq('email', user?.email);
      
      if(roles && roles.length> 0) {
        role = roles[0].role;
        console.log("ini role", role);

        // const router = useRouter();

        if (role === "admin") {
          console.log("Redirecting to /account");
          // Use Next.js router to perform client-side redirect
          return redirect('/account');
          // return NextResponse.next(); // Return a response (optional)
        } else if (role === "kasir") {
          // Use Next.js router to perform client-side redirect
          return redirect('/cart');
          // return NextResponse.next(); // Return a response (optional)
        } else if (role === "inventaris") {
          console.log("Redirecting to /product");
          // Use Next.js router to perform client-side redirect
          return redirect('/product');
          // return NextResponse.next(); // Return a response (optional)
        }
      }

    } catch(error){
      console.log(error)
    }
    // const { data: accountData, error: accountError } = await supabase
    //   .from('account')
    //   .select('email')
    //   .eq('email', supabase.auth.) 
    //   .single();

    // if (accountError) {
    //   // Handle error fetching role information
    //   console.error('Error fetching role information:', accountError);
    //   return redirect('/');
    // }

    // Check the user's role
    // const role = "admin" //accountData?.role as string;

    // if (role === 'admin') {
    //   return redirect('/account');
    // } else if (role === 'kasir') {
    //   return redirect('/cart');
    // } else if (role === 'inventaris') {
    //   return redirect('/product');
    // }
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
