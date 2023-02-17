export interface IAuthor {
  id: number;
  name: string;
}

export interface CourseItem {
  id: string;
  title: string;
  name?: string;
  creationDate: string;
  date?: string;
  length?: number;
  duration: number;
  authors?: IAuthor[]
  description: string;
  topRated: boolean;
  isTopRated?: boolean;
}
