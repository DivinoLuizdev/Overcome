# Overcome Bank

Este é o arquivo README do projeto "Overcome Bank".

## Descrição

"Overcome Bank" é um aplicativo bancário construído usando React.js. Ele fornece uma interface amigável para gerenciar contas bancárias, transações e outras funcionalidades relacionadas.

## Instalação

Para instalar e executar o projeto localmente, siga estes passos:

1. Clone o repositório: `git clone <repository_url>`
2. Navegue até o diretório do projeto: `cd overcome-bank`
3. Instale as dependências: `npm install`

## Uso

Uma vez que a instalação estiver completa, você pode usar os seguintes comandos npm para executar diferentes tarefas:

- `npm run dev`: Inicia o servidor de desenvolvimento usando o Vite.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Executa o linting do código usando o ESLint.
- `npm run preview`: Inicia um servidor de visualização do aplicativo compilado.

### Testes

Para executar os testes automatizados do projeto, você pode usar o [Cypress](https://www.cypress.io/). Certifique-se de que o projeto esteja em execução no modo de desenvolvimento (`npm run dev`) antes de executar os testes.

1. Instale o Cypress globalmente (caso ainda não tenha instalado): `npm install -g cypress`
2. No terminal, execute o seguinte comando para abrir a interface do Cypress: `cypress open`
3. O Cypress será iniciado e exibirá uma janela com uma lista de arquivos de teste disponíveis.
4. Selecione o arquivo de teste desejado para executar os testes automatizados.

Você também pode executar os testes diretamente em modo de linha de comando, sem a interface gráfica do Cypress, usando o seguinte comando: `cypress run`

Certifique-se de que o servidor de desenvolvimento esteja em execução antes de executar os testes.

## Dependências

O projeto possui as seguintes dependências:

- "bootstrap": "^5.3.0"
- "date-fns": "^2.30.0"
- "react": "^18.2.0"
- "react-dom": "^18.2.0"
- "react-toastify": "^9.1.3"

## Dependências de desenvolvimento

O projeto possui as seguintes dependências de desenvolvimento:

- "@types/react": "^18.2.14"
- "@types/react-dom": "^18.2.6"
- "@vitejs/plugin-react": "^4.0.1"
- "cypress": "^12.17.1"
- "eslint": "^8.44.0"
- "eslint-plugin-react": "^7.32.2"
- "eslint-plugin-react-hooks": "^4.6.0"
- "eslint-plugin-react-refresh": "^0.4.1"
- "vite": "^4.4.0"

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorias, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
