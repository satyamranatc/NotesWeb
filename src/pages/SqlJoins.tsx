import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Table, Code } from "lucide-react";

interface JoinType {
  id: string;
  name: string;
  syntax: string;
  explanation: string;
  mysqlNote?: string;
  highlightLeft: boolean;
  highlightRight: boolean;
  highlightIntersection: boolean;
  highlightFullExclusion?: boolean;
  // logic function to compute output
  compute: (users: any[], cities: any[]) => any[];
}

export default function SqlJoins() {
  const [selectedJoin, setSelectedJoin] = useState("inner");

  const users = [
    { id: 1, name: "Alice", city_id: 10 },
    { id: 2, name: "Bob", city_id: 20 },
    { id: 3, name: "Charlie", city_id: 30 },
    { id: 4, name: "David", city_id: null }
  ];

  const cities = [
    { id: 10, name: "New York" },
    { id: 20, name: "London" },
    { id: 40, name: "Paris" }
  ];

  const joinTypes: JoinType[] = [
    {
      id: "inner",
      name: "1. Inner Join",
      syntax: `SELECT users.name, cities.name\nFROM users\nINNER JOIN cities ON users.city_id = cities.id;`,
      explanation: "Returns records that have matching values in both tables. If a user has a city_id not matching any city id, or if a city has no matching users, those rows are excluded.",
      highlightLeft: false,
      highlightRight: false,
      highlightIntersection: true,
      compute: (us, cs) => {
        const res: any[] = [];
        us.forEach((u) => {
          const c = cs.find((x) => x.id === u.city_id);
          if (c) res.push({ name: u.name, city_id: u.city_id, city_name: c.name });
        });
        return res;
      }
    },
    {
      id: "left",
      name: "2. Left Join",
      syntax: `SELECT users.name, cities.name\nFROM users\nLEFT JOIN cities ON users.city_id = cities.id;`,
      explanation: "Returns all records from the left table (users), and the matched records from the right table (cities). If no match is found, NULL values are filled for the right table columns.",
      highlightLeft: true,
      highlightRight: false,
      highlightIntersection: true,
      compute: (us, cs) => {
        return us.map((u) => {
          const c = cs.find((x) => x.id === u.city_id);
          return { name: u.name, city_id: u.city_id, city_name: c ? c.name : "NULL" };
        });
      }
    },
    {
      id: "right",
      name: "3. Right Join",
      syntax: `SELECT users.name, cities.name\nFROM users\nRIGHT JOIN cities ON users.city_id = cities.id;`,
      explanation: "Returns all records from the right table (cities), and the matched records from the left table (users). Unmatched left table values are represented as NULL.",
      highlightLeft: false,
      highlightRight: true,
      highlightIntersection: true,
      compute: (us, cs) => {
        const res: any[] = [];
        cs.forEach((c) => {
          const matchingUsers = us.filter((u) => u.city_id === c.id);
          if (matchingUsers.length > 0) {
            matchingUsers.forEach((u) => {
              res.push({ name: u.name, city_id: u.city_id, city_name: c.name });
            });
          } else {
            res.push({ name: "NULL", city_id: "NULL", city_name: c.name });
          }
        });
        return res;
      }
    },
    {
      id: "left-excluding",
      name: "4. Left Excluding Join",
      syntax: `SELECT users.name, cities.name\nFROM users\nLEFT JOIN cities ON users.city_id = cities.id\nWHERE cities.id IS NULL;`,
      explanation: "Filters the Left Join results to return only records belonging exclusively to Table A (users that do not have a corresponding city entry).",
      highlightLeft: true,
      highlightRight: false,
      highlightIntersection: false,
      compute: (us, cs) => {
        return us
          .filter((u) => !cs.some((c) => c.id === u.city_id))
          .map((u) => ({ name: u.name, city_id: u.city_id ?? "NULL", city_name: "NULL" }));
      }
    },
    {
      id: "right-excluding",
      name: "5. Right Excluding Join",
      syntax: `SELECT users.name, cities.name\nFROM users\nRIGHT JOIN cities ON users.city_id = cities.id\nWHERE users.city_id IS NULL;`,
      explanation: "Filters the Right Join results to return only records belonging exclusively to Table B (cities that have no users registered inside them).",
      highlightLeft: false,
      highlightRight: true,
      highlightIntersection: false,
      compute: (us, cs) => {
        return cs
          .filter((c) => !us.some((u) => u.city_id === c.id))
          .map((c) => ({ name: "NULL", city_id: "NULL", city_name: c.name }));
      }
    },
    {
      id: "full-outer",
      name: "6. Full Outer Join",
      syntax: `SELECT users.name, cities.name\nFROM users\nLEFT JOIN cities ON users.city_id = cities.id\nUNION\nSELECT users.name, cities.name\nFROM users\nRIGHT JOIN cities ON users.city_id = cities.id;`,
      explanation: "Returns all records when there is a match in either left or right table records. Unmatched sides are filled with NULL values.",
      mysqlNote: "MySQL does not natively support FULL OUTER JOIN syntax. It must be simulated by taking a UNION of a LEFT JOIN and a RIGHT JOIN.",
      highlightLeft: true,
      highlightRight: true,
      highlightIntersection: true,
      compute: (us, cs) => {
        const leftResults = us.map((u) => {
          const c = cs.find((x) => x.id === u.city_id);
          return { name: u.name, city_id: u.city_id, city_name: c ? c.name : "NULL" };
        });
        const unmatchedCities = cs.filter((c) => !us.some((u) => u.city_id === c.id));
        const rightResults = unmatchedCities.map((c) => ({
          name: "NULL",
          city_id: "NULL",
          city_name: c.name
        }));
        return [...leftResults, ...rightResults];
      }
    },
    {
      id: "full-excluding",
      name: "7. Full Excluding Join",
      syntax: `SELECT users.name, cities.name\nFROM users\nLEFT JOIN cities ON users.city_id = cities.id\nWHERE cities.id IS NULL\nUNION\nSELECT users.name, cities.name\nFROM users\nRIGHT JOIN cities ON users.city_id = cities.id\nWHERE users.city_id IS NULL;`,
      explanation: "Returns all records from left and right tables except matching intersection items. Represents records unique to either table.",
      mysqlNote: "Implemented in MySQL by taking the UNION of a Left Excluding Join and a Right Excluding Join.",
      highlightLeft: true,
      highlightRight: true,
      highlightIntersection: false,
      compute: (us, cs) => {
        const leftEx = us
          .filter((u) => !cs.some((c) => c.id === u.city_id))
          .map((u) => ({ name: u.name, city_id: u.city_id ?? "NULL", city_name: "NULL" }));
        const rightEx = cs
          .filter((c) => !us.some((u) => u.city_id === c.id))
          .map((c) => ({ name: "NULL", city_id: "NULL", city_name: c.name }));
        return [...leftEx, ...rightEx];
      }
    },
    {
      id: "cross",
      name: "8. Cross Join",
      syntax: `SELECT users.name, cities.name\nFROM users\nCROSS JOIN cities;`,
      explanation: "Returns the Cartesian product of the two tables. Generates every possible combination of rows between Left and Right tables.",
      highlightLeft: true,
      highlightRight: true,
      highlightIntersection: true,
      highlightFullExclusion: true,
      compute: (us, cs) => {
        const res: any[] = [];
        us.forEach((u) => {
          cs.forEach((c) => {
            res.push({ name: u.name, city_id: u.city_id ?? "NULL", city_name: c.name });
          });
        });
        return res;
      }
    },
    {
      id: "self",
      name: "9. Self Join",
      syntax: `SELECT u1.name AS UserA, u2.name AS UserB, u1.city_id\nFROM users u1\nINNER JOIN users u2 ON u1.city_id = u2.city_id\nWHERE u1.id <> u2.id;`,
      explanation: "Joins a table to itself. Useful to find pairs of records sharing a common column value (such as users living in the same city).",
      highlightLeft: true,
      highlightRight: false,
      highlightIntersection: true,
      compute: (us, _cs) => {
        const res: any[] = [];
        for (let i = 0; i < us.length; i++) {
          for (let j = 0; j < us.length; j++) {
            if (i !== j && us[i].city_id === us[j].city_id && us[i].city_id !== null) {
              res.push({
                name: us[i].name,
                city_id: us[i].city_id,
                city_name: `Matched with ${us[j].name}`
              });
            }
          }
        }
        return res;
      }
    },
    {
      id: "natural",
      name: "10. Natural Join",
      syntax: `SELECT * FROM users\nNATURAL JOIN cities;`,
      explanation: "Automatically joins tables based on columns sharing the same name. (Caution: In this mock schema, users.id and cities.id both match, which forces a join on IDs instead of cities).",
      highlightLeft: false,
      highlightRight: false,
      highlightIntersection: true,
      compute: (us, cs) => {
        const res: any[] = [];
        us.forEach((u) => {
          const c = cs.find((x) => x.id === u.id); // Natural join on matching column names ('id')
          if (c) {
            res.push({ name: u.name, city_id: u.city_id, city_name: c.name });
          }
        });
        return res;
      }
    }
  ];

  const currentJoin = joinTypes.find((j) => j.id === selectedJoin) || joinTypes[0];
  const queryResult = currentJoin.compute(users, cities);

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-24"
    >
      {/* Page Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
          <Database className="w-3 h-3" /> SQL Section
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          SQL <span className="text-cyan-400">Joins Masterclass</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Visualize, inspect, and master all 10 types of SQL joins using dynamic interactive Venn diagrams and mock data calculations.
        </p>
      </header>

      {/* Tables input visualization */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-cyan-400">01.</span> Sandbox Input Tables
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          We will use the following two tables to demonstrate the joins. Note how some rows do not have matching counterpart records.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Table Users */}
          <div className="space-y-3">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5" /> Table A: Users
            </span>
            <div className="overflow-hidden border border-zinc-900 rounded-xl">
              <table className="w-full text-left border-collapse bg-zinc-950/20 text-xs">
                <thead>
                  <tr className="bg-zinc-900/30 border-b border-zinc-900 font-mono text-[10px] text-zinc-500">
                    <th className="px-4 py-3">id</th>
                    <th className="px-4 py-3">name</th>
                    <th className="px-4 py-3">city_id</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-400 font-mono">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-900/10">
                      <td className="px-4 py-2.5 text-zinc-200">{u.id}</td>
                      <td className="px-4 py-2.5 font-sans font-semibold text-zinc-350">{u.name}</td>
                      <td className="px-4 py-2.5 text-cyan-400">{u.city_id ?? "NULL"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Cities */}
          <div className="space-y-3">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5" /> Table B: Cities
            </span>
            <div className="overflow-hidden border border-zinc-900 rounded-xl">
              <table className="w-full text-left border-collapse bg-zinc-950/20 text-xs">
                <thead>
                  <tr className="bg-zinc-900/30 border-b border-zinc-900 font-mono text-[10px] text-zinc-550">
                    <th className="px-4 py-3">id</th>
                    <th className="px-4 py-3">name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-400 font-mono">
                  {cities.map((c) => (
                    <tr key={c.id} className="hover:bg-zinc-900/10">
                      <td className="px-4 py-2.5 text-zinc-200">{c.id}</td>
                      <td className="px-4 py-2.5 font-sans font-semibold text-zinc-350">{c.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Join Venn & Simulator */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-cyan-400">02.</span> Interactive Join Builder
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Select one of the 10 join types below to visualize its Venn intersection logic and review its corresponding query output automatically.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          {/* Join Selector Dropdown */}
          <div className="col-span-1 space-y-2">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block mb-2">Select Join Type</span>
            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1 no-scrollbar border-r border-zinc-900">
              {joinTypes.map((j) => (
                <button
                  key={j.id}
                  onClick={() => setSelectedJoin(j.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                    selectedJoin === j.id
                      ? "bg-zinc-900 border-zinc-800 text-cyan-400 font-bold"
                      : "bg-zinc-950/40 hover:bg-zinc-950 border-zinc-900/40 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {j.name}
                </button>
              ))}
            </div>
          </div>

          {/* Venn Visualizer Graphic and explanation */}
          <div className="col-span-1 lg:col-span-2 space-y-6 flex flex-col justify-between">
            <div className="p-6 md:p-8 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-6 flex flex-col items-center">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest self-start">Interactive Venn Representation</span>
              
              {/* Venn SVG Graphic */}
              <div className="w-56 h-36 relative mt-4">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  <defs>
                    <mask id="intersection-mask">
                      <rect x="0" y="0" width="200" height="120" fill="white" />
                      <circle cx="75" cy="60" r="45" fill="black" />
                    </mask>
                    <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0891b2" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Left Circle - Table A */}
                  <circle
                    cx="75"
                    cy="60"
                    r="45"
                    fill={currentJoin.highlightLeft ? "url(#glowGrad)" : "#18181b"}
                    stroke={currentJoin.highlightLeft ? "#06b6d4" : "#27272a"}
                    strokeWidth="1.5"
                    className="transition-all duration-350"
                  />

                  {/* Right Circle - Table B */}
                  <circle
                    cx="125"
                    cy="60"
                    r="45"
                    fill={currentJoin.highlightRight ? "url(#glowGrad)" : "#18181b"}
                    stroke={currentJoin.highlightRight ? "#06b6d4" : "#27272a"}
                    strokeWidth="1.5"
                    className="transition-all duration-350"
                  />

                  {/* Intersection area overlay */}
                  {(currentJoin.highlightIntersection || currentJoin.highlightFullExclusion) && (
                    <circle
                      cx="125"
                      cy="60"
                      r="45"
                      fill={currentJoin.highlightIntersection ? "url(#glowGrad)" : "#18181b"}
                      stroke={currentJoin.highlightIntersection ? "#06b6d4" : "#27272a"}
                      strokeWidth="1.5"
                      mask="url(#intersection-mask)"
                      className="transition-all duration-350"
                    />
                  )}

                  {/* Labels */}
                  <text x="50" y="64" fill="#a1a1aa" fontSize="8" fontWeight="bold" textAnchor="middle" pointerEvents="none">Users (A)</text>
                  <text x="150" y="64" fill="#a1a1aa" fontSize="8" fontWeight="bold" textAnchor="middle" pointerEvents="none">Cities (B)</text>
                </svg>
              </div>

              {/* Description */}
              <div className="w-full space-y-2 border-t border-zinc-900 pt-4">
                <p className="text-xs text-zinc-350 leading-relaxed font-light mb-0">
                  {currentJoin.explanation}
                </p>
                {currentJoin.mysqlNote && (
                  <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl text-[11px] text-amber-400 font-light">
                    ⚠️ {currentJoin.mysqlNote}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SQL Code & Simulation Output */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-cyan-400">03.</span> Query Output Execution
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Query Code Syntax */}
          <div className="space-y-3">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> MySQL Query Code
            </span>
            <pre className="p-6 bg-[#0a0b0d] border border-zinc-900 rounded-3xl overflow-x-auto text-[11px] font-mono text-zinc-350 leading-normal no-scrollbar h-[220px]">
              <code>{currentJoin.syntax}</code>
            </pre>
          </div>

          {/* Table Query Output */}
          <div className="space-y-3">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5" /> Simulated Query Output Rows
            </span>
            <div className="overflow-hidden border border-zinc-900 rounded-3xl h-[220px] overflow-y-auto no-scrollbar bg-zinc-950/20">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-900/30 border-b border-zinc-900 font-mono text-[10px] text-zinc-500 sticky top-0 backdrop-blur">
                    <th className="px-5 py-4.5">users.name</th>
                    <th className="px-5 py-4.5">cities.name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-400 font-mono">
                  {queryResult.length > 0 ? (
                    queryResult.map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/10">
                        <td className="px-5 py-4 font-sans font-semibold text-zinc-350">{row.name}</td>
                        <td className={`px-5 py-4 ${row.city_name === "NULL" ? "text-rose-500 font-bold" : "text-cyan-400"}`}>
                          {row.city_name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-5 py-8 text-center text-zinc-500 italic">
                        Empty row set output returned
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
