import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, LogOut, Home, Building } from "lucide-react";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("Faculty");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SAMPLE DATA (RIT HASSAN)
  const data = [
    { type: "Principal", name: "Principal Office", room: "001", floor: "0", block: "Main Block" },
    { type: "HOD", name: "HOD – CSE", room: "313", floor: "3", block: "Main Block" },
    { type: "HOD", name: "HOD – Mathematics", room: "113", floor: "1", block: "Main Block" },
    { type: "Faculty", name: "Mr Gopinath C B", room: "114", floor: "1", block: "Main Block" },
    { type: "Faculty", name: "Ms Sahana S S", room: "113", floor: "1", block: "Main Block" },
    { type: "Lab", name: "Python Programming Lab", room: "207", floor: "2", block: "Main Block" },
    { type: "Lab", name: "Digital Electronics Lab", room: "214", floor: "2", block: "Main Block" },
    { type: "Department", name: "Civil Engineering Department", room: "CV-204", floor: "2", block: "Civil Block" }
  ];

  // ---------------- LOGIN PAGE ----------------
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300">
        <Card className="w-96 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-center gap-3">
              <img src="/rit-logo.png" className="h-12" />
              <img src="/dishank-logo.png" className="h-12" />
            </div>

            <h1 className="text-xl font-bold text-center">
              Dishank – RIT Hassan
            </h1>

            <Input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="w-full"
              onClick={() =>
                setUser({
                  name: "Project User",
                  email: email || "demo@user.com"
                })
              }
            >
              Login
            </Button>

            <p className="text-xs text-center text-gray-500">
              Demo login – any email & password allowed
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // FILTER
  const filtered = data.filter(
    (item) =>
      item.type === category &&
      (item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.room.includes(query))
  );

  // ---------------- MAIN APP ----------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center bg-blue-800 text-white px-6 py-4 shadow">
        <div className="flex items-center gap-3">
          <img src="/rit-logo.png" className="h-10" />
          <img src="/dishank-logo.png" className="h-10" />
          <span className="text-xl font-bold">Dishank</span>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setPage("home")}>
            <Home size={18} /> Home
          </Button>
          <Button variant="ghost" onClick={() => setPage("search")}>
            <Search size={18} /> Search
          </Button>
          <Button variant="ghost" onClick={() => setPage("account")}>
            <User size={18} /> Account
          </Button>
          <Button variant="destructive" onClick={() => setUser(null)}>
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div className="p-10">
          <h2 className="text-4xl font-bold mb-4">
            Smart Campus Navigation
          </h2>
          <p className="text-gray-600 max-w-2xl mb-8">
            Easily find faculty cabins, departments, labs, rooms and floors
            at Rajeev Institute of Technology, Hassan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Faculty", "HOD", "Department"].map((item) => (
              <Card
                key={item}
                className="cursor-pointer hover:scale-105 transition"
                onClick={() => {
                  setCategory(item);
                  setPage("search");
                }}
              >
                <CardContent className="p-6 text-center">
                  <Building className="mx-auto mb-2" />
                  <h3 className="font-semibold">Find {item}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH */}
      {page === "search" && (
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-4">
            Search {category}
          </h2>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              placeholder={`Search ${category} by name or room number`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filtered.map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Room: {item.room}</p>
                  <p>Floor: {item.floor}</p>
                  <p>Block: {item.block}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ACCOUNT */}
      {page === "account" && (
        <div className="p-10 max-w-xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">User Profile</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p className="text-sm text-gray-500 mt-4">
                Role: Project Demo User
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Rajeev Institute of Technology, Hassan | Dishank
      </footer>
    </div>
  );
}
