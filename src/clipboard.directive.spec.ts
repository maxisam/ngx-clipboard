import { ClipboardService } from './clipboard.service';
import { ClipboardModule } from './ngx-clipboard';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
/**
 * Helper function to easily build a component Fixture using the specified template
 * From: https://blog.thoughtram.io/angular/2016/12/27/angular-2-advance-testing-with-custom-matchers.html
 */
function createTestComponent(template: string): ComponentFixture<TestClipboardComponent> {
  return TestBed
    .overrideComponent(TestClipboardComponent, { set: { template } })
    .createComponent(TestClipboardComponent);
}

/*
 * Shell component with property 'text' that will be used with our tests
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-clipboard',
  template: `<span>PlaceHolder HTML to be Replaced</span>`
})
export class TestClipboardComponent {
  public text: string = 'test';
  public isCopied: boolean;
}

describe('Directive: clipboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestClipboardComponent],
      imports: [
        BrowserModule,
        ClipboardModule,
        FormsModule]
    });
  });

  describe('copy when cbContent is set', () => {
    let template: string;
    let fixture: ComponentFixture<TestClipboardComponent>;
    let clipboardService: ClipboardService;
    let spy: jasmine.Spy;
    let button: HTMLButtonElement;
    beforeEach(() => {
      template = `<button ngxClipboard [cbContent]="'text'" (cbOnSuccess)="isCopied = true">copy</button>`;
      fixture = createTestComponent(template);
      clipboardService = fixture.debugElement.injector.get(ClipboardService);
      // Setup spy on the `copyText` method, somehow document.execCommand('copy') doesn't work in Karma
      spy = spyOn(clipboardService, 'copyText' as keyof (ClipboardService));
      fixture.detectChanges();
      button = fixture.debugElement.nativeElement.querySelector('button');
    });

    it('should fire cbOnError if environment does not support copy', async(() => {
      spy = spyOn(clipboardService, 'isSupported');
      spy.and.returnValue(false);
      button.click();
      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.isCopied).toBeFalsy();
      });
    }));

    it('should fire cbOnSuccess after copy successfully', async(() => {
      spy.and.returnValue(true);
      button.click();
      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.isCopied).toBeTruthy();
      });
    }));

    it('should fire cbOnError after copy fail', async(() => {
      button.click();
      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.isCopied).toBeFalsy();
      });
    }));

    it('should create a textarea in dom, and remove it after calling destroy', async(() => {
      const doc = fixture.debugElement.injector.get(DOCUMENT);
      expect(doc.querySelector('textarea')).toBeFalsy();
      button.click();
      fixture.whenStable().then(() => {
        expect(doc.querySelector('textarea')).toBeTruthy();
        clipboardService.destroy();
        expect(doc.querySelector('textarea')).toBeFalsy();
      });
    }));
  });

  describe('copy when target is set', () => {
    let template: string;
    let fixture: ComponentFixture<TestClipboardComponent>;
    let clipboardService: ClipboardService;
    let spy: jasmine.Spy;
    let button: HTMLButtonElement;
    let input: HTMLInputElement;
    beforeEach(() => {
      template = `<input type="text" [(ngModel)]="text"  #inputTarget>
      <button type="button" [ngxClipboard]="inputTarget" (cbOnSuccess)="isCopied = true">copy</button>`;
      fixture = createTestComponent(template);
      clipboardService = fixture.debugElement.injector.get(ClipboardService);
      // Setup spy on the `copyText` method, somehow document.execCommand('copy') doesn't work in Karma
      spy = spyOn(clipboardService, 'copyText' as keyof (ClipboardService));
      fixture.detectChanges();
      button = fixture.debugElement.nativeElement.querySelector('button');
      input = fixture.debugElement.nativeElement.querySelector('input');
      // input 'new test'
      input.value = 'new test';
      input.dispatchEvent(new Event('input'));
    });

    it('should fire cbOnSuccess after copy successfully', async(() => {
      spy.and.returnValue(true);
      fixture.detectChanges();
      // button click to trigger copy
      button.click();
      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.isCopied).toBeTruthy();
      });
    }));

    it('should fire cbOnError if environment does not support copy', async(() => {
      spy = spyOn(clipboardService, 'isSupported');
      spy.and.returnValue(false);
      button.click();
      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.isCopied).toBeFalsy();
      });
    }));

    it('should fire cbOnError after copy fail', async(() => {
      spy.and.returnValue(false);
      fixture.detectChanges();
      // button click to trigger copy
      button.click();
      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.isCopied).toBeFalsy();
      });
    }));
  });
});
