# Warez Together

## O que é o Warez Together?

  Uma extensão para o google chrome que permite duas ou mais pessoas assistirem uma série ou filme em simultâneo, fazendo uso de uma ligação a um servidor node.js para a comunicação entre utilizadores.
  
## Possuem alguma filiação com os criadores do WarezTuga?

  Não, nenhuma. Apenas achamos que esta era uma funcionalidade de que o site precisava e decidimos fazê-la nós próprios.

# Documentação

## Como funciona?

  O wareztuga cria uma iframe com o filme na sua página. O nosso objetivo é aceder a essa página, e comunicar com o objeto do player presente no objeto window dessa página.
  Isso é feito injetando um script nas páginas dos servidores que fazem host dos filmes, e dando acesso à api de comunicação do chrome a esse script. Assim, o script reage a eventos no player e consegue comunicar com o resto da extensão.
  Como estas páginas dos hosts são carregadas pela iframe quando o utilizador está no wareztuga, a extensão corre normalmente.
