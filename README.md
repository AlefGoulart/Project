# LuizaLabs - Desafio técnico
## Introdução:

Desenvolvimento de um sistema no qual será permitido que o usuário realize login, visando a proteção de suas informações, bem como será realizado a listagem de produtos oriundos de uma API externa permitindo que o cliente crie uma lista de favoritos e favorite esses produtos com permissão máxima de 5 itens em sua lista.

## Funcionalidades

### Cadastro do cliente

1. O cadastro dos clientes deve conter seu nome, endereço de e-maill e senha;
2. Um cliente não pode se registrar duas vezes com o mesmo endereço de e-mail;

### Login

1. O cliente deve conseguir logar com seu e-mail e senha cadastrado previamente;
2. Caso os dados de login não estejam corretos, o retorno deve ser amigável para o cliente;

### Cadastro de lista de produtos favoritos

1. O cadastro da lista de produtos favoritos deve conter o título e descrição;
2. O cliente deve conseguir criar, visualizar, editar e remover uma lista de produtos favoritos;
3. O cliente pode ter apenas 1 lista de produtos favoritos;
4. Ao excluir a lista, deve se atentar que poderão existir produtos já favoritados e serão desfavoritados no momento da exclusão;

### Favoritar Produtos

1. Deve ser possível ver todos os produtos disponíveis no catálogo. (Será consumido a API externa: https://fakestoreapi.com/docs)
2. A apresentação dos favoritos e da lista de produtos do catálogo deve conter o título, imagem, preço;
3. O cliente deve conseguir favoritar qualquer produto do catálogo;
4. Não deve ser possível favoritar um produto que não exista;
5. Não deve ser possível favoritar um produto mais de uma vez;
6. A lista deve conter no máximo 5 produtos favoritados;
7. O cliente deve conseguir acessar sua tela de produtos favoritos.

### Envio de Notificação

1. O cliente deve receber uma notificação (e-mail, SMS, Whatsapp) para cada produto favoritado;

### Tecnologias utilizadas:

1. Banco de Dados: MongoDB
2. Back-End: NodeJs
3. Front-End: ReactJs
4. Notificação E-Mail: Nodemailer

### Versões:
#### Node: V22.15.0
#### npm: 10.9.2


## Execução:

Será necessário a instalação do banco de dados MongoDB.
1. MongoDB Community Server
2. MongoDB Command Line Database Tools
3. MongoDB Shell

### Instalação do NodeJs e npm: 
#### Versões:
- Node: V22.15.0
- npm: 10.9.2

- Desenvolvido utilizando Visual Studio Code
