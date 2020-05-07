import React, {useState, useEffect} from 'react';
import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('repositories');

      setRepositories(response.data)
    }

    getRepositories()
  },[]);

  return (
    <div>
    <ul data-testid="repository-list">
      
        {repositories.map(repository => (
          <div>
            <li key={repository.id}>
            {repository.title}
              <ul>
                {repository.techs.map(tech => <li key={tech}>{tech}</li>)}
              </ul>
              <button onClick={() => {}}>
                Remover
              </button>
            </li>
        </div> 
        ))}
      
    </ul>

    <button onClick={() => {}}>Adicionar</button>
  </div>
  );
}

export default App;
