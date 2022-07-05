import { IExpense } from '../app/interfaces';
import { read } from './httpService';

export async function apiGetAllExpenses(): Promise<IExpense[]> {
  return await read('/expenses');
}

export async function apiGetExpense(yearMonth: string): Promise<IExpense[]> {
  return await read(`/expenses?yearMonth=${yearMonth}&_sort=day`);
}
