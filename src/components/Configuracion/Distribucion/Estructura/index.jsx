import React from "react";
import {
  useDeleteEstructuraMutation,
  useGetEstructurasQuery,
} from "./service/estructura.service";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import RenderTreeView from "./TreeView";
export default function IndexEstructura() {
  const { data } = useGetEstructurasQuery(undefined, {
    refetchOnReconnect: true,
  });

  if (!data) {
    return;
  }

  const filteredData = data.filter((item) => item.category.name === "Complejo");

  return (
    <>
      <div className="flex border-b border-gray-300 justify-between">
        <h2 className="text-gray-700 font-semibold text-lg justify-center al">
          Lista de Estructuras
        </h2>
        <Link
          to={"/configuracion/distribucion/estructura/create"}
          className={`mx-5 `}
        >
          <PlusCircle size={15} />
        </Link>
      </div>
      <div className="p-5">
        <RenderTreeView data={filteredData} />
      </div>
    </>
  );
}
