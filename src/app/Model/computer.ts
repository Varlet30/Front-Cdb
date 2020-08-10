import { ComponentFactory } from "@angular/core";

import { Company } from './company';

export class Computer {
    computerId : string;
    computerName : string;
    introduced: string;
    discontinued : string;
    companyDTO : Company;
}