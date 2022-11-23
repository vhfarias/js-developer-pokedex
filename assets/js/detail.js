const container = document.querySelector('.content')
const detailsSection = document.querySelector('#pokemonDetails')


function loadPokemonData() {
  const id = new URLSearchParams(window.location.search).get('id')

  pokeApi.getPokemonFullInfo(id)
    .then((pokemon) => {
      container.classList.add(pokemon.type)
      detailsSection.innerHTML = convertpokemonInfoToOverview(pokemon)
      document.querySelector('#statSelector').addEventListener('click', handleNavigation)
    })

}

loadPokemonData()


function convertpokemonInfoToOverview(pokemonInfo) {
  const svgs = {
    male: `<svg class="gender" "id="icon_male" fill="#2475e0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.5 41">
    <path d="M39.46,2.37v0A2,2,0,0,0,39.35,2a0,0,0,0,0,0,0,3.24,3.24,0,0,0-.17-.32,0,0,0,0,1,0,0,3.47,3.47,0,0,
    0-.25-.29,3.47,3.47,0,0,0-.29-.25h0L38.28.91h0A2,2,0,0,0,37.9.79h0a1.58,1.58,0,0,0-.38,0h-16a2,2,0,0,0,0,4H32.68L19.8,
    17.62a12.39,12.39,0,0,0-7.3-2.37A12.5,12.5,0,1,0,25,27.75a12.39,12.39,0,0,0-2.37-7.3L35.5,7.57V18.75a2,2,0,0,0,4,0v-16A1.58,
    1.58,0,0,0,39.46,2.37Zm-27,33.88a8.5,8.5,0,1,1,8.5-8.5A8.51,8.51,0,0,1,12.5,36.25Z"/>
    </svg>`,
    female: `<svg class="gender" id="icon_female" fill="#e0249b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.5 41">
    <path d="M27.1,30.65H21.75V24.82a12.5,12.5,0,1,0-4,0v5.83H12.4a2,2,0,1,0,0,4h5.35V39a2,2,0,0,0,4,0V34.65H27.1a2
    ,2,0,0,0,0-4ZM11.25,12.5a8.5,8.5,0,1,1,8.5,8.5A8.51,8.51,0,0,1,11.25,12.5Z"/>
    </svg>`,
    agender: `<svg class="gender" id="icon_agender" fill="lightgray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.5 41">
    <path d="M19.75,8a12.5,12.5,0,1,0,12.5,12.5A12.52,12.52,0,0,0,19.75,8Zm0,4A8.5,8.5,0,0,1,28,18.5H11.5A8.5,8.5,0,
    0,1,19.75,12Zm0,17a8.5,8.5,0,0,1-8.25-6.5H28A8.5,8.5,0,0,1,19.75,29Z"/>
    </svg>`
  }

  function calculateBaseStatPercentages(baseStats) {

    const statsTotal = baseStats.reduce((acc, { baseValue }) => acc + baseValue, 0)
    const statsAverage = statsTotal / baseStats.length
    const range = { start: 0.4, end: 1.6, threshold: 0.2 }

    const lowerThresholdValue = (1 - range.threshold * (1 - range.start)) * statsAverage
    const upperThresholdValue = (1 + range.threshold * (range.end - 1)) * statsAverage

    return baseStats.map(({ name, baseValue }) => {
      const percentage = ((baseValue - range.start * statsAverage) / ((range.end - range.start) * statsAverage) * 100).toFixed(2)
      let className
      if (baseValue < statsAverage) {
        if (baseValue < lowerThresholdValue) className = "bad"
        else className = "ok"
      } else {
        if (baseValue > upperThresholdValue) className = "great"
        else className = "good"
      }
      return { name, baseValue, percentage, className }
    })
  }

  function createStatElements(statData) {
    const bars = statData.map(({ name, baseValue, percentage, className }) => {
      return `
      <span class="label">${name.replace('-', ' ')}</span>
      <span>${baseValue}</span>
      <div class="statBarWrapper">
        <div class="statBarValue ${className}" style="width: ${percentage}%;"></div>
      </div>
      `
    })
      .join('')
    return (bars + `
    <span class="label">Total</span>
    <span>${statData.reduce((acc, { baseValue }) => acc + baseValue, 0)}</span>`)
  }

  console.log(pokemonInfo)
  return `
  <div id="pokemonOverview">
  <h1 class="name">${pokemonInfo.name}</h1>
    <span class="number">#${pokemonInfo.number}</span>
      <ol class="types">
                ${pokemonInfo.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
      <img 
          src=${pokemonInfo.photo}
          alt=${pokemonInfo.name}>
      </img>
  </div>
  <div id="pokemonDescription">
    <ul id="statSelector">
      <li class="selected">About</li>
      <li>Base Stats</li>
      <li>Moves</li>
    </ul>
    <div id="pokemonInfo">
      <section id="about">
        <span class="label">Generation</span><span>${pokemonInfo.generation}</span>
        <span class="label">Species</span><span>${pokemonInfo.genus}</span>
        <span class="label">Weight</span><span>${pokemonInfo.weight / 10}kg</span>
        <span class="label">Height</span><span>${pokemonInfo.height / 10}m</span>
        <span class="label">Abilities</span><div class="abilities">${pokemonInfo.abilities.map(({ name, isHidden }) => `<span class="ability">${name}${isHidden ? ' (hidden)' : ''}</span>`).join('')}</div>
        <h4 class="subsection">Breeding</h4>
        <span class="label">Gender</span><span class="genderInfo">${pokemonInfo.breeding.genderRate.map(({ name, chance }) => `<span class="genderData">${svgs[name]}${chance}%</span>`).join('')}</span>
        <span class="label">Egg Groups</span><span class="eggGroups">${pokemonInfo.breeding.eggGroups.map((group) => group).join(', ')}
      </section>
      <section id="baseStats">
        ${createStatElements(calculateBaseStatPercentages(pokemonInfo.stats))}
      </section>
      <section id="moves">
      <span class="label">Name</span>
      <span class="label">Level</span>
        ${pokemonInfo.moves
      .filter(({ name, detail }) => detail.level_learned_at > 0)
      .map(({ name, detail }) => ({ name: name.replace(/-/g, ' '), level: detail.level_learned_at }))
      .sort((abilityA, abilityB) => (abilityA.level < abilityB.level) ? -1 : 1)
      .map(({ name, level }) => `<span class="moveName">${name}</span> <span>${level}</span>`)
      .join('')
    }
      </section>
    </div>
    </div>
`
}

function handleNavigation(e) {
  const pokemonInfo = document.querySelector('#pokemonInfo')
  const navigation = document.querySelector('#statSelector')
  const section = e.target
  if (section.localName === 'li') {
    Array.from(navigation.children).forEach((item, index) => {
      if (item === section) {
        item.classList.add('selected')
        pokemonInfo.style.translate = `-${index * 100 / navigation.children.length}%`
      } else { item.classList.remove('selected') }
    })
  }
}
