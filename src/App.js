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

  async function handleAddRepository() {
    const project = {
      title : `QUERO SER GOOGLE ${Date.now()}`,
      url : "www.google.com",
      techs : ["PHP" , "JavaScropt", "Java", "NODEJS", "Flutter"]
    };

    const response = await api.post('repositories', project);

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const newRepositories = repositories.filter(
        repository => repository.id !== id
      )
  
      setRepositories(newRepositories);
    }
 
  }

  return (
    <div>
    <ul data-testid="repository-list">
      
        {repositories.map(repository => (
          <div key={repository.id}>
            <li >
            {repository.title}
            <br />
              <ul>
                {repository.techs.map(tech => <li key={tech}>{tech}</li>)}
              </ul>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        </div> 
        ))}
      
    </ul>

    <button onClick={handleAddRepository}>Adicionar</button>
  </div>
  );
}

export default App;
