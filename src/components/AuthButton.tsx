//import { createClient } from './../utils/supabase/server'
//import { createClient } from '../utils/supabase/client'
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { useState } from "react"

export default function AuthButton() {
  //const cookieStore = cookies()
  //const supabase = createClient(cookieStore)
  const supabase = createClientComponentClient()
  //const {
   // data: { user },
  //} = await supabase.auth.getUser()
  //console.log("tess userr", user);
  // const userNow = async () => {
  //   const {data: {user}, error} = await supabase.auth.getUser()
  //   if(error){
  //     console.log("get user err", error);
  //   }
  //   if(user){
  //     setEmailUser(user?.email)
  //   }
    
  // }

  const signOut = async () => {
    // 'use server'

    //const cookieStore = cookies()
    //const supabase = createClient(cookieStore)
    const {error} = await supabase.auth.signOut()
    if(error){
      console.log("logout err", error);
    }
    return redirect('/login')
  }

  return (
    <div className="">
      <form action={signOut}>
        <button className=""> 
          Logout
        </button>
      </form>
    </div>
  ) 
}
// py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover



// import { createClient } from './../utils/supabase/server'
// import Link from 'next/link'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

// export default async function AuthButton() {
//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore)

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   const signOut = async () => {
//     'use server'

//     const cookieStore = cookies()
//     const supabase = createClient(cookieStore)
//     await supabase.auth.signOut()
//     return redirect('/login')
//   }

//   return user ? (
//     <div className="flex items-center gap-4">
//       Hey, {user.email}!
//       <form action={signOut}>
//         <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
//           Logout
//         </button>
//       </form>
//     </div>
//   ) : (
//     <Link
//       href="/login"
//       className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
//     >
//       Login
//     </Link>
//   )
// }
