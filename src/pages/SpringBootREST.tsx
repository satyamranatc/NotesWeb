import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Send, Code, Database, RefreshCw, Cpu, Layers, HelpCircle } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

interface ResponseMock {
  status: string;
  code: number;
  body: string;
  headers: string;
}

export default function SpringBootREST() {
  const [method, setMethod] = useState<"GET" | "POST" | "DELETE">("GET");
  const [endpoint, setEndpoint] = useState("/api/users/1");
  const [requestBody, setRequestBody] = useState('{\n  "name": "Jane Doe",\n  "email": "jane@gmail.com"\n}');
  const [response, setResponse] = useState<ResponseMock | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = () => {
    setIsLoading(true);
    setResponse(null);

    setTimeout(() => {
      setIsLoading(false);
      if (method === "GET") {
        if (endpoint === "/api/users/1") {
          setResponse({
            status: "200 OK",
            code: 200,
            headers: "Content-Type: application/json",
            body: JSON.stringify({ id: 1, name: "John Doe", email: "john@example.com" }, null, 2)
          });
        } else {
          setResponse({
            status: "404 NOT FOUND",
            code: 404,
            headers: "Content-Type: application/json",
            body: JSON.stringify({ error: "Resource not found on path: " + endpoint }, null, 2)
          });
        }
      } else if (method === "POST") {
        try {
          const parsed = JSON.parse(requestBody);
          setResponse({
            status: "201 CREATED",
            code: 201,
            headers: "Content-Type: application/json\nLocation: /api/users/102",
            body: JSON.stringify({ id: 102, ...parsed }, null, 2)
          });
        } catch (e) {
          setResponse({
            status: "400 BAD REQUEST",
            code: 400,
            headers: "Content-Type: application/json",
            body: JSON.stringify({ error: "Malformed request payload body JSON" }, null, 2)
          });
        }
      } else if (method === "DELETE") {
        setResponse({
          status: "204 NO CONTENT",
          code: 204,
          headers: "",
          body: ""
        });
      }
    }, 850);
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
      className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-24"
    >
      {/* Page Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-[10px] font-bold uppercase tracking-widest">
          <Globe className="w-3 h-3" /> Java Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Spring Boot <span className="text-green-500">REST APIs</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Construct production-grade HTTP services. Map resources, bind payloads, and shape server responses using MVC controllers.
        </p>
      </header>

      {/* 01. Concepts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-green-500">01.</span> Core Overview
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          RESTful APIs are resource-based services that communicate using standard HTTP methods. Spring Boot structures these endpoints with controllers, converting Java objects to JSON automatically.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-2">
            <span className="text-xs font-bold text-green-400">Stateless Architecture</span>
            <p className="text-zinc-450 text-xs leading-relaxed font-light">
              Each HTTP request contains all components needed to resolve itself. Sockets are opened briefly, run, and closed without session state overhead.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-2">
            <span className="text-xs font-bold text-blue-400">Resource URI Routing</span>
            <p className="text-zinc-450 text-xs leading-relaxed font-light">
              URLs point exclusively to resources, not operations (e.g. <code className="text-zinc-300">/api/users</code> instead of <code className="text-zinc-300">/getUserDetails</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Interactive REST Controller Simulator */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-green-500">02.</span> REST Controller Simulator
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Trigger request pathways directly. Observe how the dispatcher processes endpoints and creates structured responses.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* Mock Client Config */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-5">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Mock Client Sandbox</span>

            {/* Method Select */}
            <div className="flex gap-2">
              {["GET", "POST", "DELETE"].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMethod(m as any);
                    if (m === "GET") setEndpoint("/api/users/1");
                    else if (m === "POST") setEndpoint("/api/users");
                    else if (m === "DELETE") setEndpoint("/api/users/1");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                    method === m
                      ? "bg-zinc-800 border-zinc-700 text-zinc-100"
                      : "bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Endpoint Input */}
            <div className="space-y-1.5">
              <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest">HTTP URI Endpoint</label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-zinc-700"
              />
            </div>

            {/* Request Body (only visible for POST) */}
            {method === "POST" && (
              <div className="space-y-1.5">
                <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest">Request Payload Body JSON</label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full h-24 bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 text-xs text-zinc-300 font-mono focus:outline-none focus:border-zinc-700"
                />
              </div>
            )}

            {/* Send Request Button */}
            <button
              onClick={handleSimulate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-xs font-bold text-white rounded-xl cursor-pointer transition-all"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Dispatching...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Fire Request
                </>
              )}
            </button>
          </div>

          {/* Controller Lifecycle & Output */}
          <div className="flex flex-col justify-between">
            <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-3xl h-full flex flex-col justify-between space-y-6">
              {/* Visual Path Flow */}
              <div className="space-y-3">
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Active Dispatch Route</span>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono font-bold tracking-wider uppercase">
                  <div className={`p-2.5 rounded-lg border ${isLoading ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-zinc-950 border-zinc-900 text-zinc-650"}`}>
                    Dispatcher
                  </div>
                  <div className={`p-2.5 rounded-lg border ${response ? "bg-zinc-900 border-zinc-850 text-zinc-400" : "bg-zinc-950 border-zinc-900 text-zinc-650"}`}>
                    RestController
                  </div>
                  <div className={`p-2.5 rounded-lg border ${response ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-zinc-950 border-zinc-900 text-zinc-650"}`}>
                    Response
                  </div>
                </div>
              </div>

              {/* Server Response Code & Payload output */}
              <div className="flex-1 flex flex-col justify-end space-y-3">
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Response Output</span>
                <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl flex-1 flex flex-col min-h-[160px] justify-between space-y-4">
                  {response ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                          response.code >= 200 && response.code < 300 ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                          {response.status}
                        </span>
                        <span className="text-[9px] text-zinc-550 font-mono">{response.headers}</span>
                      </div>
                      <pre className="text-[11px] font-mono text-zinc-350 overflow-x-auto no-scrollbar max-h-36">
                        <code>{response.body}</code>
                      </pre>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-zinc-600 italic">
                      Trigger the mock client sandpit to inspect payloads
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Core Controller Code Setup */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-green-500">03.</span> Rest Controller Structure
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Use routing annotations to bind URLs, extract query/path variables, and serialize data objects inside Java classes.
        </p>

        <CodeBlock
          filename="UserController.java"
          language="java"
          code={`@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users/101
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userService.findById(id);
        return user != null 
            ? ResponseEntity.ok(user) 
            : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}`}
        />
      </section>

      {/* 04. Core Annotations Reference table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-green-500">04.</span> Core Routing Annotations
        </h2>
        <div className="overflow-hidden border border-zinc-900 rounded-2xl shadow-xl">
          <table className="w-full text-left border-collapse bg-zinc-950/20 text-xs">
            <thead>
              <tr className="bg-zinc-900/30 border-b border-zinc-900">
                <th class="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Annotation</th>
                <th class="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Mapping Target</th>
                <th class="px-6 py-4 text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Conversion/Binding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-400">
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-green-400 text-[11px]">@RestController</td>
                <td className="px-6 py-5">Root Class Node</td>
                <td className="px-6 py-5">Registers controller bean, auto-appends @ResponseBody serialization.</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-green-400 text-[11px]">@PathVariable</td>
                <td className="px-6 py-5">Method Parameter</td>
                <td className="px-6 py-5">Maps placeholder values directly from the URI string (e.g. /api/users/{`{id}`}).</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-green-400 text-[11px]">@RequestParam</td>
                <td className="px-6 py-5">Method Parameter</td>
                <td className="px-6 py-5">Extracts HTTP query query parameters (e.g. /api/users?page=2).</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-green-400 text-[11px]">@RequestBody</td>
                <td className="px-6 py-5">Method Parameter</td>
                <td className="px-6 py-5">Maps deserialized JSON request body onto class templates.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 05. Error handling controller advice */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-green-500">05.</span> Global Error Handling
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Banish try-catch loops in handler methods. Use <code className="text-zinc-300">@ControllerAdvice</code> to intercept exceptions globally and construct clean error payloads automatically.
        </p>

        <CodeBlock
          filename="GlobalExceptionHandler.java"
          language="java"
          code={`@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorPayload> handleUserNotFound(UserNotFoundException ex) {
        ErrorPayload error = new ErrorPayload("USER_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}`}
        />
      </section>
    </motion.div>
  );
}
