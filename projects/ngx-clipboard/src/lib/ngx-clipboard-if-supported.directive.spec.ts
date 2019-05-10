import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClipboardModule } from './ngx-clipboard.module';
import { ClipboardService } from './ngx-clipboard.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-cmp',
  template: `
  <span
    *ngxClipboardIfSupported
    ngxClipboard
    cbContent="Foo Bar">
    Copy Foo Bar
  </span>`
})
class TestComponent {
}

function createTestComponent(): ComponentFixture<TestComponent> {
  return TestBed.createComponent(TestComponent);
}

describe('ngxClipboardIfSupported directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let clipboardService: ClipboardService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ClipboardModule],
    });

    clipboardService = TestBed.get(ClipboardService);
    fixture = createTestComponent();
    spy = spyOnProperty(clipboardService, 'isSupported', 'get');
  });

  it('should not render host when copy is not supported', async(() => {
    spy.and.returnValue(false);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
  }));

  it('should render host when copy is supported', async(() => {
    spy.and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
  }));
});
