import HttpError from '../models/error.model';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import IRequest from '../interfaces/i-request';
import { CategoryRepository } from '../db-repositories/category.repo';


class SharedServices {
  public categoryRepository = new CategoryRepository();

 
  public async getCategories(Type:string) {
    const categories = await this.categoryRepository.search({Type:Type});
    return categories;
  }
 
}

export default SharedServices;
