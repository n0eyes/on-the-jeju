import { useContext } from "react";
import { APIContext } from "./api";

function useAPI() {
  const api = useContext(APIContext);

  return api;
}

export default useAPI;
