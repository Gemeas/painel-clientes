import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqrkwqvsammtwpysnpis.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxcmt3cXZzYW1tdHdweXNucGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNTMyMzUsImV4cCI6MjA2MjYyOTIzNX0.125AfMftHn-aDC8_sJXFSe9rs20g0bdwihASo83fTbs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);



