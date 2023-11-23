import TambahDataDropdown from "@/src/components/TambahDataDropdown";
function TambahAkses() {
  return (
    <div className="mb-4">
      <TambahDataDropdown tableName="account" columns={["Username", "Password", "role"]} label="Akses" />
    </div>
  );
}

export default TambahAkses;