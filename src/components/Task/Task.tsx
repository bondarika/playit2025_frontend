import "./styles.scss";
import Coin from "@/assets/icons/coin/coin_icon.svg?react";
function Task() {
  return (
    <div className="task">
      <div className="task__info">
        <p className="task__character">Оборотень</p>
        <div
          className="task__description"
          style={{ width: "118px", height: "40px" }}
        >
          Люблю сияющие бусы из раковин и долгие прогулки…
        </div>
      </div>
      <div className="task__points">
        <p className="task__description">30</p>
        <Coin />
      </div>
    </div>
  );
}

export default Task;
