import { fetchItems } from '../../services/api';

function StorePage(): React.ReactElement {
  fetchItems();
  return (
    <div>
      <header>
        <div className="container">
          <h1>МАГАЗИН</h1>
        </div>
      </header>
    </div>
  );
}

export default StorePage;
