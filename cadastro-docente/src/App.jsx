import { useState } from 'react';

import Login from './components/Login';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import DocenteForm from './components/DocenteForm';
import ListDocentes from './components/ListDocentes';

function App() {
  const [logado, setLogado] = useState(false);

  const [activeScreen, setActiveScreen] = useState('welcome');

  const [docentes, setDocentes] = useState([]);

  const [docenteToEdit, setDocenteToEdit] = useState(null);

  function handleLogin() {
    setLogado(true);
    setActiveScreen('welcome');
  }

  function handleLogout() {
    setLogado(false);
    setActiveScreen('welcome');
  }

  function handleSubmit(docente) {
    if (docenteToEdit) {
      setDocentes(
        docentes.map((item) =>
          item.id === docenteToEdit.id
            ? { ...docente, id: docenteToEdit.id }
            : item
        )
      );

      setDocenteToEdit(null);
      setActiveScreen('listar');
    } else {
      const novoDocente = {
        ...docente,
        id: Date.now()
      };

      setDocentes([...docentes, novoDocente]);
      setActiveScreen('listar');
    }
  }

  function handleEditDocente(docente) {
    setDocenteToEdit(docente);
    setActiveScreen('cadastrar');
  }

  function handleDeleteDocente(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja remover este docente?'
    );

    if (confirmar) {
      setDocentes(
        docentes.filter((docente) => docente.id !== id)
      );
    }
  }

  function handleNewDocente() {
    setDocenteToEdit(null);
    setActiveScreen('cadastrar');
  }

  if (!logado) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>

      <Menu
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        onLogout={handleLogout}
        onNewDocente={handleNewDocente}
      />

      <main className="container mt-4">

        {activeScreen === 'welcome' && (
          <Welcome
            docentes={docentes}
            onNewDocente={handleNewDocente}
          />
        )}

        {activeScreen === 'cadastrar' && (
          <DocenteForm
            handleSubmit={handleSubmit}
            docenteToEdit={docenteToEdit}
          />
        )}

        {activeScreen === 'listar' && (
          <ListDocentes
            docentes={docentes}
            handleEditDocente={handleEditDocente}
            handleDeleteDocente={handleDeleteDocente}
          />
        )}

      </main>

    </div>
  );
}

export default App;