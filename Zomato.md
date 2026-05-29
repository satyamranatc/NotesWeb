Below is a public-stack map of Zomato’s tech/DevOps setup, built only from Zomato’s engineering posts and other primary sources. It is not the full internal inventory, but it covers the technologies they have publicly documented. ([Zomato][1])

**Core platform / architecture**

* **Microservices + monoliths** — overall backend shape; services are split by domain and produce lots of events/logs at scale. ([Zomato][2])
* **Kafka** — event backbone for orders, billing, ads, logs, and real-time pipelines. ([Zomato][3])
* **Flink** — real-time stream processing for ads, analytics, and other event pipelines. ([Zomato][3])
* **Flink SQL** — lets teams write stream-processing logic in SQL instead of only Java. ([Zomato][3])

**Deployment / DevOps**

* **Kubernetes** — main orchestration layer for production workloads and ML services. ([Zomato][1])
* **AWS EKS** — Kubernetes control plane used for Flink and production infrastructure. ([Zomato][1])
* **ArgoCD** — GitOps deployment tool that syncs Kubernetes manifests automatically from Git. ([Zomato][1])
* **Docker** — builds container images for Flink and other workloads. ([Zomato][1])
* **Amazon ECR** — registry where built Docker images are pushed. ([Zomato][1])
* **AWS EMR** — early Flink runtime for big-data jobs on managed Hadoop infrastructure. ([Zomato][3])
* **AWS EC2 spot instances** — cost-optimized compute for observability, logging, ML, and other large workloads. ([Zomato][4])
* **AWS S3** — data lake / raw-event source for reconciliation and analytics pipelines. ([Zomato][5])
* **AWS EFS** — used to sync configuration files in the VM controller/observability setup. ([Zomato][4])

**Service mesh / traffic routing**

* **Kuma service mesh** — routes preview/local traffic by header-based rules. ([Zomato][6])
* **Envoy** — request routing/proxying in local preview and mesh-based traffic handling. ([Zomato][6])
* **SSH reverse tunneling / zctl** — connects local developer machines back to staging for local preview. ([Zomato][6])

**Databases / storage**

* **DynamoDB** — primary database for some high-scale systems; also offline feature store in ML. ([Zomato][7])
* **Aurora RDS** — relational database used alongside DynamoDB and MongoDB. ([Zomato][7])
* **MongoDB** — one of Zomato’s primary databases for product and analytics use cases. ([Zomato][7])
* **Redis / Redis Cluster** — cache, online feature store, and real-time serving layer. ([Zomato][8])
* **Cassandra** — replacement for Redis in the food feed to improve HA and distributed reliability. ([Zomato][8])
* **TiDB** — used in the billing platform before moving to DynamoDB. ([Zomato][9])
* **Postgres** — persistent store in the Vinifera security/automation system. ([Zomato][10])

**Analytics / data platform**

* **Trino** — SQL query engine over many heterogeneous data sources. ([Zomato][11])
* **Apache Hive** — one of the data sources queried through Trino. ([Zomato][11])
* **Apache Druid** — one of the analytical stores queried through Trino. ([Zomato][11])
* **Apache Pinot** — another analytical source queried through Trino. ([Zomato][11])
* **Apache Airflow** — internal ETL/reporting platform with query retry. ([Zomato][11])
* **Apache Superset** — dashboarding / BI consumption layer. ([Zomato][11])
* **Redash** — dashboarding / ad hoc analysis layer. ([Zomato][11])
* **Jupyter notebooks** — analysis and experimentation environment. ([Zomato][11])
* **PyJumbo** — Zomato’s custom Python SDK for data access. ([Zomato][11])
* **Spark** — batch feature computation for ML. ([Zomato][12])

**Machine learning**

* **Butterfly** — in-house ML API gateway for model serving. ([Zomato][13])
* **MLflow** — central model registry for deployment and versioning. ([Zomato][13])
* **XGBoost / LambdaMART** — ranking models for restaurant ads. ([Zomato][13])
* **Python** — model implementation language. ([Zomato][13])
* **Kubernetes for ML serving** — deploys models in production on CPU-focused spot instances. ([Zomato][14])
* **Redis Cluster** — online feature store for real-time features. ([Zomato][12])
* **DynamoDB** — offline feature store for batch features. ([Zomato][12])

**Logging / observability**

* **ClickHouse** — petabyte-scale log store for fast querying. ([Zomato][2])
* **Prometheus** — earlier metrics collection and scraping layer. ([Zomato][4])
* **Thanos** — earlier long-term/HA metrics storage with Prometheus. ([Zomato][4])
* **VictoriaMetrics** — newer observability backend replacing Prometheus/Thanos for scale and cost. ([Zomato][4])
* **Grafana** — dashboards and alerting for metrics and local-preview health. ([Zomato][4])
* **New Relic** — part of the earlier monitoring stack. ([Zomato][4])
* **cAdvisor** — infrastructure metric source in observability. ([Zomato][4])
* **LogStore / in-house logging platform** — internal log ingestion and querying at very high throughput. ([Zomato][15])

