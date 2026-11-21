# Ecossistema Jesse William (link da bio)

Páginas:
- `index.html`: link da bio (perfil, botões e bloco do YouTube).
- `materiais.html` (/materiais): materiais gratuitos com captura de lead.
- `ferramentas.html` (/ferramentas): ferramentas de IA (lidas do tools.json).
- `portfolio.html` (/portfolio): sites criados (links externos).
- `tryad.html` (jessewilliam.com.br/tryad): página do Grupo Tryad (5 processos + IA).
- `clientes.html` (/clientes): Método Cliente Todo Dia (6 pilares), CTA WhatsApp.
- `guia-trafego-pago-do-zero.html`: página do guia gratuito.
- `privacidade.html`.

Editar rápido:
- `config.js`: número do WhatsApp, mensagem, links do YouTube/Instagram e **ID do Pixel da Meta** (dispara PageView e Contact no clique do WhatsApp).
- `tools.json`: ferramentas de IA (Skill, MCP, GitHub). `materials.json`: materiais gratuitos.
- Foto do Jesse: só no cabeçalho de perfil (index) e no avatar pequeno do menu das outras páginas (imagem embutida no HTML).

Visual: fundo escuro quadriculado, laranja #FF6B1A, Archivo + JetBrains Mono + Caveat.

## Publicar
1. `git init && git add . && git commit -m "biblioteca" ` e envie para o GitHub.
2. Na Vercel: Add New > Project > importe o repositório (Framework: Other, sem build).
3. Settings > Environment Variables: `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (use a *service_role*, nunca no front).
4. Link da bio: `https://SEU-DOMINIO/?utm_source=instagram&utm_medium=bio`

## Supabase (quando for configurar)
Crie o projeto, rode `supabase/schema.sql` no SQL Editor e copie URL e service_role em Project Settings > API.
Sem essas variáveis o site funciona, mas **não salva os leads** (aparece aviso nos logs).

## Ver os leads e interesses
`select * from lead_interests;` (quem pegou o quê) ou a tabela `downloads` (histórico por material e origem).

## Editar materiais
Altere `materials.json`. Coloque os arquivos em `materiais/`. `"status":"soon"` vira lista de espera.
Os arquivos em `materiais/` ficam acessíveis por link direto; para acesso protegido, o próximo passo é Supabase Storage com link assinado.

## Antes de divulgar
Complete `privacidade.html` e teste o fluxo com seus dados.

## Estrutura
- `index.html`: link da bio (perfil, botões e bloco do YouTube).
- `materiais.html` (/materiais): materiais gratuitos com captura de lead.
- `ferramentas.html` (/ferramentas): ferramentas de IA (lidas do tools.json).
- `styles.css` e `lead.js`: visual e formulário compartilhados pelas duas páginas.
- `materials.json`: catálogo. Use `"page"` para o card apontar para uma página própria; `"status":"soon"` vira lista de espera.
- Kit Cliente na Internet e Planilha de Leads estão como "em breve". Para liberar, mude o status para `available`, adicione `file` e coloque o arquivo em `materiais/`.

Teste local: as páginas abrem com dois cliques (os links usam `.html`). Ao editar `materials.json` ou `tools.json`, o site no ar usa os JSON; a cópia embutida em `materiais.html`/`ferramentas.html` só serve para abrir direto do PC. O envio do formulário só funciona no ar (Vercel).
