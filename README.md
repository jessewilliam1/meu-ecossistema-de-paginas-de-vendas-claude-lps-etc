# Ecossistema Jesse William (link da bio)

Páginas:
- `index.html`: hub do link da bio (YouTube, Instagram, WhatsApp, materiais gratuitos com captura de lead, ferramentas de IA).
- `clientes.html`: landing page do serviço (máquina de clientes) para receber tráfego pago. CTA vai pro WhatsApp.
- `guia-trafego-pago-do-zero.html`: página do guia gratuito.
- `privacidade.html`.

Editar rápido:
- `config.js`: número do WhatsApp, mensagem, links do YouTube/Instagram e **ID do Pixel da Meta** (dispara PageView e Contact no clique do WhatsApp).
- `tools.json`: ferramentas de IA (Skill, MCP, GitHub). `materials.json`: materiais gratuitos.
- Bonequinho: `<div class="boneco" data-pose="acena|aponta|joinha|cruzado|notebook|megafone|placa" data-text="texto da placa" data-flip></div>` (adicione `sm` ou `xs` na classe para diminuir). Rosto em `img/jesse-rosto.png`.

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
- `index.html`: biblioteca. O card do guia leva para `/guia-trafego-pago-do-zero`, onde a pessoa informa os dados e baixa.
- `styles.css` e `lead.js`: visual e formulário compartilhados pelas duas páginas.
- `materials.json`: catálogo. Use `"page"` para o card apontar para uma página própria; `"status":"soon"` vira lista de espera.
- Kit Cliente na Internet e Planilha de Leads estão como "em breve". Para liberar, mude o status para `available`, adicione `file` e coloque o arquivo em `materiais/`.
