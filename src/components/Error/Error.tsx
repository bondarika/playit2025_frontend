import icons from '../../assets/icons';
import './styles.scss';

function Error() {
  return (
    <>
      <div className="error">
        <div className="error__text">
          <p className="error__text-sub">похоже, произошла ошибка 😢</p>
          <p>попробуйте перезайти, ну а если не поможет, то вам сюда:</p>
        </div>
        <div className="error__link">
          <a href="https://t.me/stremilovv">t.me/stremilovv</a>
          <img src={icons['help_red']} />
        </div>
      </div>
    </>
  );
}

export default Error;
