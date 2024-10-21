import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
})
export default class PokemonPageComponent implements OnInit {
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonService
      .loadPokemon(id)
      .pipe()
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${name} - ${id}`;
          const pageDescription = `Pagina del Pokémon ${name}`;

          this.title.setTitle(pageTitle);

          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });

          this.meta.updateTag({
            property: 'og:title',
            content: pageTitle,
          });

          this.meta.updateTag({
            property: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
