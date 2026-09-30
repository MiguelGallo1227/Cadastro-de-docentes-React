function Menu({
  activeScreen,
  setActiveScreen,
  onLogout,
  onNewDocente
}) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">

        <span className="navbar-brand">
          Cadastro de Docentes
        </span>

        <div className="d-flex gap-2">

          <button
            className={
              activeScreen === 'welcome'
                ? 'btn btn-primary'
                : 'btn btn-outline-light'
            }
            onClick={() => setActiveScreen('welcome')}
          >
            Início
          </button>

          <button
            className={
              activeScreen === 'cadastrar'
                ? 'btn btn-primary'
                : 'btn btn-outline-light'
            }
            onClick={onNewDocente}
          >
            Cadastrar
          </button>

          <button
            className={
              activeScreen === 'listar'
                ? 'btn btn-primary'
                : 'btn btn-outline-light'
            }
            onClick={() => setActiveScreen('listar')}
          >
            Listar
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={onLogout}
          >
            Sair
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Menu;