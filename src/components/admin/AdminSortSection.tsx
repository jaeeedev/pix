import React, { useState } from "react";
import AdminProductList from "./AdminProductList";
import AddProductForm from "./AddProductForm";

const AdminSortSection = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  return (
    <div>
      <AdminProductList />
      <AddProductForm />
    </div>
  );
};

export default AdminSortSection;
