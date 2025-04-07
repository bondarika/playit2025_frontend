import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { fetchPrizes } from '../services/api';
import { Prize } from '../types/prize';
import { FetchedPrize } from '../types/fetchedPrize';

class PrizesStore {
  prizes: Prize[] | null = null;
  error: string | null = null;
  selectedPrize: Prize | null = null;

  constructor() {
    makeAutoObservable(this, {
      prizes: observable,
      error: observable,
      selectedPrize: observable,
      getPrizes: action,
      selectPrize: action,
      updatePrizeQuantity: action,
    });
  }

  getPrizes = async () => {
    try {
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
        this.prizes = formattedPrizes;
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

  selectPrize(prize: Prize) {
    this.selectedPrize = prize;
  }

  updatePrizeQuantity = (prizeId: number, newQuantity: number) => {
    const prize = this.prizes?.find((prize) => prize.id === prizeId);
    if (prize) {
      prize.quantity = newQuantity;
    }
  };
}

const prizesStore = new PrizesStore();
export default prizesStore;
