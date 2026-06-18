import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useCompetitionSettings() {
  const [settings, setSettings] = useState({
    round1_date: null,
    round2_date: null,
    final_date:  null,
    loading:     true,
  });

  useEffect(() => {
    supabase
      .from('competition_settings')
      .select('round1_date, round2_date, final_date')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        setSettings({
          round1_date: data?.round1_date ?? null,
          round2_date: data?.round2_date ?? null,
          final_date:  data?.final_date  ?? null,
          loading:     false,
        });
      });
  }, []);

  return settings;
}

export function formatCompetitionDate(iso, lang = 'en') {
  if (!iso) return lang === 'en' ? 'TBA' : 'Уточняется';
  try {
    return new Date(iso).toLocaleDateString(lang === 'en' ? 'en-US' : 'ru-RU', {
      month: 'long',
      day:   'numeric',
      year:  'numeric',
    });
  } catch {
    return 'TBA';
  }
}
