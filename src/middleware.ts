import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './utils/supabase/middleware'
export async function middleware(request: NextRequest) {
  try {

    const { supabase, response } = createClient(request)

    const res = NextResponse.next();
    const {data:{session},} = await supabase.auth.getSession()
    // console.log("session", session)

    let role;

    const accAdminPath = "/account";
    const cartKasirPath = "/cart";
    const riwayatKasirPath = "/transaction";
    const produkInventarisPath = "/product";


    if(session) {
      const {data: roles, error} = await supabase.from('account').select('role').eq('email', session?.user.email);
      // console.log("sess", session?.user.email);

      if(roles && roles.length> 0) {
        role = roles[0].role;
        // console.log("hloo role", role);
      }
      
      if(request.nextUrl.pathname.startsWith(accAdminPath) && role!=="admin") {
        return new NextResponse (
          JSON.stringify({ message: "authorization failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
        )
        // throw new Error('Hanya admin yang boleh mengakses')
      } else if((request.nextUrl.pathname.startsWith(cartKasirPath)||request.nextUrl.pathname.startsWith(riwayatKasirPath)) && role!=="kasir") {
        return new NextResponse (
          JSON.stringify({ message: "authorization failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
        )
        // throw new Error('Hanya pegawai kasir yang boleh mengakses')
      } else if(request.nextUrl.pathname.startsWith(produkInventarisPath) && role !=="inventaris"){
        return new NextResponse (
          JSON.stringify({ message: "authorization failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
        )
        // throw new Error('Hanya pegawai inventaris yang boleh mengakses')
      } 
    }
    else{
      // console.log("fafifulalala");
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      return NextResponse.redirect(redirectUrl);
    }

    return response
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: ["/account/:path*", "/product/:path*", "/cart/:path*", "/transaction/:path*"],
};
