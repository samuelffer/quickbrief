# Documentação do QuickBrief

## Visão Geral

O QuickBrief é uma plataforma web abrangente para pilotos virtuais, oferecendo um conjunto de ferramentas essenciais para melhorar a experiência de simulação de voo. O site apresenta um design minimalista e moderno, com suporte a múltiplos idiomas e alternância entre temas claro e escuro.

## Estrutura do Projeto

```
quickbrief_v3/
├── css/
│   └── styles.css              # Estilos principais do site
├── js/
│   ├── calculators/            # Scripts das calculadoras
│   │   ├── tod-calculator.js   # Calculadora de Topo de Descida
│   │   ├── wind-calculator.js  # Calculadora de Vento
│   │   └── fuel-calculator.js  # Calculadora de Combustível
│   ├── language.js             # Sistema multilíngue
│   ├── theme.js                # Alternância de tema claro/escuro
│   ├── weather.js              # Integração com API de clima
│   ├── extraction.js           # Extração de dados do briefing
│   └── main.js                 # Funcionalidades comuns e animações
├── languages/
│   ├── en.json                 # Traduções em inglês
│   ├── pt-br.json              # Traduções em português do Brasil
│   ├── pt.json                 # Traduções em português de Portugal
│   └── es.json                 # Traduções em espanhol
├── images/                     # Imagens e ícones
├── index.html                  # Página inicial
├── briefing-extractor.html     # Extrator de briefing
├── weather.html                # Informações meteorológicas
├── tod-calculator.html         # Calculadora TOD
├── wind-calculator.html        # Calculadora de vento
├── fuel-calculator.html        # Calculadora de combustível
└── about.html                  # Página sobre
```

## Funcionalidades Principais

### 1. Sistema Multilíngue

O QuickBrief suporta quatro idiomas: inglês, português do Brasil, português de Portugal e espanhol. O sistema de idiomas é baseado em arquivos JSON que contêm todas as traduções necessárias.

**Como funciona:**
- Os arquivos de idioma estão localizados na pasta `languages/`
- Cada elemento de texto no site possui um atributo `data-i18n` que corresponde a uma chave no arquivo JSON
- O sistema carrega o arquivo do idioma selecionado e substitui o texto de todos os elementos
- A preferência de idioma é salva no localStorage do navegador

**Como modificar:**
- Para adicionar um novo idioma, crie um novo arquivo JSON na pasta `languages/` seguindo o mesmo formato dos existentes
- Para adicionar novas strings, adicione as chaves correspondentes em todos os arquivos de idioma
- Para modificar traduções existentes, edite os valores nas chaves correspondentes

### 2. Sistema de Tema Claro/Escuro

O QuickBrief possui dois temas: claro e escuro, com alternância fácil através de um botão na interface.

**Como funciona:**
- O tema é controlado pelo atributo `data-theme` no elemento HTML raiz
- As variáveis CSS definem cores diferentes para cada tema
- A preferência de tema é salva no localStorage do navegador

**Como modificar:**
- Para ajustar as cores dos temas, edite as variáveis CSS no arquivo `css/styles.css`
- Para adicionar novos elementos que respondem ao tema, use as variáveis CSS existentes

### 3. API de Clima (AVWX)

O QuickBrief integra-se com a API AVWX para fornecer informações meteorológicas precisas para aeroportos.

**Como funciona:**
- A API AVWX é acessada através de requisições HTTP
- Os dados são processados e exibidos na interface de forma organizada
- Informações como METAR, TAF, pistas ativas e dados de vento são exibidos

**Como modificar:**
- Para alterar a chave da API, edite a constante `AVWX_API_KEY` no arquivo `js/weather.js`
- Para modificar a exibição dos dados, edite as funções de exibição no mesmo arquivo

### 4. Extrator de Briefing

O extrator de briefing analisa o texto do briefing do SimBrief e extrai informações importantes.

**Como funciona:**
- O texto do briefing é processado por expressões regulares para identificar padrões
- Os dados extraídos são organizados em categorias e exibidos na interface
- Suporta múltiplos formatos de briefing do SimBrief

**Como modificar:**
- Para ajustar os padrões de extração, edite as expressões regulares no arquivo `js/extraction.js`
- Para adicionar novos campos a serem extraídos, adicione novos padrões e funções de processamento

### 5. Calculadoras

O QuickBrief inclui várias calculadoras úteis para pilotos virtuais:

