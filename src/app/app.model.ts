export interface User {
    _id: string
    email: string,
    password: string,
    basket: string[]
  }
  
export interface Product {
    _id: string,
    url: string,
    name: string,
    text?: string,
    price: number;
    totalCount?: number;
  }