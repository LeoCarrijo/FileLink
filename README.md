# FileLink 🔗

Uma plataforma segura e eficiente de compartilhamento de arquivos construída com Next.js, Supabase e Cloudflare R2.

## Funcionalidades ✨

- **Upload Seguro de Arquivos**: Upload direto para R2 com URLs pré-assinadas
- **Compartilhamento Rápido**: URLs curtas geradas automaticamente para compartilhamento fácil
- **Autenticação GitHub**: Login seguro com OAuth do GitHub
- **Modo Claro/Escuro**: Alternador de tema integrado
- **Acompanhamento de Progresso**: Monitoramento em tempo real do progresso do upload
- **Design Responsivo**: Funciona perfeitamente em todos os dispositivos

## Stack Tecnológica 🛠️

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Autenticação**: Supabase Auth
- **Armazenamento**: Cloudflare R2
- **Componentes UI**: shadcn/ui
- **Estilização**: Tailwind CSS com Variáveis CSS
- **Qualidade de Código**: Biome (Formatação & Linting)

## Como Começar 🚀

1. Clone o repositório:

```bash
git clone https://github.com/leocarrijo/filelink.git
cd filelink
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Contribuindo 🤝

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/RecursoIncrivel`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona algum RecursoIncrivel'`)
4. Faça push para a branch (`git push origin feature/RecursoIncrivel`)
5. Abra um Pull Request

## Licença 📝

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Agradecimentos 🙏

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
