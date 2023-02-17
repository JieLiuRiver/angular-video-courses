import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadMoreComponent } from './load-more.component';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadMore method when LOAD MORE button is clicked', () => {
    spyOn(component, 'loadMore')
    const loadmoreElement = fixture.debugElement.query(By.css('button'))
    loadmoreElement.triggerEventHandler('click', { preventDefault: () => {} });
    expect(component.loadMore).toHaveBeenCalledTimes(1)
  })

});
