# The Developer's Blueprint to Solving DSA Questions

This guide compiles the structured approach for attacking coding questions during interviews, explaining core algorithmic patterns and data structures complexity thresholds.

---

## 1. The Whiteboard Step Method

When presented with a coding problem under pressure, do not jump straight to coding. Follow this 6-stage blueprint:

### Stage 1: Understand & Clarify
- Confirm inputs and outputs.
- Clarify constraints (e.g. neg values allowed, array sizes).
- Walk through edge cases (e.g. null inputs, single-value ranges).

### Stage 2: Visualizing & Examples
- Draw a custom, non-trivial test case (size 5-6) on the board.
- Manually calculate the answer to observe the logic your brain uses.

### Stage 3: Brute Force Baseline
- State a working brute force solution.
- Analyze its Time & Space complexity.
- Acknowledge inefficiencies before trying to optimize.

### Stage 4: Optimize Strategically
- Identify bottlenecks (e.g. nested loops doing redundant checks).
- Trade space for time (e.g. using a Hash Map).
- Try Sorting to apply Two Pointers or Binary Search.

### Stage 5: Write Clean Code
- Maintain modular structure and handle null checks immediately.
- Use readable variable names (`leftPointer` instead of `l`).

### Stage 6: Dry-Run & Test
- Manually trace the code on the board using your custom test cases.
- Use variable trace tables to spot index offsets or off-by-one errors.

---

## 2. Core Algorithmic Patterns

### Two Pointers
- **Use Case**: Comparing elements in sorted arrays/strings without nested loops.
- **Complexity**: $O(N)$ Time, $O(1)$ Space.
- **Triggers**: Searching pairs, reversing sequences, checking palindromes.

### Sliding Window
- **Use Case**: Analyzing contiguous subarrays or substrings of static/dynamic length.
- **Complexity**: $O(N)$ Time, $O(1)$ or $O(K)$ Space.
- **Triggers**: Subarray matches, longest/shortest substring searches.

### Binary Search
- **Use Case**: Finding values in sorted inputs or optimization thresholds in logarithmic time.
- **Complexity**: $O(\log N)$ Time, $O(1)$ Space.
- **Triggers**: Pre-sorted arrays, binary search on answers.

### DFS / BFS
- **Use Case**: Traversing graphs, trees, or recursive state pathways.
- **Complexity**: $O(V + E)$ Time, $O(V)$ Space.
- **Triggers**: Tree traversals, shortest path in unweighted graphs, maze checks.

---

## 3. Complexity Cheat Sheet

| Data Structure | Access | Search | Insert | Delete | Space Complexity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Array / String** | $O(1)$ | $O(N)$ | $O(N)$ | $O(N)$ | $O(N)$ |
| **Hash Map / Set** | N/A | $O(1)$ | $O(1)$ | $O(1)$ | $O(N)$ |
| **Stack / Queue** | $O(N)$ | $O(N)$ | $O(1)$ | $O(1)$ | $O(N)$ |
| **Balanced BST** | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | $O(N)$ |
| **Min/Max Heap** | $O(1)$ | $O(N)$ | $O(\log N)$ | $O(\log N)$ | $O(N)$ |
| **Graph (Adj List)**| N/A | $O(V + E)$ | $O(1)$ | $O(V + E)$ | $O(V + E)$ |
