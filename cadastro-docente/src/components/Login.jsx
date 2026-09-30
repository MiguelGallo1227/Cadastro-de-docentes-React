import { useState } from 'react';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (usuario === '' || senha === '') {
      setErro('Preencha usuário e senha.');
      return;
    }

    setErro('');
    onLogin();
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-header bg-dark text-white">
              <h3 className="mb-0">
                Sistema de Docentes
              </h3>
            </div>

            <div className="card-body">

              <h4 className="mb-4">
                Login
              </h4>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Usuário
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={usuario}
                    onChange={(event) =>
                      setUsuario(event.target.value)
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Senha
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={senha}
                    onChange={(event) =>
                      setSenha(event.target.value)
                    }
                  />

                </div>

                {erro && (
                  <div className="alert alert-danger">
                    {erro}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Entrar
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;