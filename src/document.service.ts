import { NgModule } from '@angular/core';
import { OpaqueToken } from '@angular/core';

export const DOCUMENT = new OpaqueToken('DOCUMENT');

export function _document(): Document {
    return document;
}
