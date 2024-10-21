import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonsListComponent } from '../../pokemons/components/pokemons-list/pokemons-list.component';
import { PokemonsListSkeletonComponent } from './ui/pokemons-list-skeleton/pokemons-list-skeleton.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [
    PokemonsListComponent,
    PokemonsListSkeletonComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent implements OnInit {
  public isLoading = signal(true);
  private appRef = inject(ApplicationRef);

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);

  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  private $appState = this.appRef.isStable
    .pipe(takeUntilDestroyed())
    .subscribe((isStable) => {
      if (isStable) {
        /* console.log({ isStable }); */
      }
    });

  ngOnInit(): void {
    /* setTimeout(() => {
      this.isLoading = signal(false);
    }, 5000); */

    this.loadPokemons(1);
  }

  public loadOnPageChanged = effect(
    () => {
      this.loadPokemons(this.currentPage()!);
    },
    {
      allowSignalWrites: true,
    }
  );

  public loadPokemons(page = 0) {
    this.pokemonsService
      .loadPage(page)
      .pipe(tap(() => this.title.setTitle(`Pokémons SSR - Page ${page}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
