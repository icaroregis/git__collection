import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Repositories } from "../pages/Repositories";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repositories" component={Repositories} />
    </Switch>
  );
};
