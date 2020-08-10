import {Computer} from '../app/Model/computer';
import {Company} from '../app/Model/company';


export const MOCK_COMPUTERS: Computer[] = [
  {
    id: '1',
    name: 'comptuter_name',
    introduced: '1997/11/03',
    discontinued: '2000/11/03',
    company: 
      {
        id : '01',
        name : 'company_name',
      }as Company,
  },
  {
    id: '2',
    name: 'comptuter_name',
    introduced: '1997/11/03',
    discontinued: '2000/11/03',
    company: 
      {
        id : '01',
        name : 'company_name',
      }as Company,
  },
  {
    id: '3',
    name: 'comptuter_name',
    introduced: '1997/11/03',
    discontinued: '2000/11/03',
    company: 
      {
        id : '02',
        name : 'company_name',
      }as Company,
  },
];