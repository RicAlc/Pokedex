const fetchPokemon = () => {
    const pkmn_idInput = document.getElementById("pkmn_id");
    let pkmn_id = pkmn_idInput.value;
    pkmn_id = pkmn_id.toLowerCase();
    const url_1 = `https://pokeapi.co/api/v2/pokemon/${pkmn_id}`;
    const url_2 = `https://pokeapi.co/api/v2/pokemon-species/${pkmn_id}`;
    fetch(url_1).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("/assets/sad.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        //Foto del pokemon
        let pkmn_image = data.sprites.other["official-artwork"].front_default;
        pokemonImg(pkmn_image);
        //Nombre, id, altura y peso
        const pkmn_data = [];
        pkmn_data.push(data.name);
        pkmn_data.push(data.id);
        pkmn_data.push(data.height);
        pkmn_data.push(data.weight);
        pokemonData(pkmn_data);

        //Tipo
        const pkmn_type = [];
        for (let i = 0; i < data.types.length; i++) {
            pkmn_type.push(data.types[i].type.name);
        }
        pokemonType(pkmn_type);

        //Estadisticas del pokemon ps, atk, def, spatk, spdef, speed
        const pkmn_stats = [];
        pkmn_stats.push(data.stats[0].base_stat);
        pkmn_stats.push(data.stats[1].base_stat);
        pkmn_stats.push(data.stats[2].base_stat);
        pkmn_stats.push(data.stats[3].base_stat);
        pkmn_stats.push(data.stats[4].base_stat);
        pkmn_stats.push(data.stats[5].base_stat);
        pokemonStats(pkmn_stats);
    }
    );
    fetch(url_2).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("/assets/sad.gif")
        }
        else {
            console.log(res)
            return res.json();
        }
        
    }).then((data) => {
        let i =0;
        let idm = "en";
        while (idm != "es"){
            idm = data.flavor_text_entries[i].language.name;
            i++;
        }
        i--;
        let desc = data.flavor_text_entries[i].flavor_text;
        pokemonDescription(desc);
    }
    );
}

const pokemonImg = (url_1) => {
    const pkmn_image = document.getElementById("pkmn_image");
    pkmn_image.src = url_1;
}
const pokemonStats = (url_1) => {
    const ps = document.getElementById("ps");
    const atk = document.getElementById("atk");
    const def = document.getElementById("def");
    const spatk = document.getElementById("spatk");
    const spdef = document.getElementById("spdef");
    const speed = document.getElementById("speed");

    ps.textContent = url_1[0];
    atk.textContent = url_1[1];
    def.textContent = url_1[2];
    spatk.textContent = url_1[3];
    spdef.textContent = url_1[4];
    speed.textContent = url_1[5];
}
const pokemonData = (url_1) => {
    const pkmn_name = document.getElementById("pkmn_name");
    const pkmn_number = document.getElementById("pkmn_number");
    const pkmn_weight = document.getElementById("pkmn_weight");
    const pkmn_height = document.getElementById("pkmn_height");
    pkmn_name.textContent = url_1[0];
    pkmn_number.textContent = ("#" + url_1[1]);
    pkmn_height.textContent = ((url_1[2] / 10) + "M");
    pkmn_weight.textContent = ((url_1[3] / 10) + "KG");
}
const pokemonType = (url_1) => {
    //Borra el contenido del contenedor
    document.getElementById("tipos").innerHTML = "";

    //Crea un nuevo p por cada tipo.
    for (let i = 0; i < url_1.length; i++) {
        let pkm = tipos.find(function (tipo) {
            return tipo.pkmnType == url_1[i];
        });
        let type = document.createTextNode(pkm.trad);
        let newElement = document.createElement("p");
        newElement.appendChild(type);
        newElement.style.backgroundColor = pkm.color;
        newElement.classList.add("type");
        document.getElementById("tipos").appendChild(newElement);
    }
}
const pokemonDescription = (url_2) => {
    document.getElementById("desc-text-container").innerHTML = "";
    let desc_text = document.createTextNode(url_2);
    let newElement = document.createElement("p");
    newElement.appendChild(desc_text);
    newElement.classList.add("description-text");
    document.getElementById("desc-text-container").appendChild(newElement)
}


