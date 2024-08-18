import { Fragment, useState } from "react";
import Search from "../../components/ui/Search";
import Modal from "../../components/ui/Modal";
import Trash from "../../components/icons/Trash";
import { setPeople } from "../../store/peopleStore";
import FormAdd from "../../components/forms/FormAdd";
import FormEdit from "../../components/forms/FormEdit";
import { useSearchParam } from "../../hooks/useSearchParam";
import Pagination from "../../components/ui/Pagination";
import useFilterData from "../../hooks/useFilterData";
import TablePeople from "../../components/tables/TablePeople";
import Plus from "../../components/icons/Plus";
import ClipboardList from "../../components/icons/ClipboardList";

const PageSize = 10;

const PageDashboard = () => {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    filteredPeople,
    currentTableData,
  } = useFilterData(PageSize);
  const { removeParam, getParam } = useSearchParam("id");

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = () => {
    const findPeople = currentTableData.find(
      (people) => people.id === getParam(),
    );
    if (findPeople !== undefined) {
      setPeople(findPeople, "DELETE");
    }
    setOpenDelete(false);
    removeParam();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGenerateData = () => {
    setPeople({ email: "", id: "", name: "", role: "" }, "GENERATE");
    window.location.reload();
  };

  return (
    <Fragment>
      <Modal
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          removeParam();
        }}
      >
        <div className="w-full px-4 sm:w-80 sm:px-0">
          <FormEdit setOpen={setOpenEdit} />
        </div>
      </Modal>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <div className="w-full px-4 sm:w-80 sm:px-0">
          <FormAdd setOpen={setOpenAdd} />
        </div>
      </Modal>

      <Modal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
          removeParam();
        }}
      >
        <div className="w-56 text-center">
          <Trash className="mx-auto size-6 text-red-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800 dark:text-white/90">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4 text-black dark:text-white">
            <button
              className="btn btn-light w-full"
              onClick={() => setOpenDelete(false)}
            >
              Cancel
            </button>

            <button className="btn btn-danger w-full" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <section className="mx-auto min-h-screen max-w-screen-lg space-y-4 px-4 pb-40 pt-8">
        <div className="flex items-center justify-between gap-x-5">
          <Search value={searchTerm} onChange={handleSearchChange} />

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleGenerateData}
              type="button"
              className="rounded-full bg-red-500 p-2 font-medium text-white sm:rounded-md sm:px-3 sm:py-2"
            >
              <div className="flex gap-2">
                <ClipboardList className="sm:stroke-1.5 size-5 stroke-2 sm:size-6" />
                <span className="hidden sm:block">Generate Data</span>
              </div>
            </button>

            <button
              onClick={() => setOpenAdd(true)}
              type="button"
              className="rounded-full bg-blue-500 p-2 font-medium text-white sm:rounded-md sm:px-3 sm:py-2"
            >
              <div className="flex gap-2">
                <Plus className="sm:stroke-1.5 size-5 stroke-2 sm:size-6" />
                <span className="hidden sm:block">Add Data</span>
              </div>
            </button>
          </div>
        </div>

        <TablePeople
          data={currentTableData}
          headCols={["No", "Person", "Name", "Role", "Action"]}
          setOpenDelete={setOpenDelete}
          setOpenEdit={setOpenEdit}
        />

        {!searchTerm && (
          <Pagination
            className="-mx-4 flex items-center justify-center sm:mx-0 sm:justify-end"
            currentPage={currentPage}
            totalCount={filteredPeople.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </section>
    </Fragment>
  );
};

export default PageDashboard;
