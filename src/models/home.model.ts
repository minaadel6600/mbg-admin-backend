
class BookStatisticsSchema {
  BookCount?: Number;
  BooksDownloads?:  Number ;
};

export class HomeModel {
  BooksStatistics?: BookStatisticsSchema;
  MahrganStatistics?: BookStatisticsSchema;

}

 
export default HomeModel;
