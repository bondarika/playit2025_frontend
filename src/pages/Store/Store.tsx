import Prize from '../../components/Prize/Prize';
import usePrizes from '../../hooks/usePrizes';
import './styles.scss';

function StorePage(): React.ReactElement {
  const { prizes, loading, error } = usePrizes();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <header>
        <h1>МАГАЗИН</h1>
      </header>

      <div className="store">
        {prizes.map((prize) => (
          <Prize key={prize.id} prize={prize} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default StorePage;
