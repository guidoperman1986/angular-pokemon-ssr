import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokemonsService } from './pokemons.service';
import { provideHttpClient } from '@angular/common/http';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1032,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PokemonsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* it('should load a page of pokemons', () => {
        const mockResponse: PokeAPIResponse = {
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
        };

        const expectedPokemons: SimplePokemon[] = [
            { id: '1', name: 'bulbasaur' },
            { id: '2', name: 'ivysaur' },
        ];

        service.loadPage(1).subscribe((pokemons) => {
            expect(pokemons).toEqual(expectedPokemons);
        });

        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should load a single pokemon by id', () => {
        const mockPokemon: Pokemon = {
            id: 1,
            name: 'bulbasaur',
            // other properties as needed
        };

        service.loadPokemon('1').subscribe((pokemon) => {
            expect(pokemon).toEqual(mockPokemon);
        });

        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockPokemon);
    }); */

  it('should load a single pokemon', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });
});
