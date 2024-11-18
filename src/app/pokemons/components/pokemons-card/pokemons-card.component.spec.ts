import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsCardComponent } from './pokemons-card.component';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SimplePokemon } from '../../interfaces';
import { By } from '@angular/platform-browser';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonsCardComponent', () => {
  let fixture: ComponentFixture<PokemonsCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonsCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsCardComponent],
      providers: [provideRouter([]), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsCardComponent);
    compiled = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('pokemon', mockPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    expect(component.pokemonImage()).toContain(mockPokemon.id);

    const image = compiled.querySelector('img');
    expect(image).toBeDefined();

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(image?.getAttribute('src')).toEqual(imageUrl);
    expect(compiled.textContent).toContain(mockPokemon.name);
  });

  it('should have the propper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div');

    expect(divWithLink?.getAttribute('ng-reflect-router-link')).toBeDefined();
    expect(
      divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toEqual(`/pokemons,${mockPokemon.name}`);
  });
});
