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
        <a href="https://t.me/stremilovv" className="error__link">
          <p>t.me/stremilovv</p>
          <img src={icons['help_red']} />
        </a>
      </div>
    </>
  );
}

export default Error;
