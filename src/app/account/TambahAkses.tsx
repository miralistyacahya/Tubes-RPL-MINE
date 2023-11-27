'use client'

import TambahDataDropdown from '@/src/components/modal/TambahDataDropdown'
import React from 'react'
import IconAddTop from "../../../public/icons/add-button-top-table.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
 
const TambahAkses: React.FC = () => {
    const signUp = async (newAkun: Record<string, string>) => {
    
        // const origin = headers().get('origin')
        const username = newAkun["username"]
        const password = newAkun["password"]
        const role = newAkun["role"]
        const email = newAkun["email"]
        // const cookieStore = cookies()
        console.log(password, email)

        const supabase = createClientComponentClient()
    
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
          },
        })

        if(error){
            console.log(error)
            // return redirect('/account?message=Could not authenticate user')
        }
        // return redirect('/account')
    };

  return (
        <TambahDataDropdown tableName="account" columns={["username", "password", "role", "email"]} formTitle= {["Username", "Password", "Role", "Email"]} label="Akses" icon={IconAddTop} colToBeValidate="username" dropdownCol="role" dropdownVal={["admin", "kasir", "inventaris"]} signUp={signUp}/>

  );
}

export default TambahAkses;