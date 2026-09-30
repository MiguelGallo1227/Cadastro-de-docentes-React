function Welcome({ docentes, onNewDocente }) {
  return (
    <div>

      <div className="p-5 mb-4 bg-light rounded-3">

        <div className="container-fluid py-3">

          <h1 className="display-5 fw-bold">
            Bem-vindo ao sistema
          </h1>

          <p className="fs-5">
            Sistema de cadastro e gerenciamento de docentes.
          </p>

          <button
            className="btn btn-primary btn-lg"
            onClick={onNewDocente}
          >
            Cadastrar docente
          </button>

        </div>

      </div>

      <div className="row">

        <div className="col-md-4">

          <div className="card text-center">

            <div className="card-body">

              <h5 className="card-title">
                Docentes cadastrados
              </h5>

              <h2>
                {docentes.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card text-center">

            <div className="card-body">

              <h5 className="card-title">
                Cadastro
              </h5>

              <p className="card-text">
                Cadastre novos docentes no sistema.
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card text-center">

            <div className="card-body">

              <h5 className="card-title">
                Gerenciamento
              </h5>

              <p className="card-text">
                Altere ou remova docentes cadastrados.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Welcome;