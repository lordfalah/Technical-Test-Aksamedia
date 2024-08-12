import React, { Fragment } from "react";
import { TPeople } from "../../types/people.type";
import PencilSquare from "../icons/PencilSquare";
import Trash from "../icons/Trash";
import { useNavigate } from "react-router-dom";
import NoDataAvailable from "../Errors/NoDataAvailable";

type TTablePeople = {
  data: TPeople[];
  headCols: string[];
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const TablePeople: React.FC<TTablePeople> = ({
  data,
  headCols,
  setOpenDelete,
  setOpenEdit,
}) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed divide-y-2 divide-gray-200 rounded-md bg-white text-sm dark:divide-gray-700 dark:bg-gray-700">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                {headCols.map((colName, idx) => (
                  <th
                    key={idx}
                    className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-200"
                  >
                    {colName}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map(({ email, name, role, id }, idx) => (
                <tr
                  key={`${id}-${idx}`}
                  className="odd:bg-gray-50 odd:dark:bg-gray-600"
                >
                  <td className="w-20 whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">
                    {idx + 1}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://robohash.org/${id}.png?size=55x55`}
                        alt={`Avatar : ${idx}`}
                        className="rounded-full bg-slate-500"
                      />

                      <p className="truncate text-gray-700 dark:text-gray-200">
                        {email}
                      </p>
                    </div>
                  </td>

                  <td className="mx-auto truncate whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {name}
                  </td>

                  <td className="truncate whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {role}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenEdit(true);
                          navigate(`/dashboard?id=${id}`);
                        }}
                      >
                        <PencilSquare className="size-6 stroke-indigo-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOpenDelete(true);
                          navigate(`/dashboard?id=${id}`);
                        }}
                      >
                        <Trash className="size-6 stroke-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataAvailable className="px-4 pt-10 sm:pt-40" />
      )}
    </Fragment>
  );
};

export default TablePeople;
