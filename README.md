# Controle de Gastos

Aplicação web para gerenciar receitas e despesas pessoais, desenvolvida como projeto da AV1 do curso OxeTech Full Stack.

## Tema escolhido

**Controle de Gastos** — permite lançar receitas e despesas, visualizar o saldo total e organizar os lançamentos por categoria.

## Funcionalidades

- Adicionar lançamentos com descrição, valor, categoria e tipo (receita ou despesa)
- Remover lançamentos da lista
- Visualizar totais de receitas, despesas e saldo em tempo real
- Validação de campos: não é possível adicionar item com campos vazios ou valor inválido

## Tecnologias utilizadas

- **HTML5** — estrutura semântica (`header`, `main`, `footer`, `section`, `article`)
- **CSS3** — Flexbox, variáveis CSS, media queries e responsividade
- **Bootstrap 5** — sistema de Grid, cards, botões, alertas e formulários
- **JavaScript** — manipulação de DOM (adicionar, remover e validar itens)

## Estrutura de arquivos

```
controle-de-gastos/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

## Como executar

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` no navegador
3. Não é necessário instalar dependências — o Bootstrap é carregado via CDN

## Requisitos atendidos (AV1)

| Critério | Implementação |
|----------|---------------|
| HTML semântico | `header`, `main`, `footer`, `section`, `article` |
| CSS com Flexbox | Layout do header, lista e itens com `display: flex` |
| Responsividade | Media queries em 768px e 480px, `flex-wrap` nos itens |
| Bootstrap | Grid (`row`/`col`), cards, botões, alertas e formulários |
| JavaScript DOM | Adicionar, remover e validar lançamentos dinamicamente |
