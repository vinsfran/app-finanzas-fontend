export interface MenuModel {
  id: number;
  nombre: string;
  idpadre: number;
  permiso: string;
  routerlink: string;
  submenus: MenuModel[];
}
