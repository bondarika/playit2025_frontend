import { observer } from 'mobx-react-lite';
import userStore from '../../store/userStore';
import icons from '../../assets/icons';
import './styles.scss';

const Balance = observer(() => {
  const { user } = userStore;

  return (
    <div className="balance">
      <img src={icons['coin_bag_red']} />
      <p className="balance__text">{user?.balance}</p>
    </div>
  );
});

export default Balance;
