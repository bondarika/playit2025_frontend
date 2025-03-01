import "./styles.scss";
import Coin from "@/assets/icons/coin/coin_icon.svg?react";
function Task() {
  return (
    <div className="task">
      <div className="task__info">
        <h2 className="task__character">Оборотень</h2>
        <h3 className="task__description">blablabla</h3>
      </div>
      <div className="task__points">
        <h3 className="task__description">30</h3>
        <Coin />
      </div>
    </div>
  );
}

export default Task;
