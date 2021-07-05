import { Model } from '../models/User';

export interface IIndex {
  getUserId(id: number): Model.User;
}
