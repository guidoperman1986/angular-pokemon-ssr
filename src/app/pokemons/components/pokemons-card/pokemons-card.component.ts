import { Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemons-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemons-card.component.html',
  styleUrl: './pokemons-card.component.css',
})
export class PokemonsCardComponent {
  public pokemon = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        this.pokemon().id
      }.png`
  );

  logEffect = effect(() => {
    /* console.log(this.pokemonImg()); */
  });
}
