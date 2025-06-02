# Trabalho Final - Simulação e Análise de Consumo de Energia em um Laboratório
**Simulação do Consumo Elétrico e Análise de Dados de Equipamentos em um Laboratório de Engenharia**
## 📝 Objetivo
Simular, processar e analisar o consumo elétrico de diversos equipamentos de um laboratório ao longo de uma semana. O aluno deve estruturar tudo em um Jupyter Notebook usando Markdown, estruturas de dados (listas, arrays, matrizes), controle de fluxo (condicionais, laços, ...), funções, arquivos e visualizações gráficas.
## 🔧 Descrição do problema
Imagine um laboratório com os seguintes equipamentos:

- 40 Computadores
- 3 Impressoras 3D
- 2 Estações de solda
- 4 Osciloscópios
- 1 Ar-condicionado

Cada equipamento tem:
- Potência média (W)
- Horas de uso diário
- Custo de energia (R$/kWh)

O aluno deverá:
1. Criar **estruturas de dados** (listas, dicionários, arrays/matrizes numpy ou arquivos) com essas informações.
2. Simular o uso dos equipamentos por 7 dias.
3. Calcular o **consumo total de energia** por dia e por equipamento.
4. Calcular o **custo total** da energia consumida.
5. Armazenar os dados em arquivos.
6. Gerar **gráficos descritivos** com o auxílio da biblioteca Matplotlib com os resultados obtidos.

**ATENÇÃO:** potência média, horas de uso diário e custo de energia deverão ser definidos pelo aluno.
## 📋 Exigências técnicas
- Uso de **Markdown** estruturado no Jupyter Notebook (com seções como Introdução, Metodologia, Código, Resultados, Conclusão).
- Uso de **listas, dicionários, arquivos e estruturas de repetição**.
- Sugere-se a implementação de **funções** para modularizar o código (opcional).
- Uso de **bibliotecas**: `numpy`, `matplotlib`.
- Geração de pelo menos três **gráficos**.
- Exportação do ambiente: `conda env export > ambiente.yml`.
- Organização, indentação e clareza no código.
## 💡 Sugestões bônus (opcional)
- Interface em terminal com menus (`input()`).
- Adicionar mais tipos de equipamentos.
- Permitir simulação para diferentes semanas.
- Exportar um relatório `.txt` com resumo de resultados.
## 📁 Entrega
- Arquivo `.ipynb` com o trabalho completo, dados e gráficos.
- Arquivo `.yml` com o ambiente Conda.
- Arquivo `.csv` ou `.txt` com os dados simulados.
- Tudo compactado em `.zip` e submetido no *Campus Virtual* até a data combinada.
