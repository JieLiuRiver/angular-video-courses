import { DurationPipe } from './duration.pipe';
import { TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms';

describe('DurationPipe', () => {
  let pipe: DurationPipe

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [DurationPipe],
      imports: [FormsModule]
    })
    .compileComponents();

    pipe = new DurationPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should check pipe transforms the durations correctly', () => {
    expect(pipe.transform(100)).toBe('1h 40min')
  })

});
