# Dijkstra’s Shortest Path Algorithm — The Algorithm That Teaches a Computer to “Think Like GPS”

Imagine you are standing in a city with many roads.

You want to reach every place using the **minimum possible distance**.

What would you do naturally?

You would:

1. Start from your current location.
2. Look for the closest place you can reach.
3. Then from there, expand outward carefully.
4. Always choosing the currently cheapest path.

That exact idea is what **Dijkstra’s Algorithm** does.

It is one of the most beautiful greedy algorithms ever created.

---

# What Problem Does Dijkstra Solve?

Given:

* A weighted graph
* A starting node

Find:

* The shortest distance from the source to **every other node**

Used in:

* Google Maps
* Network routing
* GPS systems
* Game AI pathfinding
* Internet packet routing

---

# Core Intuition

## The Golden Rule

> “Once we find the shortest path to a node, we never need to revisit it.”

This works because:

* all edge weights are non-negative
* no future path can magically become smaller later

---

# Visual Whiteboard Explanation

Consider this graph:

```text
        4
    A ------ B
    |        |
   1|        |2
    |        |
    C ------ D
      \     /
      5\   /1
         E
```

Edges:

```text
A-B = 4
A-C = 1
B-D = 2
C-D = 4
C-E = 5
D-E = 1
```

We want shortest paths from:

# SOURCE = A

---

# Step 1 — Initial Setup

We maintain:

## Distance Array

```text
A = 0
B = ∞
C = ∞
D = ∞
E = ∞
```

Why?

* Distance from A to A = 0
* Everything else unknown = Infinity

---

# Step 2 — Pick Smallest Unvisited Node

Currently:

```text
A = 0
```

Smallest is A.

Mark A as VISITED.

Now relax all neighbors of A.

---

# What is Relaxation?

This is the heart of Dijkstra.

Suppose:

```text
Current Distance to A = 0
Edge A → B = 4
```

Possible new distance:

```text
0 + 4 = 4
```

Current B distance:

```text
∞
```

Since:

```text
4 < ∞
```

Update B.

---

# Relax Neighbors of A

## For B

```text
0 + 4 = 4
```

Update:

```text
B = 4
```

## For C

```text
0 + 1 = 1
```

Update:

```text
C = 1
```

Now:

```text
A = 0
B = 4
C = 1
D = ∞
E = ∞
```

---

# Step 3 — Choose Smallest Unvisited Node

Among unvisited:

```text
B = 4
C = 1
```

Choose C because 1 is smallest.

Mark C visited.

---

# Relax Neighbors of C

## C → D

```text
1 + 4 = 5
```

Update D:

```text
D = 5
```

## C → E

```text
1 + 5 = 6
```

Update E:

```text
E = 6
```

Now:

```text
A = 0
B = 4
C = 1
D = 5
E = 6
```

---

# Step 4 — Pick Smallest Unvisited

Choose:

```text
B = 4
```

Visit B.

Relax neighbors.

---

# Relax B → D

Possible distance:

```text
4 + 2 = 6
```

Current D:

```text
5
```

Since:

```text
6 > 5
```

Do NOT update.

This is important.

Dijkstra constantly compares:

* old shortest
* newly discovered path

and keeps the better one.

---

# Step 5 — Pick Smallest

Choose:

```text
D = 5
```

Visit D.

Relax D → E

```text
5 + 1 = 6
```

Current E:

```text
6
```

Equal → no change needed.

---

# Final Distances

```text
A = 0
B = 4
C = 1
D = 5
E = 6
```

---

# The Big Insight

Dijkstra expands like ripples in water.

```text
Source → closest → next closest → next closest
```

It NEVER jumps randomly.

It grows outward in perfect shortest-distance order.

---

# Time Complexity

Depends on implementation.

## Using Priority Queue (Min Heap)

```text
O((V + E) log V)
```

Efficient and industry standard.

Where:

* V = vertices
* E = edges

---

# Why Priority Queue?

Because repeatedly finding the smallest-distance node is expensive.

Priority Queue gives:

```text
Smallest element in O(log n)
```

instead of scanning entire graph.

---

# Real Mental Model

Imagine this:

You are pouring water from the source node.

Water spreads outward.

The first time water reaches a node:
that is the shortest path.

That is Dijkstra.

---

# IMPORTANT LIMITATION

Dijkstra DOES NOT work properly with:

# Negative Weights

Example:

```text
A → B = 5
A → C = 2
C → B = -10
```

A shorter path can appear later.

This breaks Dijkstra’s core assumption.

For negative weights:

Use:

* Bellman-Ford Algorithm

---

# Python Implementation

