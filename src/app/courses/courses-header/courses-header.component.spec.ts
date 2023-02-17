import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesHeaderComponent } from './courses-header.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoursesHeaderComponent', () => {
  let component: CoursesHeaderComponent;
  let fixture: ComponentFixture<CoursesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesHeaderComponent ],
      imports: [FormsModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call doSearch method when Search button is clicked', () => {
    spyOn(component, 'doSearch')
    const searchBtnElement = fixture.debugElement.query(By.css('.search-button'))
    searchBtnElement.triggerEventHandler('click', { preventDefault: () => {} });
    expect(component.doSearch).toHaveBeenCalledTimes(1)
  })


  it('should change inputValue value when enter something in search input', fakeAsync(() => {
    const searchInputElement: HTMLInputElement = fixture.debugElement.query(By.css('.search-input')).nativeElement
    fixture.detectChanges()
    tick();
    expect(component.inputValue).toBeFalsy();

    searchInputElement.value = 'Hello World'
    searchInputElement.dispatchEvent(new Event('input'))
    tick();
    expect(component.inputValue).toBe('Hello World');
  }))

});
