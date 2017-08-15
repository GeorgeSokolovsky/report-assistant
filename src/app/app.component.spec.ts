import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('greeting component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    });
    TestBed.compileComponents();
  });

  it('should have title `Started!`', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.innerHTML).toContain('Started!');
    expect(compiled.querySelector('p').innerHTML).toContain('Started!');
  }));
});
