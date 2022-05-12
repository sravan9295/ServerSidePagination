import React from "react"


const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        // updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}


const handleClickedEditRow = (rowIndex) => {
    // setTableData(prev => prev.map((r, index) => ({ ...r, isEditing: rowIndex === index })))
}

export const COLUMNS = [
    {
        Header: "Name",
        accessor: "first_name",

    },
    {
        Header: "Email",
        accessor: "email",
        Cell: EditableCell

    },
    {
        Header: "Created At", accessor: "created_at"
    }
    , {
        Header: "Updated At", accessor: "updated_at"
    },
    {
        Header: "Action",
        // Cell: ({ cell }) => (
        //     <button className="btn btn-primary" onClick="">View</button>
        // )
        Cell: (cellObj) => <button className={"btn btn-primary"} onClick={() => { handleClickedEditRow(cellObj.row.index) }}>Edit</button>

    }
]