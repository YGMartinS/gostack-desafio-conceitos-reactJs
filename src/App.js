import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Repositório Ruby on Rails", 
 	    url: "http://github.com/...", 
	    techs: ["Node.js"]
    });
    setRepositories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repositorieIndex = repositories.findIndex(repo => repo.id === id);
    repositories.splice(repositorieIndex, 1);
    setRepositories([ ...repositories ]);
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => <li key={repositorie.id}>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
