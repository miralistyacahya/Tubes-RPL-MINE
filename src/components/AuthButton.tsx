import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import { redirect } from 'next/navigation'

export default function AuthButton() {
  const supabase = createClientComponentClient()

  const signOut = async () => {
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
