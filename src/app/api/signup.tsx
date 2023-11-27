// import { createClient } from "@/src/utils/supabase/server";
// import { NextApiRequest, NextApiResponse } from 'next';
// import { cookies } from "next/headers";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const { username, password, role, email } = req.body;

//     // Your server-side logic for signing up
//     const cookieStore = cookies()
//     const supabase = createClient(cookieStore)
//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         // Add any options you need
//       },
//     });

//     if (error) {
//       console.error('Error signing up:', error);
//       return res.status(500).json({ message: 'Error signing up' });
//     }

//     return res.status(200).json({ message: 'Sign up successful' });
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     return res.status(500).json({ message: 'Unexpected error' });
//   }
// }