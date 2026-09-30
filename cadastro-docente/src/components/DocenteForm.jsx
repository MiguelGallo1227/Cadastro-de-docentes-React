import { useEffect, useState } from 'react';

function DocenteForm({ handleSubmit, docenteToEdit }) {

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [formacao, setFormacao] = useState('');

  const [emailInstitucional, setEmailInstitucional] = useState('');
  const [emailParticular, setEmailParticular] = useState('');
  const [telefone, setTelefone] = useState('');

  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');

  const [erros, setErros] = useState({});

  const estados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ];

  useEffect(() => {

    if (docenteToEdit) {

      setNome(docenteToEdit.nome);
      setCpf(docenteToEdit.cpf);
      setFormacao(docenteToEdit.formacao);

      setEmailInstitucional(
        docenteToEdit.emailInstitucional
      );

      setEmailParticular(
        docenteToEdit.emailParticular
      );

      setTelefone(docenteToEdit.telefone);

      setEndereco(docenteToEdit.endereco);
      setNumero(docenteToEdit.numero);
      setCidade(docenteToEdit.cidade);
      setCep(docenteToEdit.cep);
      setUf(docenteToEdit.uf);

    } else {

      setNome('');
      setCpf('');
      setFormacao('');

      setEmailInstitucional('');
      setEmailParticular('');
      setTelefone('');

      setEndereco('');
      setNumero('');
      setCidade('');
      setCep('');
      setUf('');

    }

    setErros({});

  }, [docenteToEdit]);

  function aplicarMascaraCPF(valor) {

    valor = valor.replace(/\D/g, '');

    valor = valor.substring(0, 11);

    valor = valor.replace(
      /(\d{3})(\d)/,
      '$1.$2'
    );

    valor = valor.replace(
      /(\d{3})(\d)/,
      '$1.$2'
    );

    valor = valor.replace(
      /(\d{3})(\d{1,2})$/,
      '$1-$2'
    );

    return valor;
  }

  function aplicarMascaraTelefone(valor) {

    valor = valor.replace(/\D/g, '');

    valor = valor.substring(0, 11);

    if (valor.length <= 10) {

      valor = valor.replace(
        /(\d{2})(\d)/,
        '($1) $2'
      );

      valor = valor.replace(
        /(\d{4})(\d)/,
        '$1-$2'
      );

    } else {

      valor = valor.replace(
        /(\d{2})(\d)/,
        '($1) $2'
      );

      valor = valor.replace(
        /(\d{5})(\d)/,
        '$1-$2'
      );
    }

    return valor;
  }

  function aplicarMascaraCEP(valor) {

    valor = valor.replace(/\D/g, '');

    valor = valor.substring(0, 8);

    valor = valor.replace(
      /(\d{5})(\d)/,
      '$1-$2'
    );

    return valor;
  }

  function validarCPF(cpf) {

    const numeroCPF = cpf.replace(/\D/g, '');

    if (numeroCPF.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(numeroCPF)) {
      return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma +=
        Number(numeroCPF.charAt(i)) *
        (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
      resto = 0;
    }

    if (resto !== Number(numeroCPF.charAt(9))) {
      return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma +=
        Number(numeroCPF.charAt(i)) *
        (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
      resto = 0;
    }

    return resto === Number(numeroCPF.charAt(10));
  }

  function validar() {

    const novosErros = {};

    if (nome.trim().length < 3) {
      novosErros.nome =
        'O nome deve ter no mínimo 3 caracteres.';
    }

    if (!validarCPF(cpf)) {
      novosErros.cpf =
        'Informe um CPF válido.';
    }

    if (formacao.trim() === '') {
      novosErros.formacao =
        'Informe a formação ou área de atuação.';
    }

    if (
      emailInstitucional.trim() === '' ||
      !emailInstitucional.includes('@')
    ) {
      novosErros.emailInstitucional =
        'Informe um email institucional válido.';
    }

    if (
      emailParticular.trim() !== '' &&
      !emailParticular.includes('@')
    ) {
      novosErros.emailParticular =
        'Informe um email particular válido.';
    }

    if (telefone.replace(/\D/g, '').length !== 11) {
      novosErros.telefone =
        'Informe um telefone celular válido.';
    }

    if (endereco.trim() === '') {
      novosErros.endereco =
        'Informe o endereço residencial.';
    }

    if (numero.trim() === '') {
      novosErros.numero =
        'Informe o número.';
    }

    if (cidade.trim() === '') {
      novosErros.cidade =
        'Informe a cidade.';
    }

    if (cep.replace(/\D/g, '').length !== 8) {
      novosErros.cep =
        'Informe um CEP válido.';
    }

    if (uf === '') {
      novosErros.uf =
        'Selecione um estado.';
    }

    return novosErros;
  }

  function enviarFormulario(event) {

    event.preventDefault();

    const novosErros = validar();

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    const docente = {
      nome: nome.trim(),
      cpf,
      formacao: formacao.trim(),

      emailInstitucional:
        emailInstitucional.trim(),

      emailParticular:
        emailParticular.trim(),

      telefone,

      endereco:
        endereco.trim(),

      numero:
        numero.trim(),

      cidade:
        cidade.trim(),

      cep,

      uf
    };

    handleSubmit(docente);
  }

  return (
    <div className="row justify-content-center">

      <div className="col-lg-10">

        <div className="card shadow-sm">

          <div className="card-header bg-primary text-white">

            <h2 className="mb-0">

              {docenteToEdit
                ? 'Alterar Docente'
                : 'Cadastrar Novo Docente'}

            </h2>

          </div>

          <div className="card-body">

            <form onSubmit={enviarFormulario}>

              <h3 className="mb-3">
                Dados Pessoais
              </h3>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Nome Completo
                  </label>

                  <input
                    type="text"
                    className={
                      erros.nome
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={nome}
                    onChange={(event) =>
                      setNome(event.target.value)
                    }
                  />

                  {erros.nome && (
                    <div className="invalid-feedback">
                      {erros.nome}
                    </div>
                  )}

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    CPF
                  </label>

                  <input
                    type="text"
                    className={
                      erros.cpf
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={cpf}
                    placeholder="000.000.000-00"
                    onChange={(event) =>
                      setCpf(
                        aplicarMascaraCPF(
                          event.target.value
                        )
                      )
                    }
                  />

                  {erros.cpf && (
                    <div className="invalid-feedback">
                      {erros.cpf}
                    </div>
                  )}

                </div>

                <div className="col-12 mb-3">

                  <label className="form-label">
                    Formação / Área de Atuação
                  </label>

                  <input
                    type="text"
                    className={
                      erros.formacao
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={formacao}
                    onChange={(event) =>
                      setFormacao(event.target.value)
                    }
                  />

                  {erros.formacao && (
                    <div className="invalid-feedback">
                      {erros.formacao}
                    </div>
                  )}

                </div>

              </div>

              <hr />

              <h3 className="mb-3">
                Contatos
              </h3>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Email Institucional
                  </label>

                  <input
                    type="email"
                    className={
                      erros.emailInstitucional
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={emailInstitucional}
                    onChange={(event) =>
                      setEmailInstitucional(
                        event.target.value
                      )
                    }
                  />

                  {erros.emailInstitucional && (
                    <div className="invalid-feedback">
                      {erros.emailInstitucional}
                    </div>
                  )}

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Email Particular
                  </label>

                  <input
                    type="email"
                    className={
                      erros.emailParticular
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={emailParticular}
                    onChange={(event) =>
                      setEmailParticular(
                        event.target.value
                      )
                    }
                  />

                  {erros.emailParticular && (
                    <div className="invalid-feedback">
                      {erros.emailParticular}
                    </div>
                  )}

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Telefone Celular
                  </label>

                  <input
                    type="tel"
                    className={
                      erros.telefone
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={telefone}
                    placeholder="(00) 00000-0000"
                    onChange={(event) =>
                      setTelefone(
                        aplicarMascaraTelefone(
                          event.target.value
                        )
                      )
                    }
                  />

                  {erros.telefone && (
                    <div className="invalid-feedback">
                      {erros.telefone}
                    </div>
                  )}

                </div>

              </div>

              <hr />

              <h3 className="mb-3">
                Endereço
              </h3>

              <div className="row">

                <div className="col-md-8 mb-3">

                  <label className="form-label">
                    Endereço Residencial
                  </label>

                  <input
                    type="text"
                    className={
                      erros.endereco
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={endereco}
                    onChange={(event) =>
                      setEndereco(event.target.value)
                    }
                  />

                  {erros.endereco && (
                    <div className="invalid-feedback">
                      {erros.endereco}
                    </div>
                  )}

                </div>

                <div className="col-md-4 mb-3">

                  <label className="form-label">
                    Número
                  </label>

                  <input
                    type="text"
                    className={
                      erros.numero
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={numero}
                    onChange={(event) =>
                      setNumero(event.target.value)
                    }
                  />

                  {erros.numero && (
                    <div className="invalid-feedback">
                      {erros.numero}
                    </div>
                  )}

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Cidade
                  </label>

                  <input
                    type="text"
                    className={
                      erros.cidade
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={cidade}
                    onChange={(event) =>
                      setCidade(event.target.value)
                    }
                  />

                  {erros.cidade && (
                    <div className="invalid-feedback">
                      {erros.cidade}
                    </div>
                  )}

                </div>

                <div className="col-md-3 mb-3">

                  <label className="form-label">
                    CEP
                  </label>

                  <input
                    type="text"
                    className={
                      erros.cep
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={cep}
                    placeholder="00000-000"
                    onChange={(event) =>
                      setCep(
                        aplicarMascaraCEP(
                          event.target.value
                        )
                      )
                    }
                  />

                  {erros.cep && (
                    <div className="invalid-feedback">
                      {erros.cep}
                    </div>
                  )}

                </div>

                <div className="col-md-3 mb-3">

                  <label className="form-label">
                    UF
                  </label>

                  <select
                    className={
                      erros.uf
                        ? 'form-select is-invalid'
                        : 'form-select'
                    }
                    value={uf}
                    onChange={(event) =>
                      setUf(event.target.value)
                    }
                  >

                    <option value="">
                      Selecione
                    </option>

                    {estados.map((estado) => (
                      <option
                        key={estado}
                        value={estado}
                      >
                        {estado}
                      </option>
                    ))}

                  </select>

                  {erros.uf && (
                    <div className="invalid-feedback">
                      {erros.uf}
                    </div>
                  )}

                </div>

              </div>

              <hr />

              <button
                type="submit"
                className="btn btn-primary"
              >
                {docenteToEdit
                  ? 'Salvar Alterações'
                  : 'Cadastrar Docente'}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DocenteForm;