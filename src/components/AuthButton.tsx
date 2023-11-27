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
    <div className="md:flexCenter hidden medium-16 text-blue-500 flexCenter cursor-pointer transition-all hover:font-bold">
      <form action={signOut}>
        <button className=""> 
          Logout
        </button>
      </form>
    </div>
  ) 
}
