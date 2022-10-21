import React from "react";
import { Title, Form } from "./styles";
import logo from "../../assets/logo.svg";

export const Dashboard: React.FC = () => {
  return (
    <div>
      <img src={logo} alt="Logo da aplicação" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form>
        <input placeholder="username/repository_name" />
        <button type="submit">Buscar</button>
      </Form>
    </div>
  );
};
