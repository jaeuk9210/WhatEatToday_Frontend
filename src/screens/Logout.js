import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import route from "../routes";

function Logout() {
  const history = useHistory();
  useEffect(() => {
    logUserOut();
    history.push(route.home);
  });

  return;
}

export default Logout;
