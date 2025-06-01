import { createClient } from '@supabase/supabase-js'

// Coloque aqui sua URL do projeto Supabase e a service_role key
const supabaseUrl = 'https://SEU-PROJETO.supabase.co'
const supabaseKey = 'SUA-CHAVE-SERVICE-ROLE' // Atenção: chave sensível, não divulgue!

const supabase = createClient(supabaseUrl, supabaseKey)

async function criarUsuarioDeTeste() {
  const email = 'teste1@exemplo.com'
  const password = 'senha123'

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError) {
    console.error('Erro ao criar usuário:', authError.message)
    return
  }

  const user = authData.user

  const { error: perfError } = await supabase
    .from('perfis')
    .insert([
      {
        user_id: user.id,
        email: user.email,
        plano: 'básico',
        acessos: 'ilimitado',
      },
    ])

  if (perfError) {
    console.error('Erro ao criar perfil:', perfError.message)
  } else {
    console.log('Usuário e perfil criados com sucesso!')
  }
}

criarUsuarioDeTeste()
