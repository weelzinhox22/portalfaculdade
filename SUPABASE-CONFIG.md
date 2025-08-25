# Configuração do Supabase para o Portal de Fisioterapia

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha sua organização
5. Preencha:
   - **Name**: Portal Fisioterapia
   - **Database Password**: (crie uma senha segura)
   - **Region**: South America (São Paulo) - para melhor performance no Brasil
6. Clique em "Create new project"
7. Aguarde alguns minutos para o projeto ser criado

### 2. Configurar o Banco de Dados

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `supabase-setup.sql`
4. Cole no editor SQL
5. Clique em "Run" para executar o script
6. Verifique se apareceu "Tabela sugestoes criada com sucesso!"

### 3. Obter as Credenciais

1. Vá para **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL** (algo como: `https://abc123.supabase.co`)
   - **anon public** key (chave longa que começa com `eyJ...`)

### 4. Configurar as Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo `.env`
2. Adicione as seguintes linhas:

```env
VITE_SUPABASE_URL=https://seu-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

3. Substitua pelos valores reais copiados no passo anterior
4. Salve o arquivo

### 5. Testar a Configuração

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse a página de sugestões: `http://localhost:5176/sugestoes`

3. Teste enviando uma nova sugestão

4. Verifique no Supabase se a sugestão foi salva:
   - Vá para **Table Editor**
   - Selecione a tabela `sugestoes`
   - Veja se sua sugestão apareceu na lista

## 🔍 Verificar se Está Funcionando

### No Portal:
- ✅ Sugestões carregam automaticamente
- ✅ Novas sugestões são salvas
- ✅ Votação funciona
- ✅ Não aparecem erros no console

### No Supabase:
- ✅ Tabela `sugestoes` existe
- ✅ Dados aparecem na tabela
- ✅ Votos são incrementados

## 🛠️ Estrutura da Tabela

A tabela `sugestoes` possui os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | BIGSERIAL | ID único (auto-incremento) |
| `titulo` | TEXT | Título da sugestão |
| `descricao` | TEXT | Descrição detalhada |
| `categoria` | TEXT | calculadoras, questoes, conteudo, plataforma, outros |
| `prioridade` | TEXT | baixa, media, alta |
| `status` | TEXT | sugerido, em-analise, em-producao, concluido |
| `autor` | TEXT | Nome do autor |
| `votos` | INTEGER | Número de votos |
| `comentarios` | INTEGER | Número de comentários |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data da última atualização |

## 🔒 Segurança

O sistema está configurado com Row Level Security (RLS) que permite:
- ✅ **Leitura**: Qualquer pessoa pode ver as sugestões
- ✅ **Inserção**: Qualquer pessoa pode criar sugestões
- ✅ **Votação**: Qualquer pessoa pode votar (apenas incremento)
- ❌ **Edição/Exclusão**: Apenas administradores (não implementado ainda)

## 🚨 Troubleshooting

### Erro: "Invalid API key"
- Verifique se a `VITE_SUPABASE_ANON_KEY` está correta
- Certifique-se de que não há espaços extras

### Erro: "Failed to fetch"
- Verifique se a `VITE_SUPABASE_URL` está correta
- Certifique-se de que o projeto Supabase está ativo

### Sugestões não aparecem
- Verifique se o script SQL foi executado corretamente
- Vá no Table Editor e veja se a tabela `sugestoes` existe

### Fallback para dados locais
- Se o Supabase não estiver configurado, o sistema usa dados de exemplo
- Isso é normal durante o desenvolvimento

## 📊 Monitoramento

Para ver as sugestões enviadas pelos usuários:

1. Acesse o painel do Supabase
2. Vá para **Table Editor**
3. Selecione a tabela `sugestoes`
4. Veja todas as sugestões em tempo real

## 🔄 Próximos Passos

Após configurar o básico, você pode:

1. **Implementar autenticação** para identificar usuários
2. **Adicionar sistema de comentários**
3. **Criar painel administrativo** para gerenciar sugestões
4. **Implementar notificações** por email
5. **Adicionar analytics** de uso

---

**Dúvidas?** Verifique a documentação oficial do [Supabase](https://supabase.com/docs) ou abra uma issue no repositório.
