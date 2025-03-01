import "./styles.scss";
import Coin from "@/assets/icons/coin/coin_icon.svg?react";
function Task() {
  return (
    <div className="task">
      <div className="task__info">
        <p className="task__character">Оборотень</p>
        <div style={{ width: "118px", height: "40px" }}>
          <p className="task__description">
            Люблю сияющие бусы из раковин и долгие прогулки…
          </p>
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
