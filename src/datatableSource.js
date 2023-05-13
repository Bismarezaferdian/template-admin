export const userColumns = [
  { field: "_id", headerName: "ID", type: "number", width: 40 },
  {
    field: "user",
    headerName: "User",
    width: 0,
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
  { field: "firstname", type: "string", headerName: "First name", width: 130 },
  { field: "lastname", type: "string", headerName: "Last name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 140,
  },
  {
    field: "phonenumber",
    headerName: "Phone Number",
    type: "number",
    width: 140,
  },
  {
    field: "address",
    headerName: "Address",
    type: "string",
    width: 140,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    type: "string",
    width: 140,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const productColumn = [
  { field: "title", type: "string", headerName: "Title", width: 130 },
  { field: "desc", type: "string", headerName: "Description", width: 130 },
  // { field: "img", type: "string", headerName: "Description", width: 130 },
  {
    field: "imgDisplay",
    headerName: "Image Display",
    width: 0,
    renderCell: (params) => {
      // console.log(params);
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              // "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
              params.row.imgDisplay?.imgUrl
            }
            alt="avatar"
          />
          {params.row.userName}
        </div>
      );
    },
  },
  {
    field: "colors",
    headerName: "colors",
    width: 0,
    renderCell: (params) => {
      return params.row.variant.map(
        (item) => `${String(item.color).toUpperCase()},`
      );
    },
  },
  {
    field: "sizes",
    headerName: "sizes",
    width: 0,
    renderCell: (params) => {
      return params.row.variant.map(
        (item) => `${String(item.size).toUpperCase()},`
      );
    },
  },
  {
    field: "weight",
    headerName: "weight",
    width: 0,
    renderCell: (params) => {
      return params.row.variant.map(
        (item) => `${String(item.stock).toUpperCase()},`
      );
    },
  },

  {
    field: "categories",
    type: "array",
    headerName: "Categories",
    width: 130,
    valueGetter: (params) => {
      return params.row.categories?.map((item) => item.name);
    },
  },
  { field: "price", type: "number", headerName: "Price", width: 130 },
];

export const orderColumns = [
  { field: "_id", type: "string", headerName: "No Order", width: 220 },
  { field: "userId", type: "string", headerName: "User Id ", width: 220 },

  {
    field: "products",
    type: "string",
    headerName: "Products Id",
    width: 220,
    valueGetter: (params) => {
      // console.log(params);
      return params.row.products.map((item) => item._id);

      // return params.getValue(params.id, params.row);
    },
  },
  {
    field: "quantity",
    type: "string",
    headerName: "Qty Order",
    width: 40,
    valueGetter: (params) => {
      return params.row.products.map((item) => item.quantity);

      // return params.getValue(params.id, params.row);
    },
  },
  { field: "amount", type: "number", headerName: "Total Payment", width: 130 },
  // { field: "status", type: "string", headerName: "Status Order", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 80,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
