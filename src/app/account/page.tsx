import { createClient } from '../../utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const { data: account } = await supabase.from("account").select();

  return <pre>{JSON.stringify(account, null, 2)}</pre>
}