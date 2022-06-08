import { mock } from "./mock";
import { real } from "./real";
const authAPI = {
  // ...mock,
  ...real,
};

export default authAPI;
