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
      <div className="prizes">
        <div className="container" style={{ width: `calc(100% - 20px)` }}>
          <div className="prizes__content">
            {prizes.map((prize) => (
              <Prize key={prize.id} prize={prize} onClick={() => {}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorePage;
