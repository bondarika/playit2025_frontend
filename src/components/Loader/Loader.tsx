import './styles.scss';
function Loader() {
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          height: 'calc(100% - 55px)',
          alignItems: 'center',
          position: 'fixed',
        }}
      >
        <div className="loader"></div>
      </div>
    </>
  );
}

export default Loader;