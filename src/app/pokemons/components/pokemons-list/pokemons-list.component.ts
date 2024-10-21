import { Component, input } from '@angular/core';
import { PokemonsCardComponent } from '../pokemons-card/pokemons-card.component';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [PokemonsCardComponent],
  templateUrl: './pokemons-list.component.html',
  styleUrl: './pokemons-list.component.css',
})
export class PokemonsListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
