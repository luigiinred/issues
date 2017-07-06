import { watchAuth } from "./auth";

export default function* rootSaga() {
  yield [watchAuth()];
}
