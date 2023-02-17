import { OrderByPipe } from './order-by.pipe';
import { TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [OrderByPipe],
      imports: [FormsModule]
    })
    .compileComponents();

    pipe = new OrderByPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })
});
