import {ResponseBaseModel} from './responseBase.model';
import {MenuModel} from './menu.model';

export class ResponseBaseMenusModel extends ResponseBaseModel {
  menus: MenuModel[];
}
