import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { GithubRepository } from "../../interfaces/github-repository";
import { api } from "../../services/api";
import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repo } from "./styles";
import { toast, ToastContainer } from "react-toastify";

export const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem("GitCollection:repositories");

    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    return [];
  });
  const [newRepo, setNewRepo] = useState("");

  async function handleAddRepository(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      toast.error("É necessário informar seu nome / nome do repositório!!");
      return;
    }

    try {
      const response = await api.get<GithubRepository>(`repos/${newRepo}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo("");
    } catch {
      toast.error("Repositório não encontrado no Github!!!");
    }
  }

  useEffect(() => {
    localStorage.setItem("GitCollection:repositories", JSON.stringify(repositories));
  }, [repositories]);

  return (
    <div>
      <img src={logo} alt="Logo da aplicação" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form onSubmit={handleAddRepository}>
        <input placeholder="username/repository_name" value={newRepo} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewRepo(event.target.value)} />
        <button type="submit">Buscar</button>
      </Form>

      <Repo>
        {repositories && repositories.length > 0 ? (
          <>
            {repositories.map((repository: any, index: any) => {
              return (
                <Link className="link" id="teste" to={`/repositories/${repository.full_name}`} key={repository.full_name + index}>
                  <img src={repository.owner.avatar_url} alt={repository.owner.login} />

                  <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                  </div>

                  <FiChevronRight size={20} />
                </Link>
              );
            })}
          </>
        ) : (
          <>
            <h1>Não existem repositórios para serem listados</h1>
          </>
        )}
      </Repo>

      <ToastContainer />
    </div>
  );
};
