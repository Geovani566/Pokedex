const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber =document.querySelector('.pokemon_number');
const pokemonImage=document.querySelector('.pokemon_image');
const form=document.querySelector('.form');
const input=document.querySelector('.input_busca');

const next=document.querySelector('.button.next');
const prev=document.querySelector('.button.prev');

let searchPokemon=1;

const fetchpokemon =async (pokemon)=>{
    const  APIresponse= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (APIresponse.status === 200){
        const data = await APIresponse.json();
        return data;
    }


  
}
const renderpokemon= async(pokemon)=>{
    pokemonName.innerHTML='Loading...'
    const data= await fetchpokemon(pokemon);
    if (data){
    pokemonImage.style.display='block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value='';
    searchPokemon=data.id;
    }else{
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display='none'
}}
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderpokemon(input.value.toLowerCase());
    
});
prev.addEventListener('click', () => {
    if (searchPokemon > 1){
    searchPokemon-=1;
    renderpokemon(searchPokemon);
}else return


});
next.addEventListener('click', () => {
  
    searchPokemon+=1;
    renderpokemon(searchPokemon);

});

renderpokemon(searchPokemon);