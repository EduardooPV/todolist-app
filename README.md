# To-do List App

## Funcionalidades:

- Criar um perfil de usuário
- Editar um perfil de usuário
- Excluir um perfil de usuário
- Adicionar tarefa
- Visualizar tarefas
- Alterar tarefa
- Remover tarefa

## Tecnologias utilizadas:
- **Node.js:**
  - Utilizado como ambiente de execução para o backend da aplicação.
  - Permite a execução de JavaScript do lado do servidor.

- **Express.js:**
  - Framework web para Node.js que simplifica o processo de criação de APIs RESTful.
  - Facilita o roteamento de requisições HTTP e o tratamento de middleware.

- **MongoDB:**
  - Banco de dados NoSQL utilizado para armazenar as informações das tarefas.
  - Oferece flexibilidade na estruturação dos dados e é adequado para aplicações onde os esquemas podem mudar com o   tempo.

- **Docker:**
  - Plataforma de contêineres que permite empacotar, distribuir e executar aplicativos em ambientes isolados.
  - Facilita a implantação e o gerenciamento de aplicações, garantindo consistência entre diferentes ambientes.

- **ReactJS:**
  - ReactJS é uma biblioteca JavaScript para criar interfaces de usuário interativas em aplicações web, permitindo o desenvolvimento modular e eficiente de componentes reutilizáveis.

## Levantamento de requisitos

### Requisitos Funcionais (RF)

- [x] **Usuário:**
  - [x] O usuário deve ser capaz de criar um perfil
  - [x] O usuário deve ser capaz de editar seu perfil
  - [x] O usuário deve ser capaz de excluir seu perfil
  - [x] O usuário deve ser capaz de se autenticar no sistema 

- [ ] **Adicionar Tarefa:**
  - [ ] Os usuários devem ser capazes de adicionar uma nova tarefa à lista.
  - [ ] O sistema deve permitir que os usuários forneçam um título para a tarefa.
  - [ ] Opcionalmente, os usuários podem fornecer uma descrição para a tarefa.
    
- [ ] **Visualizar Tarefas:**
  - [ ] Os usuários devem ser capazes de visualizar todas as tarefas cadastradas.
  - [ ] A lista de tarefas deve exibir o título, descrição (se houver), status (completo/incompleto) e data de criação de cada tarefa.

- [ ] **Concluir Tarefa:**
  - [ ] Os usuários devem poder marcar uma tarefa como completa/incompleta.
  - [ ] Eles também devem poder editar o título e a descrição de uma tarefa existente.

- [ ] **Alterar Tarefa:**
  - [ ] O usuário deve editar o título ou a descrição de uma tarefa.

- [ ] **Excluir Tarefa:**
  - [ ] Os usuários devem ser capazes de excluir uma tarefa da lista.

### Requisitos Não Funcionais (RNF)
- [x] Deve ser criada uma tabela de **Users**
  - [x] Deve ser criado um campo Name do tipo String
  - [x] Deve ser criado um campo Email do tipo String
  - [x] Deve ser criado um campo Password do tipo String (Criptografada)
  - [x] Deve ser criado um campo CreatedAt do tipo Date (Date.now())


- [x] Deve ser criada uma tabela de **Tasks**
  - [x] Deve ser criado um campo Id do tipo Uuid
  - [x] Deve ser criado um campo Title do tipo String
  - [x] Deve ser criado um campo Description do tipo String
  - [x] Deve ser criado um campo CreatedAt do tipo Date (Date.now())
  - [x] Deve ser criado um campo Status do tipo Boolean

  - [x] Deve ser criada uma relação com um Usuário específico (One-to-Many/Many-to-One: um Usuário pode ter várias Tarefas)


### Regras de Negócio
- [ ] **Controle de Acesso:**
  - [x] Só pode conter um email por usuário.
  - [x] A senha do usuário deve estar criptografada.
  - [x] Apenas usuários autenticados podem alterar, excluir seu perfil.
  - [ ] Apenas usuários autenticados podem adicionar, visualizar, atualizar ou excluir tarefas.
  - [ ] Cada usuário só pode visualizar e manipular suas próprias tarefas, não as de outros usuários.


- [ ] **Validação de Tarefas:**
  - [ ] O título de uma tarefa não pode ser vazio.
  - [ ] A descrição da tarefa pode ser opcional, mas não pode exceder um determinado comprimento máximo.
  - [ ] Uma tarefa só pode ser marcada como completa/incompleta se existir na lista.


- [ ] **Auditoria de Atividades:**
  - [ ] Todas as ações realizadas pelos usuários, como adição, edição e exclusão de tarefas, devem ser registradas em logs para fins de auditoria.