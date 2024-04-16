import { Card } from './card';

export type paymentMethod = 'online' | 'upon-receipt';

export type Basket = {
  items: Array<Card['id']>
  total: number
  paymentMethod: paymentMethod
  address: string
  email: string
  phone: string
};