**Calculadora TOD (Topo de Descida):**
- Calcula o ponto ideal para iniciar a descida
- Considera altitude de cruzeiro, altitude alvo, velocidade no solo e ângulo de descida
- Fornece visualização gráfica da trajetória de descida

**Calculadora de Vento:**
- Calcula correções de vento, componentes de vento cruzado e de frente
- Determina o ângulo de correção necessário para manter o curso desejado

**Calculadora de Combustível:**
- Estima requisitos de combustível com base na distância, tipo de aeronave e condições de voo
- Calcula combustível de viagem, contingência, alternado, reserva e total

**Como modificar:**
- Cada calculadora tem seu próprio arquivo JavaScript na pasta `js/calculators/`
- Para ajustar fórmulas ou adicionar novos cálculos, edite os arquivos correspondentes

### 6. Animações e Loading

O QuickBrief inclui animações suaves e um sistema de loading real para melhorar a experiência do usuário.

**Como funciona:**
- As animações são implementadas com CSS e controladas por JavaScript
- O sistema de loading exibe um indicador visual durante operações assíncronas
- As transições entre páginas e elementos são suaves e responsivas

**Como modificar:**
- Para ajustar as animações, edite as classes CSS no arquivo `js/main.js`
- Para modificar o comportamento do loading, edite as funções `showLoading` e `hideLoading`

## Guia de Personalização

### Adicionando Novas Páginas

Para adicionar uma nova página ao QuickBrief:

1. Crie um novo arquivo HTML usando um dos existentes como modelo
2. Adicione o link para a nova página no menu lateral em todos os arquivos HTML
3. Adicione as traduções necessárias nos arquivos de idioma
4. Crie os arquivos JavaScript necessários para a funcionalidade da página

### Modificando o Design

Para modificar o design do QuickBrief:

1. Edite o arquivo `css/styles.css` para ajustar cores, fontes, espaçamentos, etc.
2. Para alterações específicas de tema, modifique as variáveis CSS no início do arquivo
3. Para alterações de layout, ajuste as classes de grid e flexbox

### Adicionando Novos Idiomas

Para adicionar um novo idioma ao QuickBrief:

1. Crie um novo arquivo JSON na pasta `languages/` (ex: `fr.json` para francês)
2. Copie a estrutura de um arquivo existente e traduza todos os valores
3. Adicione o novo idioma ao array `AVAILABLE_LANGUAGES` no arquivo `js/language.js`
4. Adicione o novo idioma ao modal de seleção de idioma em todos os arquivos HTML

## Dicas de Desenvolvimento

1. **Teste em diferentes navegadores**: O QuickBrief foi projetado para funcionar em navegadores modernos, mas é sempre bom testar em diferentes navegadores para garantir compatibilidade.

2. **Responsividade**: O design é responsivo e deve funcionar bem em dispositivos móveis e desktop. Ao fazer modificações, teste em diferentes tamanhos de tela.

3. **Performance**: As animações e transições foram otimizadas para performance. Ao adicionar novas animações, certifique-se de que não afetam negativamente a experiência do usuário.

4. **Acessibilidade**: O QuickBrief foi projetado com acessibilidade em mente. Mantenha bons contrastes de cores e estrutura semântica ao fazer modificações.

5. **Modularidade**: O código foi organizado de forma modular para facilitar manutenção e expansão. Mantenha essa abordagem ao adicionar novas funcionalidades.

## Problemas Comuns e Soluções

### Problema: As traduções não estão funcionando
**Solução**: Verifique se os atributos `data-i18n` estão corretos e se as chaves correspondentes existem nos arquivos de idioma.

### Problema: As animações estão lentas
**Solução**: Reduza a complexidade das animações ou ajuste os tempos de transição no arquivo CSS.

### Problema: A API de clima não está retornando dados
**Solução**: Verifique se a chave da API é válida e se o formato da requisição está correto. Consulte a documentação da API AVWX para mais informações.

### Problema: O extrator de briefing não está reconhecendo alguns campos
**Solução**: Ajuste as expressões regulares no arquivo `js/extraction.js` para capturar os padrões específicos do briefing.

## Conclusão

O QuickBrief é uma plataforma versátil e expansível para pilotos virtuais. Com sua arquitetura modular e design responsivo, pode ser facilmente personalizado e expandido para atender às necessidades específicas dos usuários.

Para qualquer dúvida ou sugestão, visite o repositório GitHub do projeto: https://github.com/samuelffer/quickbrief
