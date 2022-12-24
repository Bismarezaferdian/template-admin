export const userColumns = [
  { field: "id", headerName: "ID", width: 120 },
  {
    field: "user",
    headerName: "User",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
              // params.row.photo[0]
            }
            alt="avatar"
          />
          {params.row.userName}
        </div>
      );
    },
  },
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];