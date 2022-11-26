import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSpaceshipComponent } from './card-spaceship.component';

describe('CardSpaceshipComponent', () => {
  let component: CardSpaceshipComponent;
  let fixture: ComponentFixture<CardSpaceshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSpaceshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSpaceshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
