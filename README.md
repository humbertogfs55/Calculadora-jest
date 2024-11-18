![error loading image](https://preview.redd.it/imeanitstrue-v0-f8lk2zyody0e1.jpeg?auto=webp&s=0a4a2589f234fd9e351244bef8fd92a659dbc688)
# calculadora-jest-electron

Este é um projeto de uma calculadora simples com testes unitários utilizando o framework Jest, ele tambem conta com um wraper electron que faz o front end da aplicação e 4 containers dockers que fazem a parte ops do projeto. 

- Jenkins: Container que roda a pipeline CI/CD identificada no arquivo jenkinsfile, contem passos para testar empacotar e distribuir os executaveis e relatorios de teste.
- electron-builder: Container utilizado exclusivamente durante o passo de build da pipeline, permite empacotar o software para windows mesmo em um ambiente linux(docker container)
- Nginx: Container que publica uma pagina html para servir os artefatos estaticos gerados ao longo da build
- fluentd: Container que faz controle de loging para os containers  do jenkins e do nginx

Este projeto foi criado para fins educacionais.

## Funcionalidades

A calculadora possui as seguintes operações básicas:

- Adição: Soma de dois números.
- Subtração: Subtração de um número pelo outro.
- Multiplicação: Multiplicação de dois números.
- Divisão: Divisão de um número pelo outro (com verificação para evitar divisão por zero).

## Pré-requisitos

Node.js e npm instalados no sistema.

## Instalação
Para configurar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
```
git clone https://github.com/carolinyat/calculadora-jest.git
```

2. Entre no diretório do projeto:
```
cd calculadora-jest
```

3. Instale as dependências:
```
npm install
```

## Executando a calculadora CLI 

Para iniciar a calculadora no terminal, execute:
```
node calculatorCLI.js
```

## Executando os Testes
Os testes foram escritos com o Jest e cobrem cada uma das operações da calculadora. Para rodar os testes, use o seguinte comando:

```
npm test
```

Após rodar o comando, o Jest executará os testes e exibirá o resultado no terminal, indicando quais testes passaram ou falharam.

### Relatorio de testes
Toda run da pipeline gera um relatorio de teste junit.xml contido no diretorio: 

```
test-results
```
# Rodando containers
A raiz do projeto contem o arquivo docker-compose, e tambem o dockerfile.jenkins dentro da pasta Docker, com esses arquivos para executar os containers localmente basta executar os comandos:
```
docker-compose build

docker-compose up -d ## -d roda no modo detached 
```
Para acessar cada container individualmente via terminal:
```
docker ps ### identificar o nome/id do container
docker exec -it nomeContainer sh/bash ## -it atribui o terminal que ja esta sendo usado para esse container
```

## Rodando jenkins/pipeline
O container do jenkins por padrao disponibiliza a interface web em : http://localhost:8080/
As pipelines podem ser executadas manualmente, e a cada 10 min uma nova pipeline é executada de forma automatica. 

## Nginx e artefatos
Conforme uma build é executada tanto localmente quanto via jenkins o nginx disponibiliza a verção mais atualizada na pagina: http://localhost/

## Fluentd 
O fluentd gera e armazena logs gerados pelo container do nginx e do jenkins na pasta não versionada **logs**
na raiz do projeto.

## ElectronBuilder
Esse container roda por padrão sem executar nada, ele depende do container do jenkins para ser chamado, os logs ficam disponiveis dentro do passo de build no proprio jenkins. 

![error loading image](https://external-preview.redd.it/kPQ__at4fKKgnYwxUE1Y50bSW7dMyypwpCgPUmFRg04.jpg?auto=webp&s=f3b7d41ce149fcc8074a02bd90f6d82f59c9544b)
