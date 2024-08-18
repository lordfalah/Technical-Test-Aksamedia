import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { storePeople } from "../store/peopleStore";
import { TPeople } from "../types/people.type";

const useDataTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") || "",
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("current_page")) || 1,
  );

  const peopleLocalStorage = storePeople.getSnapshot();
  const peoples = JSON.parse(peopleLocalStorage as string) as TPeople[];

  useEffect(() => {
    const newParams: Record<string, string> = {
      current_page: currentPage.toString(),
      search: searchTerm,
    };

    // Cek jika ada parameter `id`, tambahkan kembali ke search params
    if (searchParams.has("id")) {
      newParams["id"] = searchParams.get("id")!;
    }

    setSearchParams(newParams);
  }, [currentPage, searchTerm, setSearchParams, searchParams]);

  const filteredPeople = useMemo(() => {
    if (!searchTerm) return peoples;
    return peoples.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, peoples]);

  const currentTableData = useMemo(() => {
    const PageSize = 10;
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const dataForCurrentPage = peoples.slice(firstPageIndex, lastPageIndex);

    if (!searchTerm) return dataForCurrentPage;
    return dataForCurrentPage.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [currentPage, searchTerm, peoples]);

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    filteredPeople,
    currentTableData,
  };
};

export default useDataTable;
