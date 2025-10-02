# KLAB Desafio Claudio Alvarenga — Next.js Frontend

## Requisitos atendidos (histórico)
- **KLAB-0001**: Input CEP com máscara + API ViaCEP (proxy backend)
- **KLAB-0001**: Fluxo `/api/lookup` agregando CEP + gravação em cookie
- **KLAB-0002**: Endpoint `/api/weather` consumindo AccuWeather
- **KLAB-0002**: Exibir temperatura e condição meteorológica na Home
- **KLAB-0003**: Persistência de sessão via cookie `klab_history` e histórico ordenável em `/historico`
- **KLAB-0003**: Atualização de item existente (movido para o topo) e limite de 10 registros
- **KLAB-0004**: Style: Tailwind + layout responsivo`
- **KLAB-0004**: Docs: README com instruções`

## Config
- **Substituir env.example por env.local**: Inserir chave valida para funcionamento da api Weather.

## Rodando o projeto
```bash
npm install
npm run dev
# abra http://localhost:3000
