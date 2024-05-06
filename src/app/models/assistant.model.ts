export interface Assistant {
  id: Number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  image: any;

  [key: string]: string | number | File | Number | null;
}
