function ListDocentes({
  docentes,
  handleEditDocente,
  handleDeleteDocente
}) {
  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          Docentes Cadastrados
        </h2>

        <span className="badge text-bg-primary fs-6">
          {docentes.length} docente(s)
        </span>

      </div>

      {docentes.length === 0 ? (

        <div className="alert alert-info">
          Nenhum docente cadastrado.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-striped table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>Nome</th>
                <th>Formação / Área</th>
                <th>Email Institucional</th>
                <th>Telefone</th>
                <th>UF</th>
                <th>Ações</th>
              </tr>

            </thead>

            <tbody>

              {docentes.map((docente) => (

                <tr key={docente.id}>

                  <td>
                    {docente.nome}
                  </td>

                  <td>
                    {docente.formacao}
                  </td>

                  <td>
                    {docente.emailInstitucional}
                  </td>

                  <td>
                    {docente.telefone}
                  </td>

                  <td>
                    {docente.uf}
                  </td>

                  <td>

                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          handleEditDocente(docente)
                        }
                      >
                        Alterar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDeleteDocente(
                            docente.id
                          )
                        }
                      >
                        Remover
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default ListDocentes;