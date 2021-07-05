import { provide } from 'inversify-binding-decorators';
import TAGS from '../constant/tags';
import { IIndex } from '../interface/IIndex';
import { Model } from '../models/User';

// 省掉bind
@provide(TAGS.IndexService)
export class IndexService implements IIndex {
  private userStorage: Model.User[] = [
    {
      email: '615411375@qq.com',
      name: 'naixes',
    },
    {
      email: 'sin.com',
      name: 'sin',
    },
  ];
  getUserId(id: number): Model.User {
    let result: Model.User;
    result = this.userStorage[id];
    return result;
  }
}
