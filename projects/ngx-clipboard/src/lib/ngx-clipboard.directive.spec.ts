import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IClipboardResponse } from './interface';
import { ClipboardModule } from './ngx-clipboard.module';
import { ClipboardService } from './ngx-clipboard.service';

/*
 * Shell component with property 'text' that will be used with our tests
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'test-clipboard',
    template: ` <span>PlaceHolder HTML to be Replaced</span> `
})
export class TestClipboardComponent {
    public text = 'text';
    public isCopied: boolean;
    public copySuccessMsg = 'copySuccessMsg';
}

/**
 * Helper function to easily build a component Fixture using the specified template
 * From: https://blog.thoughtram.io/angular/2016/12/27/angular-2-advance-testing-with-custom-matchers.html
 */
function createTestComponent(template: string): ComponentFixture<TestClipboardComponent> {
    return TestBed.overrideComponent(TestClipboardComponent, {
        set: { template }
    }).createComponent(TestClipboardComponent);
}

describe('Directive: clipboard', () => {
    describe('GIVEN: no root configuration', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestClipboardComponent],
                imports: [BrowserModule, ClipboardModule, FormsModule],
                providers: [ClipboardService]
            });
        });

        describe('copy when cbContent is set', () => {
            let template: string;
            let fixture: ComponentFixture<TestClipboardComponent>;
            let clipboardService: ClipboardService;
            let spy: jasmine.Spy;
            let button: HTMLButtonElement;
            beforeEach(() => {
                template = `<button ngxClipboard [cbContent]="'text'" (cbOnSuccess)="isCopied = true" [cbSuccessMsg]="copySuccessMsg">copy</button>`;
                fixture = createTestComponent(template);
                clipboardService = fixture.debugElement.injector.get(ClipboardService);
                // Setup spy on the `copyText` method, somehow document.execCommand('copy') doesn't work in Karma
                spy = spyOn(clipboardService, 'copyText' as keyof ClipboardService);
                fixture.detectChanges();
                button = fixture.debugElement.nativeElement.querySelector('button');
            });

            it(
                'should fire cbOnError if environment does not support copy',
                waitForAsync(() => {
                    spy = spyOnProperty(clipboardService, 'isSupported', 'get').and.returnValue(false);
                    button.click();
                    fixture.whenStable().then(() => {
                        expect(fixture.componentInstance.isCopied).toBeFalsy();
                    });
                })
            );

            it(
                'should fire cbOnSuccess after copy successfully',
                waitForAsync(() => {
                    spy.and.returnValue(true);
                    button.click();
                    fixture.whenStable().then(() => {
                        expect(fixture.componentInstance.isCopied).toBeTruthy();
                    });
                })
            );

            it(
                'should fire cbOnError after copy fail',
                waitForAsync(() => {
                    button.click();
                    fixture.whenStable().then(() => {
                        expect(fixture.componentInstance.isCopied).toBeFalsy();
                    });
                })
            );

            it(
                'should create a textarea in dom, and remove it after calling destroy',
                waitForAsync(() => {
                    const doc = fixture.debugElement.injector.get(DOCUMENT);
                    expect(doc.querySelector('textarea')).toBeFalsy();
                    button.click();
                    fixture.whenStable().then(() => {
                        expect(doc.querySelector('textarea')).toBeTruthy();
                        clipboardService.destroy(doc.body);
                        expect(doc.querySelector('textarea')).toBeFalsy();
                    });
                })
            );

            it(
                'given the configuration it should clean up temp textarea after copying automatically',
                waitForAsync(() => {
                    const doc = fixture.debugElement.injector.get(DOCUMENT);
                    clipboardService.configure({ cleanUpAfterCopy: true });
                    clipboardService.copyFromContent('test content');
                    fixture.whenStable().then(() => {
                        const ta = doc.querySelector('textarea');
                        expect(ta).toBeFalsy();
                    });
                })
            );

            it(
                'should push copy response to copySubject',
                waitForAsync(() => {
                    spy.and.returnValue(true);
                    const component = fixture.componentInstance;
                    clipboardService.copyResponse$.subscribe((res: IClipboardResponse) => {
                        expect(res).toBeDefined();
                        expect(res.isSuccess).toEqual(true);
                        expect(res.content).toEqual(component.text);
                        expect(res.successMessage).toEqual(component.copySuccessMsg);
                        expect(res.event).toBeDefined();
                    });
                    button.click();
                })
            );
        });

        describe('copy when cbOnSuccess is not set', () => {
            let template: string;
            let fixture: ComponentFixture<TestClipboardComponent>;
            let clipboardService: ClipboardService;
            let spy: jasmine.Spy;
            let button: HTMLButtonElement;
            beforeEach(() => {
                template = `<button ngxClipboard [cbContent]="'text'" [cbSuccessMsg]="copySuccessMsg">copy</button>`;
                fixture = createTestComponent(template);
                clipboardService = fixture.debugElement.injector.get(ClipboardService);
                // Setup spy on the `copyText` method, somehow document.execCommand('copy') doesn't work in Karma
                spy = spyOn(clipboardService, 'copyText' as keyof ClipboardService);
                fixture.detectChanges();
                button = fixture.debugElement.nativeElement.querySelector('button');
            });

            it(
                'should not fire cbOnSuccess after copy successfully',
                waitForAsync(() => {
                    spy.and.returnValue(true);
                    button.click();
                    fixture.whenStable().then(() => {
                        expect(fixture.componentInstance.isCopied).toBeFalsy();
                    });
                })
            );

            it(
                'should push copy response to copySubject',
                waitForAsync(() => {
                    spy.and.returnValue(true);
                    const component = fixture.componentInstance;
                    clipboardService.copyResponse$.subscribe((res: IClipboardResponse) => {
                        expect(res).toBeDefined();
                        expect(res.isSuccess).toEqual(true);
                        expect(res.content).toEqual(component.text);
                        expect(res.successMessage).toEqual(component.copySuccessMsg);
                        expect(res.event).toBeDefined();
                    });
                    button.click();
                })
            );
        });

        describe('copy when cbContent and container is set', () => {
            let template: string;
            let fixture: ComponentFixture<TestClipboardComponent>;
            let clipboardService: ClipboardService;
            let spy: jasmine.Spy;
            let button: HTMLButtonElement;
            beforeEach(() => {
                template = `<div class="container" #container><button ngxClipboard [cbContent]="'text'" [container]="container" (cbOnSuccess)="isCopied = true">copy</button></div>`;
                fixture = createTestComponent(template);
                clipboardService = fixture.debugElement.injector.get(ClipboardService);
                // Setup spy on the `copyText` method, somehow document.execCommand('copy') doesn't work in Karma
                spy = spyOn(clipboardService, 'copyText' as keyof ClipboardService);
                fixture.detectChanges();
                button = fixture.debugElement.nativeElement.querySelector('button');
            });

            it(
                'should create a textarea in dom, and remove it after calling destroy',
                waitForAsync(() => {
                    const doc = fixture.debugElement.injector.get(DOCUMENT);
                    expect(doc.querySelector('textarea')).toBeFalsy();
                    button.click();
                    fixture.whenStable().then(() => {
                        const ta = doc.querySelector('textarea');
                        expect(ta).toBeTruthy();
                        expect(ta!.parentElement!.className).toBe('container');
                        clipboardService.destroy(ta!.parentElement!);
                        expect(doc.querySelector('textarea')).toBeFalsy();
                    });
                })
            );
        });

        describe('copy when using copyFromContent directly', () => {
            let template: string;
            let fixture: ComponentFixture<TestClipboardComponent>;
            let clipboardService: ClipboardService;
            let spy: jasmine.Spy;
            let button: HTMLButtonElement;
            beforeEach(() => {
                template = `<div></div>`;
                fixture = createTestComponent(template);
                clipboardService = fixture.debugElement.injector.get(ClipboardService);
                // Setup spy on the `copyText` method, somehow document.execCommand('copy') doesn't work in Karma
                spy = spyOn(clipboardService, 'copyText' as keyof ClipboardService);
                fixture.detectChanges();
                button = fixture.debugElement.nativeElement.querySelector('button');
            });

            it(
                'should create a textarea in dom with parent as body, and remove it after calling destroy',
                waitForAsync(() => {
                    const doc = fixture.debugElement.injector.get(DOCUMENT);
                    expect(doc.querySelector('textarea')).toBeFalsy();
                    clipboardService.copyFromContent('test content');
                    fixture.whenStable().then(() => {
                        const ta = doc.querySelector('textarea');
                        expect(ta).toBeTruthy();
                        expect(ta!.parentElement!.nodeName).toBe('BODY');
                        clipboardService.destroy(ta!.parentElement!);
                        expect(doc.querySelector('textarea')).toBeFalsy();
                    });
                })
            );
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
                spy = spyOn(clipboardService, 'copyText' as keyof ClipboardService);
                fixture.detectChanges();
                button = fixture.debugElement.nativeElement.querySelector('button');
                input = fixture.debugElement.nativeElement.querySelector('input');
                // input 'new test'
                input.value = 'new test';
                input.dispatchEvent(new Event('input'));
            });

            it(
                'should fire cbOnSuccess after copy successfully',
                waitForAsync(() => {
                    spy.and.returnValue(true);
                    fixture.detectChanges();
                    // button click to trigger copy
                    button.click();
                    fixture.whenStable().then(() => {
                        expect(fixture.componentInstance.isCopied).toBeTruthy();
                    });
                })
            );

            it(
                'should fire cbOnError if environment does not support copy',
                waitForAsync(() => {
                    spy = spyOnProperty(clipboardService, 'isSupported', 'get').and.returnValue(false);
                    button.click();
                    fixture.whenStable().then(() => {
                        expect(fixture.componentInstance.isCopied).toBeFalsy();
                    });
                })
            );

            it(
                'should fire cbOnError after copy fail',
                waitForAsync(() => {
                    spy.and.returnValue(false);
                    fixture.detectChanges();
                    // button click to trigger copy
                    button.click();
                    fixture.whenStable().then(() => {
                        expect(fixture.componentInstance.isCopied).toBeFalsy();
                    });
                })
            );
        });
    });
});
