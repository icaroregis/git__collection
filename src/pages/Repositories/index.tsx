import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RepositoryParams } from "../../interfaces/repository-params";
import { GithubIssue } from "../../interfaces/github-issue";
import { Header, RepoInfo, Issues } from "./styles";
import logo from "../../assets/logo.svg";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

const Repositories: React.FC = () => {
  const [repository, setRepository] = React.useState<RepositoryParams | null>(null);
  const [issues, setIssues] = React.useState<GithubIssue[]>([]);
  const params = useParams();
  const newParams = `${params.owner}/${params.repo}`;

  useEffect(() => {
    api
      .get<RepositoryParams>(`repos/${newParams}`)
      .then((response: AxiosResponse<RepositoryParams>) => setRepository(response.data))
      .catch((err: string) => {
        toast.error(`Oops, ocorreu um erro ${err}`);
      });

    api
      .get<GithubIssue[]>(`repos/${newParams}/issues`)
      .then((response: AxiosResponse<GithubIssue[]>) => setIssues(response.data))
      .catch((err: string) => {
        toast.error(`Oops, ocorreu um erro ${err}`);
      });
  }, [newParams]);

  console.log(issues);

  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />

        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepoInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>

            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>

            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepoInfo>
      )}

      <Issues>
        {issues &&
          issues.length > 0 &&
          issues.map((issue) => (
            <Link to={issue.html_url} key={issue.id}>
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>

              <FiChevronRight size={20} />
            </Link>
          ))}
      </Issues>
    </>
  );
};

export default Repositories;
