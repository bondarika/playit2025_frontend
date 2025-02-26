import Coin from "@/assets/icons/coin/coin.svg?react"
function Task () {

    return (
      <div className="tasks__card">
        <div className="tasks__price">
          <p>30</p>
          <Coin/>
        </div>
      </div>
    );
}

export default Task