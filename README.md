# Forno & Brasa — Pizzaria Virtual

Site demonstrativo de pizzaria, responsivo e focado em conversão, feito com HTML, CSS e JavaScript puro.

## Recursos
- Página inicial com identidade visual e chamadas para ação.
- Cardápio com categorias e busca instantânea.
- Cards de produtos com preço e imagem.
- Carrinho com controle de quantidades e total automático.
- Finalização do pedido via WhatsApp com resumo, nome e endereço.
- Layout adaptável para celular, tablet e desktop.

## Como executar
Abrir `index.html` no navegador ou publicar a pasta em hospedagem estática (GitHub Pages, Netlify, Vercel etc.). Não exige dependências nem build.

## Personalização obrigatória
1. Em `app.js`, substitua `WHATSAPP_NUMBER = ""` pelo número comercial com código do país e DDD, somente números. Exemplo fictício: `5541999999999`.
2. Edite nome, textos e identidade visual em `index.html` e `styles.css`.
3. Atualize a lista `products` em `app.js` com sabores, descrições, preços e imagens reais.
4. Ajuste entrega, horários, área atendida e formas de pagamento.

## Estrutura
```
.
├── index.html
├── styles.css
├── app.js
├── assets/
│   └── favicon.svg
└── README.md
```

## Observações
Front-end demonstrativo. O pedido é encaminhado ao WhatsApp para confirmação manual. Esta versão não inclui banco de dados, painel administrativo, cálculo automático de frete, gateway de pagamento ou integração com entregadores. Imagens de demonstração são carregadas do Unsplash e exigem internet.