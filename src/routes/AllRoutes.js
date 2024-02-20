import { Routes, Route } from "react-router-dom";
import { AddCustomer, CustomerList } from "../pages";

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<CustomerList /> }></Route>
            <Route path="/add" element={<AddCustomer />}></Route>
            
        </Routes>
    </div>
  )
}
