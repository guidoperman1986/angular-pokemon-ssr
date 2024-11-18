import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PokemonsListComponent } from './pokemons-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];

describe('PokemonsListComponent', () => {
  let component: PokemonsListComponent;
  let fixture: ComponentFixture<PokemonsListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsListComponent],
      providers: [provideRouter([]), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsListComponent);
    fixture.componentRef.setInput('pokemons', mockPokemon);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list of pokemons with 2 pokemon cards', () => {
    expect(compiled.querySelectorAll('app-pokemons-card').length).toBe(
      mockPokemon.length
    );
  });

  it('should render empty list of pokemons', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('app-pokemons-card').length).toBe(0);
    expect(compiled.querySelector('div')?.textContent).toContain(
      'No hay pokémons'
    );
  });
});
