import {ResponseBaseModel} from './responseBase.model';
import {UsuarioModel} from './usuario.model';

export class ResponseBaseUserModel extends ResponseBaseModel {
  usuario: UsuarioModel;
}
