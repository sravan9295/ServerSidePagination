import React, { useMemo } from "react";


import MaUTable from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
//import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
//import TablePagination from "@material-ui/core/TablePagination";
//import TablePaginationActions from "./TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableToolbar from "./TableToolbar";
import {
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable
} from "react-table";

// const inputStyle = {
//     padding: 0,
//     margin: 0,
//     border: 0,
//     background: "transparent"
// };

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    editableRowIndex // index of the row we requested for editing
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value);
    };

    // If the initialValue is changed externall, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return index === editableRowIndex ? (
        <input value={value} onChange={onChange} onBlur={onBlur} />
    ) : (
        <p>{value}</p>
    );
};

EditableCell.propTypes = {
    cell: PropTypes.shape({
        value: PropTypes.any.isRequired
    }),
    row: PropTypes.shape({
        index: PropTypes.number.isRequired
    }),
    column: PropTypes.shape({
        id: PropTypes.number.isRequired
    }),
    updateMyData: PropTypes.func.isRequired
};

// Set our editable cell renderer as the default Cell renderer
// const defaultColumn = {
//   Cell: EditableCell
// };

const COLUMNS = [
    {
        Header: "Name",
        accessor: "username"
    },
    {
        Header: "Email",
        accessor: "email",
        Cell: EditableCell
    },
    {
        Header: "Created At",
        accessor: "created_at"
    },
    {
        Header: "Updated At",
        accessor: "updated_at"
    },

];


const UserTable = ({
    columns = useMemo(() => COLUMNS, []),
    data,
    setData,
    updateMyData,
    skipPageReset
}) => {
    const [editableRowIndex, setEditableRowIndex] = React.useState(null);

    const {
        getTableProps,
        headerGroups,
        prepareRow,
        page,
        // gotoPage,
        // setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { selectedRowIds, globalFilter }
        ///state: { pageIndex, pageSize, selectedRowIds, globalFilter }
    } = useTable(
        {
            columns,
            data,
            autoResetPage: !skipPageReset,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData,
            // pass state variables so that we can access them in edit hook later
            editableRowIndex,
            setEditableRowIndex // setState hook for toggling edit on/off switch
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.allColumns.push((columns) => [
                ...columns,
                // pass edit hook
                {
                    accessor: "edit",
                    id: "edit",
                    Header: "Action",
                    Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
                        <button
                            className="action-button btn btn-primary"
                            onClick={() => {
                                const currentIndex = row.index;
                                if (editableRowIndex !== currentIndex) {
                                    // row requested for edit access
                                    setEditableRowIndex(currentIndex);
                                } else {
                                    // request for saving the updated row
                                    setEditableRowIndex(null);
                                    const updatedRow = row.values;

                                    console.log("updated row values:");
                                    console.log(updatedRow);

                                    console.log("you can save data from here");
                                    // call your updateRow API
                                }
                            }}
                        >
                            {/* single action button supporting 2 modes */}
                            {editableRowIndex !== row.index ? "Edit" : "Save"}
                        </button>
                    )
                }
            ]);
        }
    );

    // const handleChangePage = (event, newPage) => {
    //     gotoPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setPageSize(Number(event.target.value));
    // };

    // const removeByIndexs = (array, indexs) =>
    //     array.filter((_, i) => !indexs.includes(i));





    // Render the UI for your table
    return (
        <TableContainer>
            <TableToolbar
                numSelected={Object.keys(selectedRowIds).length}
                // addUserHandler={addUserHandler}
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
            />
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableCell
                                    {...(column.id === "selection"
                                        ? column.getHeaderProps()
                                        : column.getHeaderProps(column.getSortByToggleProps()))}
                                >
                                    {column.render("Header")}
                                    {column.id !== "selection" ? (
                                        <TableSortLabel
                                            active={column.isSorted}
                                            // react-table has a unsorted state which is not treated here
                                            direction={column.isSortedDesc ? "desc" : "asc"}
                                        />
                                    ) : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>

                {/* this footer can be used for pagination
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: "All", value: data.length }
                            ]}
                            colSpan={3}
                            count={data.length}
                            rowsPerPage={pageSize}
                            page={pageIndex}
                            SelectProps={{
                                inputProps: { "aria-label": "rows per page" },
                                native: true
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter> */}
            </MaUTable>
        </TableContainer>
    );
};

UserTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    updateMyData: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    skipPageReset: PropTypes.bool.isRequired
};

export default UserTable;
