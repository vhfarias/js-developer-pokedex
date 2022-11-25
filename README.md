# Trilha JS Developer - Pokedex

## Sobre

Um desafio de projeto da [DIO](https://www.dio.me/) que consiste em uma Pokedex simples para sedimentar conhecimentos de HTML, CSS, Javascript e  chamadas a uma API (PokeAPI)

A tela inicial da Pokedex faz uma requisição de n pokemons por vez, que retorna links para detalhes de cada um dos pokemons obtidos. São feitas requisições para cada um destes links e as informações obtidas são usadas para popular os detalhes básicos de cada pokemon, como seu nome, número, tipos e imagem.

Ao clicar em um dos pokemons o usuário é levado para uma nova página, que recebe o id do pokemon por meio de uma _query string_ e realiza uma nova requisição à PokeAPI. Na resposta são obtidas, além das informações já citadas, dos atributos e dos ataques do pokemon, um link para requisitar mais detalhes sobre a espécie do pokemon, onde são obtidos os dados sobre reprodução do pokemon, bem como sua geração e sua cadeia evolutiva. Estas informações são divididas em três seções e mostradas ao usuário. Também há a opção de retornar à página inicial da Pokedex interagindo com o ícone de seta.

<div align="center">
<img src="/.github/pokedex.png" alt="pokedex screenshot" width="320">
<img src="/.github/stats.png" alt="pokemon stats screenshot" width="320">
</div>

## Tecnologias

- HTML
- CSS
- Javascript

## Planos Futuros

- Implementar seção de Evolução
- Listar as habilidades aprendidas por outros meios além de subir de nível