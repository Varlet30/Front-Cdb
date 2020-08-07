import { ComponentFactory } from "@angular/core";

import { Company } from './company';

export class Computer {
    id : string;
    name : string;
    introduced: string;
    discontinued : string;
    company : Company;
}