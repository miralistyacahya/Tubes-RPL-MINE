import { headers, cookies } from 'next/headers'
import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import './pagelogin.css'
import icon from '../../../public/icons/online 1.svg'
import Image from 'next/image'
import Navbar from '@/src/components/Navbar';
import { NAV_ADMIN, NAV_INVENTARIS, NAV_KASIR, NAV_PUBLIC } from '@/src/constants';


export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      username,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      username,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  const isAdmin = false //role === "admin"
  const isKasir = false
  const isInventaris = false

  return (
    <div>
    <Navbar 
    listOfNav={
        (isAdmin ? NAV_ADMIN : (isKasir ? NAV_KASIR : (isInventaris ? NAV_INVENTARIS : NAV_PUBLIC)))
    }
    />
    <div className="main-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Background Box */}
        <div className="background-container"></div>

        {/* Welcome Text */}
        <div className="welcome-text">Welcome</div>

        {/* Form */}
        <div className="form-container">
          <div className="form-divider"></div>
          <div className="form-divider"></div>
          {/* Form input fields */}
            <input
              className="form-input"
              name="username"
              placeholder="Username"
              required
            />
            <input
              className="form-input"
              name="password"
              placeholder="Password"
              required
            />
        </div>

        {/* Image */}
        <div className="image-container">
          <Image src= {icon} alt="Logo" />
        </div>

        {/* Login Button */}
        <button className="login-button" onClick={signIn}>
          LOGIN
        </button>
      </div>
    </div>
  </div>
  )
}


