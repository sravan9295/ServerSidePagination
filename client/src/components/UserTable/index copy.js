import React, { useState, useMemo } from "react";
import ReactDom from 'react-dom'
import { useTable } from 'react-table'
import { COLUMNS } from "../Columns";
import MOCK_DATA from '../MOCK_DATA.json'

import './index.css'

export const UserTable = (tableData) => {


    const columns = useMemo(() => COLUMNS, [])
    // have a doubt that it should render every time
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data: tableData.tableData
    })

    console.log(tableData.tableData)
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                        </tr>
                    )

                    )
                }
            </thead>
            <tbody  {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}