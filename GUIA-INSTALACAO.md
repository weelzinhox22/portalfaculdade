# 🚀 Guia de Instalação - Sistema de Autenticação e Questões da Comunidade

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Conta no Supabase (gratuita)
- Git (opcional)

## 🔧 Passo 1: Configurar o Supabase

### 1.1 Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha um nome e senha para o banco
5. Aguarde a criação (2-3 minutos)

### 1.2 Obter Credenciais
1. No painel do projeto, vá em **Settings > API**
2. Copie a **URL** do projeto
3. Copie a **anon/public key**

### 1.3 Configurar o Banco de Dados
1. Vá em **SQL Editor** no painel lateral
2. Cole o conteúdo do arquivo `database-schema.sql`
3. Clique em **Run** para executar

**⚠️ Se houver erro de triggers:**
1. Execute o arquivo `database-fix-triggers.sql` no SQL Editor
2. Isso corrigirá conflitos de triggers duplicados

## ⚙️ Passo 2: Configurar o Frontend

### 2.1 Configurar Credenciais
1. Abra o arquivo `src/config/supabase.js`
2. Substitua as credenciais:
```javascript
const supabaseUrl = 'https://SEU-PROJETO.supabase.co'
const supabaseAnonKey = 'SUA-CHAVE-ANONIMA'
```

### 2.2 Instalar Dependências (se necessário)
```bash
npm install @supabase/supabase-js
```

### 2.3 Iniciar o Servidor
```bash
npm run dev
```

## ✅ Passo 3: Testar o Sistema

### 3.1 Testar Autenticação
1. Acesse `http://localhost:5176`
2. Clique no ícone de login no header
3. Crie uma conta de teste
4. Verifique se o perfil é criado automaticamente

### 3.2 Testar Questões da Comunidade
1. Faça login
2. Clique no ícone "+" no header
3. Crie uma questão de teste
4. Acesse "Questões da Comunidade" na home
5. Verifique se a questão aparece (status: pending)

### 3.3 Aprovar Questão (Opcional)
1. No Supabase, vá em **Table Editor**
2. Abra a tabela `community_questions`
3. Encontre sua questão
4. Mude o `status` de `pending` para `approved`
5. A questão aparecerá na listagem pública

## 🔍 Verificação de Funcionamento

### ✅ Checklist de Funcionalidades

#### Autenticação:
- [ ] Registro de usuário funciona
- [ ] Login funciona
- [ ] Perfil é criado automaticamente
- [ ] Logout funciona
- [ ] Perfil pode ser editado

#### Questões da Comunidade:
- [ ] Criação de questão funciona
- [ ] Questão é salva no banco
- [ ] Listagem de questões funciona
- [ ] Filtros funcionam
- [ ] Modal de detalhes funciona
- [ ] Sistema de votação funciona

#### Interface:
- [ ] Header mostra botões corretos (logado/não logado)
- [ ] Modais abrem e fecham corretamente
- [ ] Design responsivo funciona
- [ ] Navegação entre páginas funciona

## 🐛 Solução de Problemas Comuns

### Erro: "Invalid API key"
- Verifique se copiou a chave correta do Supabase
- Certifique-se de usar a chave **anon/public**, não a service key

### Erro: "relation does not exist"
- Execute o arquivo `database-schema.sql` no SQL Editor
- Verifique se todas as tabelas foram criadas

### Erro: "trigger already exists"
- Execute o arquivo `database-fix-triggers.sql`
- Isso remove e recria todos os triggers

### Erro: "Row Level Security"
- As políticas RLS estão configuradas no schema
- Se houver problemas, desabilite temporariamente:
```sql
ALTER TABLE nome_da_tabela DISABLE ROW LEVEL SECURITY;
```

### Questões não aparecem na listagem
- Verifique se o status da questão é `approved`
- Questões com status `pending` só aparecem para o autor

## 📊 Estrutura do Banco de Dados

### Tabelas Principais:
- `profiles` - Dados dos usuários
- `community_questions` - Questões da comunidade
- `question_votes` - Votos nas questões
- `simulado_progress` - Progresso nos simulados
- `simulado_results` - Resultados finais
- `user_notes` - Anotações dos usuários

### Políticas de Segurança:
- Usuários só veem seus próprios dados
- Questões aprovadas são públicas
- Votos são protegidos por usuário
- Perfis são editáveis apenas pelo dono

## 🚀 Próximos Passos

### Funcionalidades Prontas para Implementar:
1. **Sistema de Moderação** - Painel para aprovar questões
2. **Salvamento de Progresso** - Nos simulados
3. **Anotações** - Sistema já preparado
4. **Estatísticas** - Dados já coletados
5. **Gamificação** - Pontos e rankings

### Melhorias Sugeridas:
1. **Email de Confirmação** - Configurar no Supabase
2. **Reset de Senha** - Já suportado pelo Supabase
3. **Upload de Imagens** - Para questões com figuras
4. **Notificações** - Para novas questões aprovadas
5. **API de Busca** - Busca avançada nas questões

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador para erros
2. Verifique o painel de logs do Supabase
3. Confirme se todas as tabelas foram criadas
4. Teste as credenciais do Supabase

## 🎉 Parabéns!

Se chegou até aqui, seu sistema está funcionando! Agora você tem:
- ✅ Autenticação completa
- ✅ Sistema de questões da comunidade
- ✅ Interface moderna e responsiva
- ✅ Banco de dados seguro
- ✅ Funcionalidades prontas para expansão

O portal agora é uma plataforma colaborativa completa! 🚀
