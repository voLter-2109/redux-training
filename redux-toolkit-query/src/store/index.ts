import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubApi } from "./github/github.api";
import { githubReduser } from "./github/gitHun.slice";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReduser,
  },
  //   данные
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

// парамент на обновление данных в случае страница быда потеряна из фокуса и КЛ верулся обратно на страницу,
// доп параменты в основном store \ createApi
// refetchOnFocus: true,
// парамент на странице UI
setupListeners(store.dispatch);

// создание типа на основе данных прямо из store
export type RootState = ReturnType<typeof store.getState>;
