# Guia do Usuário - QuickBrief

## Bem-vindo ao QuickBrief!

Este guia irá ajudá-lo a aproveitar ao máximo todas as ferramentas disponíveis no QuickBrief, sua plataforma completa para pilotos virtuais.

![QuickBrief Logo](images/logo.png)

## Índice

1. [Introdução](#introdução)
2. [Primeiros Passos](#primeiros-passos)
3. [Extrator de Briefing](#extrator-de-briefing)
4. [Informações Meteorológicas](#informações-meteorológicas)
5. [Calculadora TOD](#calculadora-tod)
6. [Calculadora de Vento](#calculadora-de-vento)
7. [Calculadora de Combustível](#calculadora-de-combustível)
8. [Dicas e Truques](#dicas-e-truques)
9. [Perguntas Frequentes](#perguntas-frequentes)

## Introdução

O QuickBrief foi desenvolvido para simplificar o planejamento de voos virtuais, oferecendo ferramentas essenciais em uma interface intuitiva e moderna. Seja você um piloto virtual iniciante ou experiente, o QuickBrief irá ajudá-lo a extrair informações importantes do seu briefing, verificar condições meteorológicas e realizar cálculos essenciais para seus voos.

### Principais Recursos

- **Extrator de Briefing do SimBrief**: Extraia rapidamente informações essenciais do seu plano de voo
- **Informações Meteorológicas em Tempo Real**: Acesse METAR, TAF e dados de pista para qualquer aeroporto
- **Calculadoras Especializadas**: TOD, vento e combustível para planejamento preciso
- **Suporte a Múltiplos Idiomas**: Disponível em português do Brasil, português de Portugal, inglês e espanhol
- **Tema Claro/Escuro**: Escolha o tema que melhor se adapta ao seu ambiente

## Primeiros Passos

### Navegação

O QuickBrief possui uma barra lateral com acesso a todas as ferramentas disponíveis:

![Menu Lateral](images/sidebar.png)

- **Início**: Página principal com visão geral das ferramentas
- **Extrator de Briefing**: Extraia informações do seu briefing do SimBrief
- **Meteorologia**: Consulte informações meteorológicas de aeroportos
- **Calculadora TOD**: Calcule o ponto ideal de início de descida
- **Calculadora de Vento**: Calcule correções de vento e componentes
- **Calculadora de Combustível**: Estime requisitos de combustível para seu voo
- **Sobre**: Informações sobre o QuickBrief

### Alterando o Idioma

Para alterar o idioma do QuickBrief:

1. Clique no ícone de globo no canto inferior esquerdo da barra lateral
2. Selecione o idioma desejado no menu que aparece
3. A interface será atualizada automaticamente para o idioma escolhido

![Seletor de Idioma](images/language-selector.png)

### Alterando o Tema

Para alternar entre os temas claro e escuro:

1. Clique no ícone de lua/sol no canto inferior esquerdo da barra lateral
2. O tema será alternado instantaneamente

![Seletor de Tema](images/theme-toggle.png)

## Extrator de Briefing

O Extrator de Briefing é uma ferramenta poderosa que analisa o texto do seu briefing do SimBrief e extrai as informações mais importantes em um formato organizado e fácil de ler.

### Como Usar

1. Acesse o SimBrief e gere seu plano de voo
2. Copie o texto completo do briefing (formato OFP ou similar)
3. No QuickBrief, acesse a página "Extrator de Briefing"
4. Cole o texto na área designada
5. Clique em "Extrair Informações"
6. As informações serão organizadas em categorias para fácil visualização

![Extrator de Briefing](images/briefing-extractor.png)

### Informações Extraídas

O extrator organiza as informações em várias categorias:

- **Informações Básicas**: Callsign, data, origem, destino, aeronave, matrícula
- **Performance**: Índice de custo, altitude de cruzeiro, distâncias
- **Pesos**: Máximos e estimados (TOW, LAW, ZFW)
- **Combustível**: Total, táxi, viagem, contingência, alternado, reserva, extra
- **Tempo**: Partida, chegada, tempo de voo
- **Meteorologia**: Vento médio, desvio ISA, OAT

### Dicas para Extração

- Certifique-se de copiar o texto completo do briefing para obter todos os dados
- O extrator funciona melhor com o formato OFP padrão do SimBrief
- Se alguma informação estiver faltando, verifique se ela está presente no briefing original

## Informações Meteorológicas

A página de Meteorologia permite acessar informações meteorológicas em tempo real para qualquer aeroporto do mundo, incluindo METAR, TAF, informações de pista e dados de vento.

### Como Usar

1. Acesse a página "Meteorologia"
2. Digite o código ICAO do aeroporto desejado (ex: SBGR para Guarulhos)
3. Clique em "Obter Meteorologia"
4. As informações serão exibidas em categorias organizadas

![Informações Meteorológicas](images/weather-info.png)

### Informações Disponíveis

- **METAR**: Relatório meteorológico atual, bruto e decodificado
- **TAF**: Previsão meteorológica, bruta e decodificada
- **Informações de Pista**: Pistas ativas, comprimento, superfície
- **Informações de Vento**: Direção, velocidade, rajadas, componentes de vento cruzado e de frente
- **Informações da Estação**: Nome, elevação, coordenadas

### Entendendo o METAR

O METAR (Meteorological Aerodrome Report) é um formato padronizado para reportar condições meteorológicas em aeroportos. Exemplo:

```
SBGR 250300Z 18008KT 10SM FEW035 SCT250 22/17 A2992 RMK AO2 SLP132 T02170172
```

Decodificado:
- **SBGR**: Código ICAO do aeroporto (Guarulhos)
- **250300Z**: Data e hora (dia 25, 03:00 UTC)
- **18008KT**: Vento de 180° a 8 nós
- **10SM**: Visibilidade de 10 milhas
- **FEW035 SCT250**: Poucas nuvens a 3.500 pés, nuvens esparsas a 25.000 pés
- **22/17**: Temperatura 22°C, ponto de orvalho 17°C
- **A2992**: Altímetro 29,92 inHg

### Entendendo o TAF

O TAF (Terminal Aerodrome Forecast) é uma previsão meteorológica para aeroportos. Exemplo:

```
SBGR 250300Z 2503/2603 18010KT P6SM FEW040 SCT250 FM250700 20008KT P6SM SCT040 BKN250
```

Decodificado:
- **SBGR**: Código ICAO do aeroporto
- **250300Z**: Data e hora de emissão
- **2503/2603**: Período de validade (do dia 25 às 03:00 ao dia 26 às 03:00 UTC)
- **18010KT P6SM FEW040 SCT250**: Condições iniciais
- **FM250700**: A partir do dia 25 às 07:00 UTC
- **20008KT P6SM SCT040 BKN250**: Novas condições previstas

## Calculadora TOD

A Calculadora de Topo de Descida (TOD) ajuda a determinar o ponto ideal para iniciar a descida, garantindo uma aproximação suave e eficiente.

### Como Usar

1. Acesse a página "Calculadora TOD"
2. Insira sua altitude de cruzeiro atual (em pés)
3. Insira a altitude alvo (em pés)
4. Insira sua velocidade no solo (em nós)
5. Selecione o ângulo de descida desejado (padrão é 3°)
6. Clique em "Calcular"
7. Os resultados serão exibidos com uma visualização gráfica

![Calculadora TOD](images/tod-calculator.png)

### Entendendo os Resultados

- **Distância até o TOD**: Distância em milhas náuticas até o ponto onde você deve iniciar a descida
- **Tempo até o TOD**: Tempo em minutos até o ponto de início da descida
- **Taxa de Descida**: Taxa de descida recomendada em pés por minuto
- **Tempo de Descida**: Tempo total estimado para a descida

### Regras Práticas

- **Regra do 3:1**: Para uma descida de 3°, multiplique a altitude a perder (em milhares de pés) por 3 para obter a distância em milhas náuticas
- **Regra da Taxa de Descida**: Multiplique sua velocidade no solo por 5 para uma descida de 3° (ex: 250 nós × 5 = 1.250 pés/min)
- **Regra do Tempo**: Planeje 3 minutos de tempo de descida para cada 1.000 pés de altitude a perder

## Calculadora de Vento

A Calculadora de Vento ajuda a determinar correções de vento, velocidade no solo e componentes de vento para seu planejamento de voo.

### Como Usar

1. Acesse a página "Calculadora de Vento"
2. Insira seu curso verdadeiro (em graus)
3. Insira sua velocidade verdadeira (em nós)
4. Insira a direção do vento (em graus)
5. Insira a velocidade do vento (em nós)
6. Clique em "Calcular"
7. Os resultados serão exibidos com detalhes

![Calculadora de Vento](images/wind-calculator.png)

### Entendendo os Resultados

- **Ângulo de Correção de Vento**: O ângulo que você precisa ajustar na sua proa para manter o curso desejado
- **Proa Verdadeira**: A direção que você precisa apontar sua aeronave
- **Velocidade no Solo**: Sua velocidade real sobre o solo, considerando os efeitos do vento
- **Componente de Vento de Frente**: A porção do vento diretamente oposta ao seu curso
- **Componente de Vento Cruzado**: A porção do vento perpendicular ao seu curso

### Aplicações Práticas

- **Planejamento de Aproximação**: Calcule componentes de vento cruzado para avaliar condições de pouso
- **Economia de Combustível**: Ajuste sua rota para aproveitar ventos de cauda
- **Cálculo de ETA**: Use a velocidade no solo calculada para estimar tempos de chegada mais precisos

## Calculadora de Combustível

A Calculadora de Combustível ajuda a estimar os requisitos de combustível para seu voo com base na distância, tipo de aeronave e condições de voo.

### Como Usar

1. Acesse a página "Calculadora de Combustível"
2. Selecione o tipo de aeronave ou insira uma taxa de consumo personalizada
3. Insira a distância de voo (em milhas náuticas)
4. Insira a velocidade de cruzeiro (em nós)
5. Ajuste outros parâmetros conforme necessário
6. Clique em "Calcular"
7. Os requisitos de combustível serão exibidos em detalhes

![Calculadora de Combustível](images/fuel-calculator.png)

### Entendendo os Resultados

- **Combustível de Viagem**: Combustível estimado para o voo da origem ao destino
- **Combustível de Contingência**: Combustível adicional para condições inesperadas
- **Combustível de Alternado**: Combustível necessário para voar do destino ao aeroporto alternativo
- **Combustível de Reserva**: Combustível para espera no aeroporto alternativo
- **Combustível de Táxi**: Combustível usado durante táxi, partida do motor e aquecimento
- **Combustível Extra**: Qualquer combustível adicional a critério do comandante
- **Combustível Total**: Soma de todos os requisitos de combustível

### Dicas para Planejamento de Combustível

- Sempre adicione uma margem de segurança para condições meteorológicas adversas
- Considere o peso adicional do combustível no cálculo de performance da aeronave
- Verifique as políticas de combustível da sua companhia aérea virtual, se aplicável

## Dicas e Truques

### Otimizando seu Fluxo de Trabalho

1. **Integração com SimBrief**: Gere seu plano no SimBrief, extraia as informações no QuickBrief e use os dados para as calculadoras
2. **Verificação Meteorológica**: Verifique as condições meteorológicas na origem, destino e alternados antes de cada voo
3. **Cálculo de TOD Preciso**: Use os dados extraídos do briefing para calcular seu TOD com precisão
4. **Atalhos de Teclado**: Pressione Enter após inserir dados nos campos para calcular rapidamente

### Uso em Dispositivos Móveis

O QuickBrief é totalmente responsivo e funciona bem em tablets e smartphones:

- Use seu tablet como segundo monitor durante o voo para consultar informações
- Acesse rapidamente informações meteorológicas em seu smartphone antes do voo
- O tema escuro é ideal para uso noturno, reduzindo o brilho da tela

### Compartilhando Informações

- Use a URL com parâmetros para compartilhar informações meteorológicas específicas
- Exemplo: `https://seusite.com/weather.html?icao=SBGR` abrirá diretamente as informações de Guarulhos

## Perguntas Frequentes

### Geral

**P: O QuickBrief funciona offline?**
R: Parcialmente. O extrator de briefing e as calculadoras funcionam offline, mas as informações meteorológicas requerem conexão com a internet.

**P: Posso usar o QuickBrief em qualquer navegador?**
R: Sim, o QuickBrief foi projetado para funcionar em navegadores modernos como Chrome, Firefox, Safari e Edge.

**P: Como posso reportar um bug ou sugerir uma nova funcionalidade?**
R: Visite nosso repositório no GitHub: https://github.com/samuelffer/quickbrief

### Extrator de Briefing

**P: Por que algumas informações não estão sendo extraídas corretamente?**
R: O extrator foi projetado para o formato padrão do SimBrief. Se você estiver usando um formato personalizado, algumas informações podem não ser reconhecidas.

**P: Posso extrair informações de outros formatos além do SimBrief?**
R: Atualmente, o extrator é otimizado para o SimBrief, mas pode funcionar parcialmente com outros formatos similares.

### Meteorologia

**P: Com que frequência as informações meteorológicas são atualizadas?**
R: As informações são obtidas em tempo real quando você faz uma consulta. METARs são geralmente atualizados a cada hora ou quando há mudanças significativas.

**P: Como são determinadas as pistas ativas?**
R: As pistas ativas são determinadas com base na direção do vento, favorecendo as pistas que proporcionam componentes de vento de frente.

### Calculadoras

**P: As calculadoras consideram o peso da aeronave?**
R: A calculadora de combustível considera tipos de aeronave padrão. Para cálculos mais precisos, você pode inserir valores personalizados.

**P: Posso confiar 100% nos cálculos para voos reais?**
R: Não. O QuickBrief é destinado a simulação de voo. Para aviação real, sempre use ferramentas certificadas e siga os procedimentos aprovados.

---

Esperamos que este guia ajude você a aproveitar ao máximo o QuickBrief! Bons voos!

*Última atualização: Maio de 2025*
