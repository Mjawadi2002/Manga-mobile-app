import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerprofilePage } from './sellerprofile.page';

describe('SellerprofilePage', () => {
  let component: SellerprofilePage;
  let fixture: ComponentFixture<SellerprofilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SellerprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
