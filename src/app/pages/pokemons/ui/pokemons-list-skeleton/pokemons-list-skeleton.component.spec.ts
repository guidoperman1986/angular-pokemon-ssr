import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsListSkeletonComponent } from './pokemons-list-skeleton.component';

describe('PokemonsListSkeletonComponent', () => {
  let component: PokemonsListSkeletonComponent;
  let fixture: ComponentFixture<PokemonsListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsListSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
