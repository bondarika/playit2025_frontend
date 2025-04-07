import { useEffect } from 'react';
import prizesStore from '../store/prizesStore';

const usePrizes = () => {
  const { prizes, error, getPrizes } = prizesStore;

    useEffect(() => {
      if (!prizes) {
        getPrizes();
      }
    }, [prizes, error, getPrizes]);

  return { prizes, error };
}

export default usePrizes;