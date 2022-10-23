import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { GithubRepository } from "../../interfaces/github-repository";
import { api } from "../../services/api";
import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repo } from "./styles";
import { toast, ToastContainer } from "react-toastify";

export const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);
  const [newRepo, setNewRepo] = useState("");

  async function handleAddRepository(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      toast.error("É necessário informar seu nome / nome do repositório!!");
    } else {
      const response = await api.get<GithubRepository>(`repos/${newRepo}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo("");
    }
  }

  return (
    <div>
      <img src={logo} alt="Logo da aplicação" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form onSubmit={handleAddRepository}>
        <input placeholder="username/repository_name" value={newRepo} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewRepo(event.target.value)} />
        <button type="submit">Buscar</button>
      </Form>

      <Repo>
        {repositories.map((repository) => {
          return (
            <Link className="link" id="teste" to="/repositories" key={repository.full_name}>
              <img src={repository.owner.avatar_url} alt={repository.owner.login} />

              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>

              <FiChevronRight size={20} />
            </Link>
          );
        })}
      </Repo>

      <ToastContainer />
    </div>
  );
};
