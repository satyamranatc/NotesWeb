import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Table, Columns } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

interface Field {
  name: string;
  type: "String" | "int" | "double" | "LocalDate";
  column: string;
}

export default function Hibernate() {
  const [entityName, setEntityName] = useState("User");
  const [tableName, setTableName] = useState("users");
  const [fields, setFields] = useState<Field[]>([
    { name: "id", type: "int", column: "user_id" },
    { name: "username", type: "String", column: "username" },
    { name: "email", type: "String", column: "user_email" }
  ]);

  const addField = () => {
    setFields([...fields, { name: "newField", type: "String", column: "new_column" }]);
  };

  const updateField = (index: number, key: keyof Field, value: string) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], [key]: value };
    setFields(updated);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };


  const getSqlType = (type: string) => {
    switch (type) {
      case "int": return "INT";
      case "double": return "DOUBLE";
      case "LocalDate": return "DATE";
      default: return "VARCHAR(255)";
    }
  };

  const generateJavaCode = () => {
    const fieldLines = fields.map((f) => {
      const isId = f.name.toLowerCase() === "id";
      return `${isId ? "    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n" : ""}` +
             `    @Column(name = "${f.column}")\n` +
             `    private ${f.type} ${f.name};`;
    }).join("\n\n");

    return `@Entity\n@Table(name = "${tableName}")\npublic class ${entityName} {\n\n${fieldLines}\n\n    // Getters and Setters...\n}`;
  };

  const generateSqlCode = () => {
    const columns = fields.map((f) => {
      const isId = f.name.toLowerCase() === "id";
      return `  ${f.column} ${getSqlType(f.type)}${isId ? " AUTO_INCREMENT PRIMARY KEY" : ""}`;
    }).join(",\n");

    return `CREATE TABLE ${tableName} (\n${columns}\n);`;
  };

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
      className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24 animate-fade-in"
    >
      {/* Page Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-bold uppercase tracking-widest">
          <Zap className="w-3 h-3" /> Java Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Hibernate & <span className="text-purple-400">Spring Boot ORM</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Banish boilerplate SQL. Hibernate translates java classes into relational database structures dynamically.
        </p>
      </header>

      {/* 01. Concepts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-purple-400">01.</span> What is Hibernate?
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Hibernate is a full-featured Object Relational Mapping (ORM) framework. It automates SQL statements mapping Java objects directly to tables inside database stores.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-2">
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Traditional JDBC Write</span>
            <pre className="text-xs font-mono text-blue-300 bg-black/40 p-4 rounded-xl overflow-x-auto">
              <code>{`String sql = "INSERT INTO users (id, name) VALUES (?, ?)";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setInt(1, 101);
ps.setString(2, "John");
ps.executeUpdate();`}</code>
            </pre>
          </div>
          <div className="p-6 bg-[#09090b] border border-purple-900/30 rounded-2xl space-y-2">
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider font-mono">Modern ORM Write</span>
            <pre className="text-xs font-mono text-purple-300 bg-black/40 p-4 rounded-xl overflow-x-auto">
              <code>{`User u = new User(101, "John");
session.save(u); // Hibernate makes SQL`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Interactive Entity Mapper */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-purple-400">02.</span> Live ORM Mapper
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Build a Java class using the table builder below, and see how Hibernate maps properties to database schemas instantly.
        </p>

        <div className="p-6 md:p-8 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Entity Name</label>
              <input
                type="text"
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-zinc-700"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Table Name</label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-zinc-700"
              />
            </div>
          </div>

          {/* Table Columns Editor */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Properties (Fields)</span>
              <button
                onClick={addField}
                className="text-xs font-bold text-purple-400 hover:text-purple-300 cursor-pointer"
              >
                + Add Property
              </button>
            </div>

            <div className="space-y-2">
              {fields.map((f, idx) => (
                <div key={idx} className="flex flex-wrap md:flex-nowrap gap-2 items-center bg-black/35 p-3 border border-zinc-900 rounded-xl">
                  <input
                    type="text"
                    placeholder="Java Field Name"
                    value={f.name}
                    onChange={(e) => updateField(idx, "name", e.target.value)}
                    className="w-full md:w-1/3 bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-1.5 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-zinc-800"
                  />
                  <select
                    value={f.type}
                    onChange={(e) => updateField(idx, "type", e.target.value as any)}
                    className="w-full md:w-1/4 bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-1.5 text-xs text-zinc-400 focus:outline-none focus:border-zinc-800"
                  >
                    <option value="String">String</option>
                    <option value="int">int</option>
                    <option value="double">double</option>
                    <option value="LocalDate">LocalDate</option>
                  </select>
                  <input
                    type="text"
                    placeholder="SQL Column Name"
                    value={f.column}
                    onChange={(e) => updateField(idx, "column", e.target.value)}
                    className="w-full md:w-1/3 bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-1.5 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-zinc-800"
                  />
                  <button
                    disabled={fields.length === 1}
                    onClick={() => removeField(idx)}
                    className="text-xs text-rose-500 font-semibold px-2 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Side by side code generator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
            <div className="space-y-3">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5" /> Hibernate Entity (.java)
              </span>
              <pre className="p-4 bg-[#0a0b0d] border border-zinc-900 rounded-xl overflow-x-auto text-[10px] font-mono text-zinc-450 no-scrollbar max-h-72">
                <code>{generateJavaCode()}</code>
              </pre>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Columns className="w-3.5 h-3.5" /> SQL Target schema
              </span>
              <pre className="p-4 bg-[#0a0b0d] border border-zinc-900 rounded-xl overflow-x-auto text-[10px] font-mono text-zinc-450 no-scrollbar max-h-72">
                <code>{generateSqlCode()}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Architecture Layers */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-purple-400">03.</span> Core Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
            <h4 className="text-white font-bold text-sm">SessionFactory</h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Maintains database metadata. Highly immutable, heavy resource node context. Usually initialized only once per application process run.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
            <h4 className="text-white font-bold text-sm">Session</h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Lightweight object wrapping active socket conversation context. Opens and closes statements to process transient SQL payloads.
            </p>
          </div>
        </div>

        {/* Visual stack map */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex flex-wrap justify-center items-center gap-4 text-[10px] font-bold tracking-widest uppercase">
          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-500">Java App</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-750" />
          <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded text-purple-400">Hibernate ORM</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-750" />
          <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400">JDBC Driver</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-750" />
          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-500">Relational Database</span>
        </div>
      </section>

      {/* 04. Spring Data JPA repository abstraction */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-purple-400">04.</span> Spring Data JPA
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Spring Boot abstracts Hibernate sessions entirely through the Repository pattern. Declaring an interface automatically compiles CRUD methods without implementing SQL.
        </p>

        <CodeBlock
          filename="UserRepository.java"
          language="java"
          code={`import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Generated automatically: save(), findById(), deleteById()
    
    // Custom finder query generated from method name!
    List<User> findByEmailEndingWith(String domain);
}`}
        />
      </section>

      {/* 05. Framework comparisons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-purple-400">05.</span> JDBC vs Hibernate vs Spring Boot
        </h2>
        <div className="overflow-x-auto border border-zinc-900 rounded-2xl shadow-xl scrollbar-thin">
          <table className="w-full min-w-[700px] md:min-w-0 text-left border-collapse bg-zinc-950/20 text-xs">
            <thead>
              <tr className="bg-zinc-900/30 border-b border-zinc-900">
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Dimension</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest text-center">JDBC</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest text-center">Hibernate</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest text-center">Spring Boot JPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-400">
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold text-zinc-200">Boilerplate code</td>
                <td className="px-6 py-5 text-center text-rose-400 font-semibold">High</td>
                <td className="px-6 py-5 text-center">Medium</td>
                <td className="px-6 py-5 text-center text-emerald-400 font-semibold">Minimal</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold text-zinc-200">Execution Speed</td>
                <td className="px-6 py-5 text-center text-emerald-400 font-semibold">Fastest</td>
                <td className="px-6 py-5 text-center">Fast</td>
                <td className="px-6 py-5 text-center">Fast (with slight mapping cost)</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold text-zinc-200">SQL Knowledge Required</td>
                <td className="px-6 py-5 text-center text-rose-400 font-semibold">Total</td>
                <td className="px-6 py-5 text-center">Optional/HQL</td>
                <td className="px-6 py-5 text-center text-emerald-400 font-semibold">None (Method generated)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}
