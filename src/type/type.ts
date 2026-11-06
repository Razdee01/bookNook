export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  copies?: string;
  image: string;
  description: string;
  addedDate?: string;
  username?: string;
  useremail?: string;
}