```python
import heapq

def dijkstra(graph, start):
    # Priority queue stores:
    # (distance, node)
    pq = [(0, start)]

    # Store shortest distances
    distances = {}

    # Initialize all nodes with infinity
    for node in graph:
        distances[node] = float('inf')

    distances[start] = 0

    while pq:
        # Get node with smallest distance
        current_distance, current_node = heapq.heappop(pq)

        # Ignore outdated entries
        if current_distance > distances[current_node]:
            continue

        # Explore neighbors
        for neighbor, weight in graph[current_node]:

            # New possible distance
            distance = current_distance + weight

            # Relaxation step
            if distance < distances[neighbor]:
                distances[neighbor] = distance

                # Push updated distance
                heapq.heappush(pq, (distance, neighbor))

    return distances


# Graph Representation
graph = {
    'A': [('B', 4), ('C', 1)],
    'B': [('D', 2)],
    'C': [('D', 4), ('E', 5)],
    'D': [('E', 1)],
    'E': []
}

result = dijkstra(graph, 'A')

print(result)
```

---

# Python Code Walkthrough

## Priority Queue

```python
pq = [(0, start)]
```

Stores:

```text
(distance, node)
```

Smallest distance always comes first.

---

## Distance Initialization

```python
distances[node] = infinity
```

Means:
“we don't know shortest path yet”

---

## Extract Minimum

```python
heapq.heappop(pq)
```

Gets closest node.

This is the greedy step.

---

## Relaxation

```python
distance = current_distance + weight
```

Checks if:

```text
new path < old path
```

If yes:
update shortest distance.

---

# Java Implementation

```java
import java.util.*;

class Pair {
    int node;
    int distance;

    Pair(int node, int distance) {
        this.node = node;
        this.distance = distance;
    }
}

public class DijkstraAlgorithm {

    public static void dijkstra(List<List<Pair>> graph, int source) {

        int n = graph.size();

        // Distance array
        int[] dist = new int[n];

        Arrays.fill(dist, Integer.MAX_VALUE);

        dist[source] = 0;

        // Min Heap Priority Queue
        PriorityQueue<Pair> pq =
            new PriorityQueue<>((a, b) -> a.distance - b.distance);

        pq.add(new Pair(source, 0));

        while (!pq.isEmpty()) {

            Pair current = pq.poll();

            int currentNode = current.node;
            int currentDistance = current.distance;

            // Ignore outdated entries
            if (currentDistance > dist[currentNode]) {
                continue;
            }

            // Explore neighbors
            for (Pair neighbor : graph.get(currentNode)) {

                int nextNode = neighbor.node;
                int weight = neighbor.distance;

                int newDistance =
                    currentDistance + weight;

                // Relaxation
                if (newDistance < dist[nextNode]) {

                    dist[nextNode] = newDistance;

                    pq.add(
                        new Pair(nextNode, newDistance)
                    );
                }
            }
        }

        // Print shortest distances
        for (int i = 0; i < n; i++) {
            System.out.println(
                "Distance from source to " +
                i + " = " + dist[i]
            );
        }
    }

    public static void main(String[] args) {

        int n = 5;

        List<List<Pair>> graph = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        // Add edges
        graph.get(0).add(new Pair(1, 4));
        graph.get(0).add(new Pair(2, 1));

        graph.get(1).add(new Pair(3, 2));

        graph.get(2).add(new Pair(3, 4));
        graph.get(2).add(new Pair(4, 5));

        graph.get(3).add(new Pair(4, 1));

        dijkstra(graph, 0);
    }
}
```

---

# Java Code Walkthrough

## Pair Class

```java
class Pair
```

Stores:

```text
(node, distance)
```

Used in:

* adjacency list
* priority queue

---

# Priority Queue

```java
PriorityQueue<Pair>
```

Behaves like a Min Heap.

Always gives smallest-distance node first.

---

# Relaxation Logic

```java
if (newDistance < dist[nextNode])
```

This single line is the soul of Dijkstra.

Every shortest path algorithm revolves around this comparison.

---

# How to Recognize Dijkstra Problems in Interviews

If you see:

* shortest path
* minimum cost
* weighted graph
* non-negative edges
* fastest route
* cheapest path

Your brain should immediately scream:

# DIJKSTRA

---

# Final Deep Understanding

Dijkstra is not just an algorithm.

It is a strategy:

```text
Always expand the safest known shortest path first.
```

That greedy philosophy is why it works so elegantly.

Once this clicks, graph algorithms become far less mysterious.

And suddenly:

* GPS
* networking
* routing systems
* game movement

all start feeling connected under one beautiful idea.
