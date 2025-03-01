import "./styles.scss"
import Coin from "@/assets/icons/coin/coin_icon.svg?react"
function Task () {

    return (
      <div className="task">
        <div className="task__price">
          <p>30</p>
          <Coin/>
        </div>
      </div>
    );
}

export default Task