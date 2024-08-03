import HttpError from '../models/error.model';
import { UserRepository } from '../db-repositories/user.repo';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import IRequest from '../interfaces/i-request';
import { IUser, role } from '../models/user.model';


class UserService {
  public userRepository = new UserRepository();

  public async getKhademUsers(currentPage: number | 1, pageSize: number | 0, searchKey: string, userId: string = '') {

    const searchQuery: any = {};
    searchQuery.name = { $regex: '.*' + searchKey + '.*' };
    searchQuery.khadem = "66aa61f13d2339a7c6eb6f29";
    const sortQuery = { name: 1 };
    const users = await this.userRepository.getPage(currentPage, pageSize, searchQuery, sortQuery)
    const count = await this.userRepository.getCount();

    return { users, count };
  }
  public async getCarVisitorUsers(currentPage: number | 1, pageSize: number | 0, searchKey: string, userId: string = '') {

    let searchQuery: any = {};
    searchKey ? searchQuery.name = { $regex: '.*' + searchKey + '.*' } : "";
    searchQuery.carVisitor = "66aa61f13d2339a7c6eb6f29";
    const sortQuery = { name: 1 };
    const users = await this.userRepository.getPage(currentPage, pageSize, searchQuery, sortQuery)
    const count = await this.userRepository.getCount();

    return { users, count };
  }

  public async getDownloadsSum() {
    const res = await this.userRepository.GetSum("DownloadsCount");

    return res[0].total;
  }

  public async getUserByIdService(req: IRequest, id: string) {

    const res: IUser = await this.userRepository.getById(id);

    if (!res) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));

    let user;

    if (req.user?.roles?.includes(role.car_visitor)) {
      let { _id, name, image, mobile, whatsapp, area } = res;
      user = { _id, name, image, mobile, whatsapp, area };
    }


    return user;
  }
  public async deleteUserByIdService(req: IRequest, id: string) {
    const user = await this.userRepository.DeleteById(id);
    if (!user) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));
    return user;
  }
  public async updateUserService(req: IRequest, userId: string, data: any) {

    const user = await this.userRepository.getById(userId);
    if (!user) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));
    let updatedUser = await this.userRepository.UpdateById(userId, data)
    return updatedUser;
  }
  public async addUserService(userData: any) {
    const addedUser = await this.userRepository.Create(userData);
    return addedUser;
  }
}

export default UserService;
