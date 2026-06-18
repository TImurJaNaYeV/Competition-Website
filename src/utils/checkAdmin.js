import { supabase } from '../supabaseClient';

export async function checkIsAdmin(userId) {
  console.log('[checkIsAdmin] checking userId:', userId);
  const { data, error } = await supabase
    .from('admins')
    .select('id')
    .eq('id', userId)
    .maybeSingle();
  console.log('[checkIsAdmin] query result — data:', data, '| error:', error);
  return !!data;
}
