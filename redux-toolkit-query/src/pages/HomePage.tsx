import React, { useEffect, useState } from "react";
import RepoCard from "../components/RepoCard";
import { useDebouce } from "../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  //   useDebouce паттерн для задрежки при быстро меняющемся значении,
  //  что бы не направлять много запросов на сервер
  const debounced = useDebouce(search);
  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    // skip  при каких условиях кастомный useSearchUsersQuery не вызывать
    skip: debounced.length < 3,
    // парамент на обновление данных в случае страница быда потеряна из фокуса и КЛ верулся обратно на страницу,
    // доп параменты в основном store \ createApi
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (userName: string) => {
    fetchRepos(userName);
    setDropdown(false);
  };

  useEffect(() => {
    setDropdown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}
      <div className=" relative w-[560px]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
        />
        {dropdown && (
          <ul className=" list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {users?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white
            transition-colors cursor-pointer "
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && (
            <p className="text-center ">Peros are loading...</p>
          )}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
