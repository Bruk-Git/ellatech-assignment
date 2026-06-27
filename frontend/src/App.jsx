import Navbar from "./components/NavBar";   
import UserForm from "./components/UserForm";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import TransactionTable from "./components/TransactonTable";  
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-10">
      <Navbar />
      <UserForm />
      <ProductForm />
      <ProductTable />
      <TransactionTable />
    </div>
  );
}

export default App;