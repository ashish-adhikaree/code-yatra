"use client";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getFilteredRowModel,
    SortingState,
    getSortedRowModel,
    PaginationState,
    getPaginationRowModel,
} from "@tanstack/react-table";

import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    SearchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Spinner from "@public/spinner.gif";

interface DataTableProps<TData, TValue> {
    columns: any;
    data: TData[];
    totalItems: number;
    actions?: React.ReactNode;
    heading: string;
    columnVisibility?: Record<string, boolean>;
}

export function CustomTable<TData, TValue>({
    columns,
    data,
    totalItems,
    actions,
    heading,
    columnVisibility,
}: DataTableProps<TData, TValue>) {
    const memoisedColumns = useMemo(() => columns, [columns]);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const memoisedData = useMemo(() => data, [data]);
    const table = useReactTable({
        state: {
            globalFilter,
            sorting,
            pagination,
            columnVisibility: columnVisibility ?? {},
        },
        columns: memoisedColumns,
        data: memoisedData,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        globalFilterFn: "includesString", // built-in filter function
    });

    const currentPageIndex = table.getState().pagination.pageIndex;
    const totalPages = table.getPageCount();

    const selectedRowsIndex = Object.keys(table.getState().rowSelection) as unknown as number[];
    const selectedRows: any = selectedRowsIndex.map((index) => data[index]);

    const router = useRouter();

    const [loadingState, setLoadingState] = useState({
        approvedAll: false,
        rejectedAll: false,
        attendedAll: false,
        absentAll: false,
    });

    function approveOrRejectAll(type: "approved" | "rejected") {
        const pendingParticipants = selectedRows.filter((row: any) => row.status === "pending");
        const approvedParticipants = selectedRows.filter((row: any) => row.status === "approved");
    }

    function markAllAsAttendedorAbsent() {}

    return (
        <div>
            <div
                className={cn(
                    "flex items-center gap-2 flex-wrap fixed z-[100] right-1/2 translate-x-1/2 bg-muted rounded-lg p-4 border border-primary/30 shadow-sm transition-all ease-in-out duration-200 transition-colors-none",
                    selectedRows.length ? "bottom-6 pointer-events-auto" : "-bottom-20 pointer-events-none"
                )}
            >
                {selectedRows.length > 0 && selectedRows[0].event_status != "completed" ? (
                    <>
                        <Button
                            disabled={loadingState.approvedAll}
                            size="sm"
                            onClick={() => approveOrRejectAll("approved")}
                        >
                            {loadingState.approvedAll ? (
                                <>
                                    <Image src={Spinner} className="h-5 w-5" alt="loading" fetchPriority="high" />
                                    &nbsp;&nbsp;
                                </>
                            ) : null}
                            Accept selected
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Decline selected</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently decline these
                                        volunteer&apos;s request to join the event.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <Button
                                        disabled={loadingState.rejectedAll}
                                        variant="destructive"
                                        onClick={() => approveOrRejectAll("rejected")}
                                    >
                                        {loadingState.rejectedAll ? (
                                            <>
                                                <Image
                                                    src={Spinner}
                                                    className="h-5 w-5"
                                                    alt="loading"
                                                    fetchPriority="high"
                                                />
                                                &nbsp;&nbsp;
                                            </>
                                        ) : null}
                                        Reject selected
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                ) : null}
            </div>
            <div className="space-y-4">
                <div className="pt-4 flex gap-4 justify-between flex-col md:flex-row md:items-center">
                    <h2 className="text-base md:text-lg font-medium">
                        {heading} <span className="text-muted-foreground text-xs">({totalItems})</span>
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="py-2 px-4 rounded-xl bg-muted text-muted-foreground flex items-center w-[min(350px,100%)] text-sm border border-transparent focus-within:ring-1 focus-within:ring-muted-foreground">
                            <SearchIcon />
                            <input
                                onChange={(e) => {
                                    setGlobalFilter(e.target.value);
                                }}
                                placeholder="Search here..."
                                className="bg-transparent outline-none border-none w-full pl-2"
                            />
                        </div>
                        {actions && <div className="flex items-center gap-4">{actions}</div>}
                    </div>
                </div>
                <div className="pb-8">
                    <Table className="rounded-2xl overflow-clip">
                        <TableHeader className="font-medium bg-muted">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        const isSorted = header.column.getIsSorted();
                                        const canBeSorted = header.column.getCanSort();
                                        return (
                                            <TableHead key={header.id} className="whitespace-nowrap py-3">
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className={cn(
                                                            canBeSorted ? "cursor-pointer select-none" : "",
                                                            "flex items-center gap-2"
                                                        )}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        title={
                                                            canBeSorted
                                                                ? header.column.getNextSortingOrder() === "asc"
                                                                    ? "Sort ascending"
                                                                    : header.column.getNextSortingOrder() === "desc"
                                                                    ? "Sort descending"
                                                                    : "Clear sort"
                                                                : undefined
                                                        }
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {canBeSorted ? (
                                                            <div className="flex">
                                                                {isSorted !== "asc" && isSorted !== "desc" ? (
                                                                    <ArrowUpDown className="h-4 w-4" />
                                                                ) : isSorted == "asc" ? (
                                                                    <ArrowUp className="h-4 w-4" />
                                                                ) : (
                                                                    <ArrowDown className="h-4 w-4" />
                                                                )}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-3">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 py-4 px-4">
                                            <Button
                                                variant="outline"
                                                className="gap-2"
                                                onClick={() => table.firstPage()}
                                                disabled={!table.getCanPreviousPage()}
                                            >
                                                <ChevronFirst className="h-4 w-4" />
                                                First
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="gap-2"
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Previous
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="gap-2"
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                            >
                                                Next
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="gap-2"
                                                onClick={() => table.lastPage()}
                                                disabled={!table.getCanNextPage()}
                                            >
                                                Last
                                                <ChevronLast className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="whitespace-nowrap">
                                                Page {totalPages !== 0 ? currentPageIndex + 1 : 0} of &nbsp;
                                                {totalPages.toLocaleString()}
                                            </div>
                                            <div className="h-6 w-[2px] bg-foreground"></div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor="page" className="text-muted-foreground">
                                                        Go to page
                                                    </Label>
                                                    <Input
                                                        id="page"
                                                        defaultValue={currentPageIndex + 1}
                                                        min="1"
                                                        max={totalPages}
                                                        className="w-[2px]6 min-w-0"
                                                        onChange={(e) => {
                                                            const page = e.target.value
                                                                ? Number(e.target.value) - 1
                                                                : 0;
                                                            if (page > totalPages - 1) {
                                                                table.setPageIndex(totalPages - 1);
                                                            } else {
                                                                table.setPageIndex(page);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="h-6 w-1 bg-foreground"></div>

                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor="page-size" className="text-muted-foreground">
                                                        Size
                                                    </Label>
                                                    <Select
                                                        name="page-size"
                                                        value={table.getState().pagination.pageSize.toString()}
                                                        onValueChange={(val) => {
                                                            table.setPageSize(Number(val));
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-16">
                                                            <SelectValue placeholder="Size" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                                                    <SelectItem
                                                                        key={pageSize}
                                                                        value={pageSize.toString()}
                                                                    >
                                                                        {pageSize}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </div>
    );
}
