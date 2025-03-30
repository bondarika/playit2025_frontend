import { useEffect, useState } from 'react';
import { fetchPrizes } from '../services/api';
import { IPrize } from '../types/prize';
import { IFetchedPrize } from '../types/fetchedPrize';

const usePrizes = () => {
  const [prizes, setPrizes] = useState<IPrize[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrizes = async () => {
      try {
        const fetchedPrizes = await fetchPrizes();
        const formattedPrizes: IPrize[] = fetchedPrizes.map(
          (prize: IFetchedPrize) => ({
            id: prize['№'],
            title: prize['Нaименование'],
            description: prize['Нaполнение'],
            price: prize['Цена'],
            quantity: prize['Кол-во'],
          })
        );
        setPrizes(formattedPrizes);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    loadPrizes();
  }, []);

  return { prizes, loading, error };
};

export default usePrizes;
