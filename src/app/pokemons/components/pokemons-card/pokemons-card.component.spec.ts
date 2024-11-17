import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsCardComponent } from './pokemons-card.component';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PokemonsCardComponent', () => {
  let component: PokemonsCardComponent;
  let fixture: ComponentFixture<PokemonsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsCardComponent],
      providers: [provideRouter([]), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsCardComponent);
    fixture.componentRef.setInput('pokemon', { id: '1', name: 'bulbasaur' });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
