import { useSearchParams } from "react-router-dom";

export const useSearchParam = (param: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = () => {
    return searchParams.get(param);
  };

  const removeParam = () => {
    if (searchParams.has(param)) {
      searchParams.delete(param);
      setSearchParams(searchParams);
    }
  };

  return { getParam, removeParam };
};
