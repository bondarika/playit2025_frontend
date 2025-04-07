import { action, makeAutoObservable, observable, runInAction, toJS } from 'mobx';
import { fetchPrizes } from '../services/api';
import { Prize } from '../types/prize';
import { FetchedPrize } from '../types/fetchedPrize';

class PrizesStore {
  prizes: Prize[] | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      prizes: observable,
      error: observable,
      getPrizes: action,
    });
  }

  getPrizes = async () => {
    try {
      await fetchPrizes();
      const fetchedPrizes = await fetchPrizes();
      if (!fetchedPrizes) {
        throw new Error('Error when fetching prizes');
      }
      const formattedPrizes: Prize[] = fetchedPrizes.map(
        (prize: FetchedPrize) => ({
          id: prize['№'],
          title: prize['Наименование'],
          description: prize['Описание'],
          price: prize['Цена'],
          quantity: prize['Кол-во'],
        })
      );
      runInAction(() => {
        this.prizes = toJS(formattedPrizes);
        this.error = null;
      });
    } catch (error: any) {
      console.error('Error when getting prizes:', error);
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : 'Неизвестная ошибка';
      });
    }
  };
}

const prizesStore = new PrizesStore();
export default prizesStore;
