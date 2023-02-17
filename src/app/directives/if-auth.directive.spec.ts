import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IfAuthDirective } from './if-auth.directive';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@Component({
  template: `
    <div class="test" [appIfAuth]></div>
  `
})
class TestComponent {
}

describe('Directive: if-auth', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, IfAuthDirective],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    })
    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
