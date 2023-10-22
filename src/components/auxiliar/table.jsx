import React, {useEffect} from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../ui/table";
import {Button} from "../ui/button";
import {AiOutlineBackward, AiOutlineForward, AiOutlineStepBackward, AiOutlineStepForward,} from "react-icons/ai";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "../ui/select";
import {Input} from "../ui/input";
import PropTypes from "prop-types";
import isRequiredIf from "react-proptype-conditional-require";
import {cn} from "../../lib/utils";

export function SGTable({
                            data,
                            selectOption = false,
                            setRowSelection,
                            rowSelection,
                            setFilter = true,
                            setPagination = true
                        }) {
    const [globalFilter, setGlobalFilter] = React.useState("");
    const table = useReactTable({
        data: data.rows,
        columns: data.columns,
        state: {
            globalFilter,
            ...(selectOption === true && {rowSelection}),
        },
        // Pipeline
        ...(selectOption === true && {
            enableRowSelection: true,
            onRowSelectionChange: setRowSelection,
        }),
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //
    });

    const [firstVisibleButton, setFirstVisibleButton] = React.useState(0);
    const pageIndex = table.getState().pagination.pageIndex;
    // Este efecto se activará cada vez que cambies de página
    useEffect(() => {
        const currentPage = table.getState().pagination.pageIndex;

        // Cuando la página actual está fuera del rango actual de los botones visibles
        if (
            currentPage < firstVisibleButton ||
            currentPage >= firstVisibleButton + 5
        ) {
            // Asegurarse de que el rango de botones visibles siempre comienza en un múltiplo de 5 que es menor o igual a la página actual
            setFirstVisibleButton(Math.floor(currentPage / 5) * 5);
        }
    }, [pageIndex, firstVisibleButton, table]);
    return (
        <div className="flex flex-col items-start w-full h-full gap-3">
            <div className="flex flex-row-reverse w-full">
                {setFilter && (
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="p-2 font-lg shadow border border-block"
                        placeholder="Buscar..."
                    />
                )}
            </div>
            <div className="flex flex-col w-full gap-3">
                <Table>
                    <TableHeader className="border-b-2 border-b-[#A6A6A6]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="text-gray-800 font-semibold text-center"
                                        >
                                            {!header.isPlaceholder && (
                                                <>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={`font-normal text-center items-center`}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {setPagination && (
                    <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
                        <div className="grid grid-cols-2 items-center gap-3 pl-2">
                            <p className="text-xs font-medium">Filas por página</p>
                            <Select
                                value={table.getState().pagination.pageSize}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="w-[65px]">
                                    <SelectValue placeholder="Cauntity per page"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
                            <div className="flex items-center flex-col sm:flex-row gap-3">
                                <div className="flex flex-row gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            table.setPageIndex(0);
                                            setFirstVisibleButton(0);
                                        }}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <AiOutlineStepBackward/>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            const newPage = Math.max(
                                                table.getState().pagination.pageIndex - 1,
                                                0
                                            );
                                            table.setPageIndex(newPage);
                                            if (newPage < firstVisibleButton + 1 && newPage > 0) {
                                                setFirstVisibleButton(firstVisibleButton - 1);
                                            }
                                        }}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <AiOutlineBackward/>
                                    </Button>
                                    <div className="flex justify-center gap-1">
                                        {Array.from(
                                            {
                                                length: Math.min(
                                                    5,
                                                    table.getPageCount() - firstVisibleButton
                                                ),
                                            },
                                            (_, i) => (
                                                <Button
                                                    size="sm"
                                                    key={i}
                                                    onClick={() => {
                                                        const newPageIndex = firstVisibleButton + i;
                                                        table.setPageIndex(newPageIndex);
                                                        // Si el botón seleccionado es el último en el rango actual y no es el último en total
                                                        if (
                                                            i === 4 &&
                                                            firstVisibleButton + i < table.getPageCount() - 1
                                                        ) {
                                                            setFirstVisibleButton(firstVisibleButton + 1);
                                                        } else if (i === 0 && firstVisibleButton > 0) {
                                                            // Si el botón seleccionado es el primero en el rango actual y no es el primero en total
                                                            setFirstVisibleButton(firstVisibleButton - 1);
                                                        }
                                                    }}
                                                >
                                                    {`${firstVisibleButton + i + 1}`}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            const newPage = Math.min(
                                                table.getState().pagination.pageIndex + 1,
                                                table.getPageCount() - 1
                                            );
                                            table.setPageIndex(newPage);
                                            if (
                                                newPage > firstVisibleButton + 3 &&
                                                newPage < table.getPageCount() - 1
                                            ) {
                                                setFirstVisibleButton(firstVisibleButton + 1);
                                            }
                                        }}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        <AiOutlineForward/>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            table.setPageIndex(table.getPageCount() - 1);
                                            setFirstVisibleButton(
                                                Math.max(0, table.getPageCount() - 5)
                                            );
                                        }}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        <AiOutlineStepForward/>
                                    </Button>
                                </div>
                            </div>
                            <div
                                className="flex flex-row w-full md:justify-between justify-center items-center gap-3 pl-2">
                                <div className="flex flex-row w-auto">
                                    <p className="w-full text-center sm:text-left text-xs">
                                        Página{" "}
                                        <strong className="text-xs">
                                            {table.getState().pagination.pageIndex + 1} de{" "}
                                            {table.getPageCount()}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DebouncedInput({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }) {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, debounce, onChange]);
    const css = props.className ?? "";
    return (
        <div className="relative">
            <Input
                {...props}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`pr-10 ${css}`} // Agrega un padding a la izquierda para el ícono
            />
        </div>
    );
}

export function IndeterminateCheckbox({
                                          indeterminate,
                                          className = "",
                                          ...rest
                                      }) {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={cn(
                className,
                "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            )}
            {...rest}
        />
    );
}

export function IndeterminateRadio({indeterminate, className = "", ...rest}) {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="radio"
            ref={ref}
            name="selected"
            className={cn(
                className,
                "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            )}
            {...rest}
        />
    );
}

SGTable.propTypes = {
    data: PropTypes.object.isRequired,
    selectOption: PropTypes.bool,
    rowSelection: isRequiredIf(
        PropTypes.object,
        (props) => props.selectOption === true
    ),
    setRowSelection: isRequiredIf(
        PropTypes.func,
        (props) => props.selectOption === true
    ),
};
