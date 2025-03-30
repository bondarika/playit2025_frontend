import './styles.scss';
function Loader() {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 55px)',
          position: 'fixed',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'calc(100% - 55px)',
            alignItems: 'center',
          }}
        >
          <div className="loader"></div>
        </div>
      </div>
    </>
  );
}

export default Loader;
