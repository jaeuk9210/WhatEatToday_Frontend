import { useParams } from "react-router-dom";

function Test({ history }) {
  const id = useParams().id;

  return <>{id}</>;
}

export default Test;