**Mobile / frontend engineering**

* **Swift Package Manager (SPM)** — iOS code sharing and dependency management. ([Zomato][16])
* **Xcode** — iOS build system and project environment. ([Zomato][16])
* **Carthage** — older iOS dependency manager replaced by SPM. ([Zomato][16])
* **Objective-C + Swift** — mixed-language iOS codebase. ([Zomato][16])
* **Git submodules / iOS monorepo** — code distribution model across Zomato’s iOS apps. ([Zomato][16])
* **Local Preview** — shift-left testing so developers can test E2E flows locally before preview deploys. ([Zomato][17])

**Security / utilities**

* **Gitleaks** — secret scanning in the Vinifera system. ([Zomato][10])
* **Sidekiq** — job lifecycle management, retries, and background tasks. ([Zomato][10])

**Likely system-design flow in one line**

* **App/web/mobile → events to Kafka → stream processing with Flink → storage in Redis/Cassandra/DynamoDB/MongoDB/Aurora/TiDB → analytics through Trino/Airflow/Superset/Redash/Jupyter → deployment on Kubernetes/EKS with ArgoCD → observability via Prometheus/Thanos/VictoriaMetrics/Grafana → logs in ClickHouse.** ([Zomato][3])

If you want, I can turn this into a neat **Zomato system design diagram** next.

[1]: https://www.zomato.com/blog/apache-flink-journey-zomato-from-inception-to-innovation "Apache Flink Journey @Zomato: From Inception to Innovation"
[2]: https://www.zomato.com/blog/building-a-cost-effective-logging-platform-using-clickhouse-for-petabyte-scale?utm_source=chatgpt.com "Building a cost-effective logging platform using Clickhouse ..."
[3]: https://www.zomato.com/blog/apache-flink-journey-zomato-from-inception-to-innovation?utm_source=chatgpt.com "Apache Flink Journey @Zomato: From Inception to ..."
[4]: https://www.zomato.com/blog/migrating-to-victoriametrics-a-complete-overhaul-for-enhanced-observability?utm_source=chatgpt.com "Migrating to VictoriaMetrics: A complete overhaul for ..."
[5]: https://www.zomato.com/blog/eliminating-bottlenecks-in-real-time-data-streaming-a-zomato-ads-flink-journey?utm_source=chatgpt.com "Eliminating Bottlenecks in Real-Time Data Streaming"
[6]: https://www.zomato.com/blog/embracing-shift-left-testing-with-local-preview?utm_source=chatgpt.com "Embracing Shift-Left Testing with Local Preview"
[7]: https://www.zomato.com/blog/a-tale-of-scale-behind-the-scenes-at-zomato-tech-for-nye-2023 "A Tale of Scale: Behind the Scenes at Zomato Tech for NYE 2023"
[8]: https://www.zomato.com/blog/how-we-moved-our-food-feed-from-redis-to-cassandra "How we moved our Food Feed from Redis to Cassandra"
[9]: https://www.zomato.com/blog/switching-from-tidb-to-dynamodb?utm_source=chatgpt.com "Unlocking performance, scalability, and cost-efficiency of ..."
[10]: https://www.zomato.com/blog/introducing-vinifera?utm_source=chatgpt.com "Introducing Vinifera: A guide on how it prevents and ..."
[11]: https://www.zomato.com/blog/powering-data-analytics-with-trino "Powering Zomato’s data analytics using Trino"
[12]: https://www.zomato.com/blog/elements-of-scalable-machine-learning?utm_source=chatgpt.com "The elements of scalable machine learning"
[13]: https://www.zomato.com/blog/powering-restaurant-ads-on-zomato "Powering restaurant ads on Zomato via Machine Learning"
[14]: https://www.zomato.com/blog/elements-of-scalable-machine-learning "The elements of scalable machine learning"
[15]: https://www.zomato.com/blog/a-tale-of-scale-behind-the-scenes-at-zomato-tech-for-nye-2023?utm_source=chatgpt.com "A Tale of Scale: Behind the Scenes at Zomato Tech ..."
[16]: https://www.zomato.com/blog/zomatos-journey-to-seamless-ios-code-sharing-and-distribution "Unlocking Innovation: Zomato’s journey to seamless iOS code sharing &amp; distribution with Swift Package Manager"
[17]: https://www.zomato.com/blog/embracing-shift-left-testing-with-local-preview "Embracing Shift-Left Testing with Local Preview"
