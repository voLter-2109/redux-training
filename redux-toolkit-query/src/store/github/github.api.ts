import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepo, IUser, ServerResponse } from "../../models/models";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  // парамент на обновление данных в случае страница быда потеряна из фокуса и КЛ верулся обратно на страницу,
  // доп параменты в основном store \ createApi
  // refetchOnFocus: true,
  // парамент на странице UI
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: "/search/users",
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
    // build.query<IRepo[], string>
    // <ответ от сервера. аргументы которые поступают в хук>
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `/users/${username}/repos`,
      }),
    }),
  }),
});

// useSearchUsersQuery кастомный хук - формируется автоматически в RTQ
// isLoading, isError, data и т.д. формируются автоматически
// useLazyGetUserReposQuery вызов хука по запросу со страницы
export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
