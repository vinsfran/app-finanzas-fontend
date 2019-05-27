import {Pageable} from './pageable.model';
import {Sort} from './sort.model';

export interface PageModel {
  content: Array<any>;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  sort: Sort;
  size: number;
  number: number;
}
