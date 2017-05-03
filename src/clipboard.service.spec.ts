import { CssBlockDefinitionRuleAst } from 'codelyzer/angular/styles/cssAst';
import { _document, DOCUMENT } from './document.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClipboardService } from './clipboard.service';
import { WindowSrv } from "./window.service";

describe('Service: Clipboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useFactory: _document },
        WindowSrv,
        ClipboardService
      ]
    });
  });

  it('should service work', inject([ClipboardService], (service: ClipboardService) => {
    expect(service).toBeTruthy();
  }));

  it('it is supported', inject([ClipboardService], (service: ClipboardService) => {
    expect(service.isSupported).toBeTruthy();
  }));

  describe('check if input is valid', () => {
    let input: HTMLInputElement;
    beforeEach(() => {
      input = document.createElement("input");
    });

    it('input is a valid target', inject([ClipboardService], (service: ClipboardService) => {
      expect(service.isTargetValid(input)).toBeTruthy();
    }));

    it('input[disabled] is NOT a valid target', inject([ClipboardService], (service: ClipboardService) => {
      input.setAttribute('disabled', '');
      expect(() => service.isTargetValid(input))
        .toThrowError('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
    }));
  });

  describe('check if textarea is valid', () => {
    let ta: HTMLTextAreaElement;
    beforeEach(() => {
      ta = document.createElement("textarea");
    });

    it('textarea is a valid target', inject([ClipboardService], (service: ClipboardService) => {
      expect(service.isTargetValid(ta)).toBeTruthy();
    }));

    it('ta[disabled] is NOT a valid target', inject([ClipboardService], (service: ClipboardService) => {
      ta.setAttribute('disabled', '');
      expect(() => service.isTargetValid(ta))
        .toThrowError('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
    }));
  });

  describe('check if other html element is valid', () => {
    let div: any = undefined;
    it('undefined is NOT a valid target', inject([ClipboardService], (service: ClipboardService) => {
      expect(() => service.isTargetValid(div))
        .toThrowError('Target should be input or textarea');
    }));
    it('div is NOT a valid target', inject([ClipboardService], (service: ClipboardService) => {
      div = document.createElement("div");
      expect(() => service.isTargetValid(div))
        .toThrowError('Target should be input or textarea');
    }));
  });

});
