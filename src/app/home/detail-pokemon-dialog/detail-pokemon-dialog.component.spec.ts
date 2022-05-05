import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPokemonDialogComponent } from './detail-pokemon-dialog.component';

describe('DetailPokemonDialogComponent', () => {
  let component: DetailPokemonDialogComponent;
  let fixture: ComponentFixture<DetailPokemonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPokemonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPokemonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
