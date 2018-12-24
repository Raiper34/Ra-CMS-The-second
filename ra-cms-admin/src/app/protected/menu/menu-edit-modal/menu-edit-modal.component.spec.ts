import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEditModalComponent } from './menu-edit-modal.component';

describe('MenuEditModalComponent', () => {
  let component: MenuEditModalComponent;
  let fixture: ComponentFixture<MenuEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
