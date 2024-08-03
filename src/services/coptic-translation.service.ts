import HttpError from '../models/error.model';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import IRequest from '../interfaces/i-request';
import { CopticTranslationRepository } from '../db-repositories/coptic-translation.repo';


class CopticTranslationService {
  public copticTranslationRepository = new CopticTranslationRepository();

  public async getPageOfWords(currentPage: number | 1, pageSize: number | 0, searchKey: string) {

    const searchQuery = { Arabic: { $regex: '.*' + searchKey + '.*' } }
    const sortQuery = {};
    const words = await this.copticTranslationRepository.getPage(currentPage, pageSize, searchQuery, sortQuery)

    console.log(currentPage, pageSize, searchKey)
    return words;
  }
  public async getWordsCount() {

    const count = await this.copticTranslationRepository.getCount();

    return count;
  }


  public async getAllWordsService() {



    const words = await this.copticTranslationRepository.getAll()


    return words;
  }

  public async getWordByIdService(req: IRequest, id: string) {
    const word = await this.copticTranslationRepository.getById(id);
    if (!word) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));
    return word;
  }
  public async deleteWordByIdService(req: IRequest, id: string) {
    const word = await this.copticTranslationRepository.DeleteById(id);
    if (!word) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));
    return word;
  }
  public async updateWordService(req: IRequest, wordId: string, data: any) {

    const word = await this.copticTranslationRepository.getById(wordId);
    if (!word) throw new HttpError(404, getTranslatedMessage("ar", "ITEM_NOT_FOUND"));
    let updatedWord = await this.copticTranslationRepository.UpdateById(wordId, data)
    return updatedWord;
  }
  public async addWordService(wordData: any) {
    const addedWord = await this.copticTranslationRepository.Create(wordData);
    return addedWord;
  }
}

export default CopticTranslationService;
