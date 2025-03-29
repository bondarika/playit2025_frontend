import Prize from '../../components/Prize/Prize';
import usePrizes from '../../hooks/usePrizes';

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
        <div className="container">
          <h1>МАГАЗИН</h1>
        </div>
      </header>
      {prizes.map((prize) => (
        <Prize key={prize.id} prize={prize} onClick={() => {}} />
      ))}
    </div>
  );
}

export default StorePage;
