function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold">
          Ellatech Inventory
        </h1>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium">

          <button
            onClick={() => scrollToSection("users")}
            className="hover:text-gray-200"
          >
            Users
          </button>

          <button
            onClick={() => scrollToSection("products")}
            className="hover:text-gray-200"
          >
            Products
          </button>

          <button
            onClick={() => scrollToSection("dashboard")}
            className="hover:text-gray-200"
          >
            Dashboard
          </button>

          <button
            onClick={() => scrollToSection("transactions")}
            className="hover:text-gray-200"
          >
            Transactions
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;