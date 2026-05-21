import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Link, Play, RefreshCw, Layers, Check, Copy, FileCode, Shield, Terminal } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

export default function JDBC() {
  const [activeStep, setActiveStep] = useState(0);

  const workflowSteps = [
    {
      title: "1. Load & Register Driver",
      code: 'Class.forName("com.mysql.cj.jdbc.Driver");',
      description: "Registers the database driver class with the Driver Manager to let Java understand MySQL communication protocols.",
      visual: "App loads MySQL Driver binary jar into memory runtime"
    },
    {
      title: "2. Establish Connection",
      code: 'Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/db", "root", "secret");',
      description: "Creates physical socket connection to database server, authenticated via username/password credentials.",
      visual: "Handshake: App ⚡ TCP socket ⚡ MySQL DB Server"
    },
    {
      title: "3. Prepare Statement",
      code: 'PreparedStatement stmt = con.prepareStatement("SELECT * FROM users WHERE id = ?");\nstmt.setInt(1, 101);',
      description: "Pre-compiles the SQL query to optimize database execution plan and prevent SQL Injection attacks.",
      visual: "Statement compiled by DB compiler, placeholder parameters bound"
    },
    {
      title: "4. Execute Query",
      code: "ResultSet rs = stmt.executeQuery();",
      description: "Sends compiled query to MySQL. DB engine returns query outputs matching parameters.",
      visual: "Database reads disk tables and sends matches back"
    },
    {
      title: "5. Process ResultSet",
      code: 'while (rs.next()) {\n    String name = rs.getString("username");\n}',
      description: "Iterates database cursor row-by-row through records returned by query.",
      visual: "Loop processes database columns in application memory"
    },
    {
      title: "6. Close Connection",
      code: "rs.close();\nstmt.close();\ncon.close();",
      description: "Closes database statements and connection pool objects to release sockets and avoid memory leak issues.",
      visual: "Sockets closed, connection resource handles cleaned up"
    }
  ];

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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
          <Database className="w-3 h-3" /> Java Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          JDBC <span className="text-emerald-400">Database API</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Learn to construct robust connections, execute parameterized queries, and manage transactional safety inside JDBC.
        </p>
      </header>

      {/* 01. Concepts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-emerald-400">01.</span> Core Overview
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Java Database Connectivity (JDBC) is a standardized Java API specification (<code className="text-emerald-400">java.sql</code> package) that defines how a Java application interacts with SQL-compliant Relational Databases.
        </p>
        <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-[0.02]">
            <Database className="w-40 h-40" />
          </div>
          <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block mb-2">Core Philosophy</span>
          <p className="text-white text-lg font-semibold leading-relaxed">
            Write standardized Java code once, and connect to any vendor-supported database engine (MySQL, Postgres, Oracle) via standard SQL translations.
          </p>
        </div>
      </section>

      {/* 02. Interactive Connection Lifecycle */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-emerald-400">02.</span> Connection Workflow Simulator
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Trace the exact steps Java takes to establish database queries. Select steps below to inspect what happens.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* Step Selector list */}
          <div className="col-span-1 space-y-2">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  activeStep === idx
                    ? "bg-zinc-900 border-zinc-800 text-zinc-100 font-semibold"
                    : "bg-zinc-950/40 hover:bg-zinc-950 border-zinc-900/60 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Details & Visual Animation Display */}
          <div className="col-span-1 lg:col-span-2 p-6 md:p-8 bg-zinc-900/20 border border-zinc-900 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest">Active Statement code</span>
              <pre className="p-4 bg-[#0a0b0d] border border-zinc-900 rounded-xl overflow-x-auto text-[11px] font-mono text-zinc-350 no-scrollbar">
                <code>{workflowSteps[activeStep].code}</code>
              </pre>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {workflowSteps[activeStep].description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-900/60 space-y-3">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest block">Runtime Network Visualization</span>
              <div className="bg-black/40 border border-zinc-900 p-4 rounded-xl flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> App</span>
                <span className="text-zinc-650 tracking-widest">---▶</span>
                <span className="text-zinc-300 text-center font-bold px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">{workflowSteps[activeStep].visual}</span>
                <span className="text-zinc-650 tracking-widest">◀---</span>
                <span className="flex items-center gap-1"><Database className="w-3.5 h-3.5" /> DB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Core Classes & Driver Interfaces */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-emerald-400">03.</span> Core API Architecture
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          JDBC utilizes a multi-layer pattern splitting responsibility between client-facing APIs and backend translation drivers.
        </p>

        <div className="overflow-hidden border border-zinc-900 rounded-2xl shadow-xl">
          <table className="w-full text-left border-collapse bg-zinc-950/20">
            <thead>
              <tr className="bg-zinc-900/30 border-b border-zinc-900">
                <th class="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Component</th>
                <th class="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-xs text-emerald-400">DriverManager</td>
                <td className="px-6 py-5 text-zinc-400 text-xs font-light">Controls list of database drivers. Matches connection request URL strings.</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-xs text-emerald-400">Connection</td>
                <td className="px-6 py-5 text-zinc-400 text-xs font-light">Models individual socket session, provides transaction configuration.</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-xs text-emerald-400">Statement</td>
                <td className="px-6 py-5 text-zinc-400 text-xs font-light">Basic wrapper to send unparameterized SQL scripts. Dangerous for raw variables.</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-xs text-emerald-400">PreparedStatement</td>
                <td className="px-6 py-5 text-zinc-400 text-xs font-light">Pre-compiled query template. Secure parameter bindings prevent SQL injections.</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-xs text-emerald-400">ResultSet</td>
                <td className="px-6 py-5 text-zinc-400 text-xs font-light">Cursor pointer holding rows retrieved from executing database SELECT commands.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 04. Execution Methods */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-emerald-400">04.</span> Query Execution API
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Use the correct Java execution hook depending on what kind of SQL operation you wish to perform.
        </p>

        <div className="overflow-hidden border border-zinc-900 rounded-2xl shadow-xl">
          <table className="w-full text-left border-collapse bg-zinc-950/20">
            <thead>
              <tr className="bg-zinc-900/30 border-b border-zinc-900">
                <th class="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Execute Method</th>
                <th class="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Query Target</th>
                <th class="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Return Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-mono text-xs">
              <tr className="hover:bg-zinc-900/10 text-zinc-350">
                <td className="px-6 py-5 font-bold text-zinc-200">executeQuery()</td>
                <td className="px-6 py-5">SELECT Statements</td>
                <td className="px-6 py-5 text-emerald-400">ResultSet</td>
              </tr>
              <tr className="hover:bg-zinc-900/10 text-zinc-350">
                <td className="px-6 py-5 font-bold text-zinc-200">executeUpdate()</td>
                <td className="px-6 py-5">INSERT, UPDATE, DELETE, DDL</td>
                <td className="px-6 py-5 text-emerald-400">int (Rows affected)</td>
              </tr>
              <tr className="hover:bg-zinc-900/10 text-zinc-350">
                <td className="px-6 py-5 font-bold text-zinc-200">execute()</td>
                <td className="px-6 py-5">Generic SQL (Both SELECT or writes)</td>
                <td className="px-6 py-5 text-emerald-400">boolean (true if ResultSet)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Transaction Control details */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-emerald-400">05.</span> Transaction Management
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          By default, JDBC operates in auto-commit mode (each statement is committed instantly). To manage transactions grouped inside ACID boundaries:
        </p>

        <CodeBlock
          filename="TransactionExample.java"
          language="java"
          code={`try {
    // 1. Disable Auto-Commit
    con.setAutoCommit(false);

    // 2. Perform updates
    stmt1.executeUpdate("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    stmt2.executeUpdate("UPDATE accounts SET balance = balance + 100 WHERE id = 2");

    // 3. Commit operations together
    con.commit();
} catch (SQLException e) {
    // 4. Rollback in case of error
    con.rollback();
}`}
        />
      </section>
    </motion.div>
  );
}
