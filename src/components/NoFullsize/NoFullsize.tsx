import icons from '../../assets/icons';
import './styles.scss';

const NoFullsize = () => {
  return (
    <div className="no-fullsize">
      <img src={icons['no_fullsize']} style={{ marginBottom: '24px' }} />
      <p className="no-fullsize__text">к сожалению PlayIT не доступно</p>
      <p className="no-fullsize__text">в полноэкранном режиме 😔</p>
    </div>
  );
};

export default NoFullsize;
