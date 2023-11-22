import { headers, cookies } from 'next/headers'
import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import './pagelogin.css'
import icon from '../../../public/icons/online 1.svg'
import Image from 'next/image'

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

  return (

    <div className="main-container">
      {/* Header */}
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <Image src= {icon} alt="Logo" />
          <div className="regular-30 heading">MINE</div>
        </div>
      </div>

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
  )
}


