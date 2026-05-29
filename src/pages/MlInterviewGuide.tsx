import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, Search, Check, ChevronDown, Play, RotateCcw, 
  Info, Sparkles, Layers, Award
} from "lucide-react";
import CodeBlock from "../components/CodeBlock";

interface QuestionItem {
  id: string;
  q: string;
  a: string;
  bullets?: string[];
  code?: string;
  codeLang?: string;
  filename?: string;
}

interface Section {
  id: string;
  title: string;
  laymanTitle: string;
  questions: QuestionItem[];
}

export default function MlInterviewGuide() {
  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  const sections: Section[] = [
    {
      id: "intro-to-ml",
      title: "1. Introduction to ML",
      laymanTitle: "Core Machine Learning Basics",
      questions: [
        {
          id: "q1",
          q: "What is Machine Learning?",
          a: "Machine Learning (ML) is a branch of Artificial Intelligence that enables computer systems to learn from data, identify patterns, and make decisions with minimal human intervention, rather than relying on explicit step-by-step programming.",
          bullets: [
            "Traditional Programming: Data + Rules = Answers",
            "Machine Learning: Data + Answers = Rules (Model parameters)",
            "Enables systems to improve performance on a task automatically over time."
          ]
        },
        {
          id: "q2",
          q: "Difference between AI, ML, and Deep Learning?",
          a: "These terms describe concentric circles of technologies representing different levels of abstraction:",
          bullets: [
            "Artificial Intelligence (AI): The broad concept of creating machines capable of mimicking human cognitive tasks (logic, planning, learning).",
            "Machine Learning (ML): A subset of AI focused on statistical methods that allow algorithms to learn rules directly from data distributions.",
            "Deep Learning (DL): A subset of ML utilizing multi-layered artificial neural networks to learn representations from complex unstructured data."
          ]
        },
        {
          id: "q3",
          q: "Types of Machine Learning?",
          a: "Machine learning is broadly categorized into three paradigms based on the training feedback mechanism:",
          bullets: [
            "Supervised Learning: Learning with labeled inputs (inputs paired with their corresponding correct ground truth targets).",
            "Unsupervised Learning: Learning with unlabeled data to discover hidden patterns, underlying structures, or groupings.",
            "Reinforcement Learning: Learning through trial and error, where an agent performs actions in an environment to maximize cumulative reward."
          ]
        },
        {
          id: "q4",
          q: "What is Supervised Learning?",
          a: "A learning paradigm where the algorithm is trained on a labeled dataset. The model learns to map an input vector x to a target output y by minimizing the difference between its predictions and the actual labels.",
          bullets: [
            "Goal: Generalize from training examples to predict labels on unseen, future data.",
            "Subtypes: Regression (predicting continuous outputs like home prices) and Classification (predicting discrete classes like spam vs. not spam)."
          ]
        },
        {
          id: "q5",
          q: "What is Unsupervised Learning?",
          a: "A paradigm where the model is supplied with unlabeled training data. The algorithm must explore the data structure independently to identify underlying patterns, relationships, or clusters.",
          bullets: [
            "Goal: Cluster data, summarize distributions, or compress dimensions.",
            "Common tasks: Clustering (K-Means), Dimensionality Reduction (PCA), and Association Rule Mining (Apriori)."
          ]
        },
        {
          id: "q6",
          q: "What is Reinforcement Learning?",
          a: "An area of machine learning concerned with how intelligent agents ought to take actions in an environment to maximize some notion of cumulative reward.",
          bullets: [
            "Key elements: Agent, Environment, States, Actions, and Rewards.",
            "No predefined labels; the model learns by receiving positive feedback (rewards) or negative feedback (penalties)."
          ]
        },
        {
          id: "q7",
          q: "What is training data?",
          a: "The primary dataset used to fit the parameters (such as weights and biases in a neural network or slope/intercept in regression) of an ML model.",
          bullets: [
            "The model extracts features and establishes mathematical patterns from this data.",
            "Usually forms the largest percentage of the overall dataset split (e.g., 70-80%)."
          ]
        },
        {
          id: "q8",
          q: "What is testing data?",
          a: "A distinct, independent subset of the dataset that is held back during training and used exclusively to assess the final performance and generalization of the model.",
          bullets: [
            "It must never be shown to the model during training to avoid data leakage.",
            "Helps verify if the model has actually learned the general patterns or simply memorized the training set."
          ]
        },
        {
          id: "q9",
          q: "What is validation data?",
          a: "A subset of the dataset used during the model selection and training phases to evaluate performance, tune hyperparameters, and detect overfitting.",
          bullets: [
            "Provides an unbiased evaluation of the model while adjusting configurations (like learning rate, tree depth).",
            "Serves as an intermediate test set to prevent overfitting the training data."
          ]
        },
        {
          id: "q10",
          q: "Why do we split datasets?",
          a: "To ensure that we can measure the model's capacity to generalize to new, unseen data, which mimics real-world deployment conditions.",
          bullets: [
            "A model that performs well only on its training set has overfit and is useless.",
            "Splitting (e.g., Train/Val/Test) is the standard method to detect overfitting and evaluate model performance objectively."
          ]
        }
      ]
    },
    {
      id: "preprocessing",
      title: "2. Data Preprocessing",
      laymanTitle: "Data Cleaning & Transformations",
      questions: [
        {
          id: "q11",
          q: "What is a dataset?",
          a: "A collection of data records or observations, typically organized in a tabular format where rows represent individual samples (records) and columns represent attributes (features).",
          bullets: [
            "Can be structured (tabular databases), semi-structured (JSON, XML), or unstructured (audio, image, text streams)."
          ]
        },
        {
          id: "q12",
          q: "What are features and labels?",
          a: "In supervised learning, these represent the inputs and targets:",
          bullets: [
            "Features (X): The input variables or attributes used by the model to learn patterns and make predictions (e.g., square footage, number of bedrooms).",
            "Labels (y): The target outcome or true ground truth we want the model to predict (e.g., house price)."
          ]
        },
        {
          id: "q13",
          q: "Difference between structured and unstructured data?",
          a: "The distinction lies in the layout and formatting predictability:",
          bullets: [
            "Structured Data: Clean, formatted data residing in rows and columns (SQL tables, CSVs). Highly searchable and easy for simple algorithms to parse.",
            "Unstructured Data: Data that does not have a predefined structure or data model (emails, photos, video streams, audio recordings). Requires deep learning/feature extraction."
          ]
        },
        {
          id: "q14",
          q: "What is data preprocessing?",
          a: "The essential step of cleaning, transforming, and structuring raw, messy data into a clean, normalized format suitable for training ML models.",
          bullets: [
            "Raw data is rarely clean; preprocessing directly impacts the final accuracy and speed of the model."
          ]
        },
        {
          id: "q15",
          q: "Why is preprocessing important?",
          a: "Machine learning models are strictly mathematical. If the input data contains errors, missing symbols, or mismatched scales, the model will output garbage.",
          bullets: [
            "Saves computation by removing duplicate or highly noisy features.",
            "Ensures features are on a comparable scale, preventing numeric instability during gradient optimization."
          ]
        },
        {
          id: "q16",
          q: "What are missing values?",
          a: "Null values or blank entries in a dataset where no data is recorded for a specific attribute/feature in a sample.",
          bullets: [
            "Commonly caused by data collection failures, skipped survey answers, or API timeouts.",
            "Most algorithms (e.g., Linear Regression) will throw errors if fed null values."
          ]
        },
        {
          id: "q17",
          q: "How do you handle missing values?",
          a: "There are three primary strategies to address missing rows/features:",
          bullets: [
            "Deletion: Remove rows or columns that have missing data (best if missingness is minimal, e.g., < 5%).",
            "Statistical Imputation: Fill missing cells with mean, median, or mode calculations from that column.",
            "Model-Based Imputation: Use an auxiliary model (like KNN or regression) to predict the missing value based on other features."
          ]
        },
        {
          id: "q18",
          q: "What is data cleaning?",
          a: "The process of identifying, correcting, or removing corrupt, inaccurate, duplicate, or irrelevant records from a dataset.",
          bullets: [
            "Key tasks: Deduplication, fixing syntax errors, handling outliers, and validating data types."
          ]
        },
        {
          id: "q19",
          q: "What is duplicate data?",
          a: "Having identical or near-identical rows multiple times in a dataset. This biases the model towards those samples and compromises validation splits.",
          bullets: [
            "Can cause overfitting because the model sees the same sample in both train and test partitions."
          ]
        },
        {
          id: "q20",
          q: "What is noisy data?",
          a: "Random errors, corrupt values, or extreme variance in data that do not reflect the underlying true relationship of the variables.",
          bullets: [
            "Examples: A sensor recording an impossible temperature spike due to temporary static interference."
          ]
        },
        {
          id: "q21",
          q: "What is feature engineering?",
          a: "The creative process of creating new input features, combining existing variables, or extracting indicators from raw data to help algorithms learn faster and achieve higher accuracy.",
          bullets: [
            "Examples: Creating a 'price_per_sqft' feature from 'total_price' and 'area', or extracting 'day_of_week' from a timestamp."
          ]
        },
        {
          id: "q22",
          q: "What is feature scaling?",
          a: "A preprocessing step that shifts and scales the numerical ranges of variables so they have uniform magnitudes.",
          bullets: [
            "Prevents features with large scales (like income) from dominating features with small scales (like age) during model weight updates."
          ]
        },
        {
          id: "q23",
          q: "Difference between normalization and standardization?",
          a: "These are two distinct scaling techniques:",
          bullets: [
            "Normalization (Min-Max): Scales values into a bound range, usually [0, 1]. Best when data distribution does not follow normal distributions.",
            "Standardization (Z-Score): Scales values so they have a mean of 0 and standard deviation of 1. Retains outliers and is best for algorithms assuming normally distributed inputs."
          ]
        },
        {
          id: "q24",
          q: "What is encoding?",
          a: "The process of transforming qualitative, categorical data (e.g., colors, country names) into numerical values so that mathematical models can process them.",
          bullets: [
            "Algorithms cannot multiply vectors containing string text directly."
          ]
        },
        {
          id: "q25",
          q: "Difference between Label Encoding and One-Hot Encoding?",
          a: "The choice depends on the categorical relationship:",
          bullets: [
            "Label Encoding: Assigns a unique integer to each category (e.g., Red=0, Blue=1). Best for ordinal categories that have a natural rank (e.g., Small=0, Medium=1, Large=2).",
            "One-Hot Encoding: Creates separate binary columns for each unique category. Prevents models from assuming fake mathematical relationships between nominal features (e.g., Red and Blue have no order)."
          ]
        },
        {
          id: "q26",
          q: "What is dimensionality reduction?",
          a: "The process of reducing the number of input features in a dataset while retaining as much of the original variation/information as possible.",
          bullets: [
            "Mitigates the 'curse of dimensionality' (sparse data in high-dimensional spaces).",
            "Popular techniques: PCA (Principal Component Analysis) and t-SNE."
          ]
        },
        {
          id: "q27",
          q: "Why do we shuffle datasets?",
          a: "To eliminate any systematic ordering bias present in the collected data before partitioning it into train, validation, and test subsets.",
          bullets: [
            "For example, if a dataset is sorted by class label, splitting without shuffling will result in training on only one class and testing on another, breaking model training."
          ]
        },
        {
          id: "q28",
          q: "What is data leakage?",
          a: "A critical mistake where information from outside the training dataset (specifically from test/target labels) is inadvertently used to train the model.",
          bullets: [
            "Example: Scaling the entire dataset (including test set statistics) before splitting.",
            "Result: Artificially high training/validation metrics that collapse when deployed."
          ]
        },
        {
          id: "q29",
          q: "What is imbalance in datasets?",
          a: "A condition where the classes in the target variable are not represented equally (e.g., 99.8% normal transactions vs. 0.2% credit card fraud).",
          bullets: [
            "Causes models to simply predict the majority class to achieve high nominal accuracy.",
            "Solutions: Class weighting, undersampling, or oversampling (e.g., SMOTE)."
          ]
        },
        {
          id: "q30",
          q: "What is outlier detection?",
          a: "The identification of data points that deviate significantly from the rest of the observations, which can skew statistical parameters (like mean, variance, and regression slopes).",
          bullets: [
            "Can be done using the IQR (Interquartile Range) method, Z-scores, or models like Isolation Forests."
          ]
        }
      ]
    },
    {
      id: "statistics",
      title: "3. Statistics for ML",
      laymanTitle: "Mathematical Foundations",
      questions: [
        {
          id: "q31",
          q: "What is mean?",
          a: "The arithmetic average of a set of numbers, calculated by summing all values and dividing by the total count.",
          bullets: [
            "Highly sensitive to extreme outliers."
          ]
        },
        {
          id: "q32",
          q: "What is median?",
          a: "The middle value in a dataset when the values are sorted in ascending or descending order.",
          bullets: [
            "Extremely robust to outliers (e.g., median household income is a better representation than mean household income)."
          ]
        },
        {
          id: "q33",
          q: "What is mode?",
          a: "The value that appears most frequently in a dataset.",
          bullets: [
            "Can be used for both numerical and categorical variables."
          ]
        },
        {
          id: "q34",
          q: "What is variance?",
          a: "A measure of the dispersion or spread of data points around their arithmetic mean, representing the average of the squared deviations from the mean.",
          bullets: [
            "Formula: Var(X) = E[(X - μ)²]"
          ]
        },
        {
          id: "q35",
          q: "What is standard deviation?",
          a: "The square root of the variance. It measures the spread of data in the same units as the original observations, making it highly interpretable.",
          bullets: [
            "Formula: σ = √Variance"
          ]
        },
        {
          id: "q36",
          q: "What is probability?",
          a: "A mathematical branch and metric that quantifies the likelihood of a specific event occurring, expressed as a real number between 0 (impossible) and 1 (certainty).",
          bullets: [
            "Ranges: 0% to 100%."
          ]
        },
        {
          id: "q37",
          q: "What is distribution?",
          a: "A mathematical function or chart that lists all possible outcomes of a random variable and how frequently they occur.",
          bullets: [
            "Examples: Normal, Binomial, Uniform, and Poisson distributions."
          ]
        },
        {
          id: "q38",
          q: "What is normal distribution?",
          a: "Also known as a Gaussian distribution, it is a bell-shaped, symmetric probability distribution where the mean, median, and mode are all equal at the center.",
          bullets: [
            "Empirical Rule: 68% of data falls within 1 standard deviation, 95% within 2, and 99.7% within 3."
          ]
        },
        {
          id: "q39",
          q: "What is correlation?",
          a: "A statistical measure that indicates the strength and direction of a linear relationship between two variables, ranging from -1 to +1.",
          bullets: [
            "1: Perfect positive correlation.",
            "0: No linear relationship.",
            "-1: Perfect negative correlation."
          ]
        },
        {
          id: "q40",
          q: "Difference between covariance and correlation?",
          a: "The key difference is scale and normalization:",
          bullets: [
            "Covariance: Measures the direction of a linear relationship. Unbounded, meaning its value depends entirely on the units of the variables, making it hard to compare.",
            "Correlation: The normalized version of covariance (divided by the product of standard deviations). Bound between -1 and 1, making it scale-independent."
          ]
        },
        {
          id: "q41",
          q: "What is skewness?",
          a: "A measure of the asymmetry of a probability distribution around its mean.",
          bullets: [
            "Right-skewed (positive): Long tail extends to the right (mean > median).",
            "Left-skewed (negative): Long tail extends to the left (mean < median).",
            "Symmetric: Zero skewness (mean = median)."
          ]
        },
        {
          id: "q42",
          q: "What is kurtosis?",
          a: "A statistical measure indicating the peakedness or 'tailedness' of a probability distribution, which relates to the presence of extreme outliers.",
          bullets: [
            "High kurtosis (leptokurtic): Heavy tails, indicating more frequent extreme outliers.",
            "Low kurtosis (platykurtic): Light tails, indicating fewer extreme outliers."
          ]
        },
        {
          id: "q43",
          q: "What is hypothesis testing?",
          a: "A statistical method that uses sample data to evaluate the plausibility of a hypothesis about a population parameter.",
          bullets: [
            "Null Hypothesis (H0): Assumes no effect or no difference exists (the baseline/default status).",
            "Alternative Hypothesis (Ha): The claim you want to prove (usually that a significant difference exists)."
          ]
        },
        {
          id: "q44",
          q: "What is p-value?",
          a: "The probability, assuming the null hypothesis H0 is true, of obtaining a test statistic result at least as extreme as the one observed in the sample.",
          bullets: [
            "If p-value < alpha (usually 0.05): Reject the null hypothesis (statistically significant difference).",
            "If p-value >= 0.05: Fail to reject the null hypothesis."
          ]
        },
        {
          id: "q45",
          q: "What is confidence interval?",
          a: "A range of values, derived from sample statistics, that is likely to contain the true population parameter at a specified confidence level (e.g., 95%).",
          bullets: [
            "Example: 'The mean weight is 150 lbs, with a 95% confidence interval of [145, 155].'"
          ]
        },
        {
          id: "q46",
          q: "What is central limit theorem?",
          a: "A foundational theorem stating that as sample size increases, the distribution of sample means will approach a normal distribution, regardless of the population's original shape.",
          bullets: [
            "Usually applies when the sample size n >= 30.",
            "Allows statisticians to make normal-distribution assumptions even on highly skewed data."
          ]
        },
        {
          id: "q47",
          q: "What is Bayes theorem?",
          a: "A mathematical formula that describes the probability of an event based on prior knowledge of conditions that might be related to the event:",
          bullets: [
            "Formula: P(A|B) = [P(B|A) * P(A)] / P(B)",
            "Enables updating belief in a hypothesis (A) when presented with new evidence (B)."
          ]
        },
        {
          id: "q48",
          q: "What is conditional probability?",
          a: "The probability of an event A occurring, given that another event B has already occurred. Denoted as P(A|B).",
          bullets: [
            "Formula: P(A|B) = P(A ∩ B) / P(B)"
          ]
        },
        {
          id: "q49",
          q: "Difference between dependent and independent events?",
          a: "How the occurrence of one event alters the probability of another:",
          bullets: [
            "Independent: Event A occurring does not affect the probability of event B occurring (e.g., rolling two dice). P(A ∩ B) = P(A) * P(B).",
            "Dependent: Event A occurring changes the probability of event B occurring (e.g., drawing cards without replacement)."
          ]
        },
        {
          id: "q50",
          q: "What is random variable?",
          a: "A variable whose value is determined by the numerical outcome of a random phenomenon.",
          bullets: [
            "Discrete: Can take a countable number of distinct values (e.g., number of coin flips).",
            "Continuous: Can take an infinite number of values within a range (e.g., height, time)."
          ]
        }
      ]
    },
    {
      id: "python-libraries",
      title: "4. Python & Libraries",
      laymanTitle: "Programming Tools & Ecosystem",
      questions: [
        {
          id: "q51",
          q: "Why is Python popular in Machine Learning?",
          a: "Python has become the industry standard for machine learning due to several key factors:",
          bullets: [
            "Simple, highly readable syntax that allows developers to focus on algorithms rather than boilerplate code.",
            "Massive, production-ready library ecosystem (NumPy, Pandas, Scikit-Learn, PyTorch, TensorFlow).",
            "Large active community providing support and open-source contributions."
          ]
        },
        {
          id: "q52",
          q: "What is NumPy?",
          a: "Numerical Python (NumPy) is the fundamental package for scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with a collection of high-level mathematical functions to operate on them.",
          bullets: [
            "Enables vectorization to perform calculations without manual loops."
          ]
        },
        {
          id: "q53",
          q: "What is Pandas?",
          a: "A Python library designed for data manipulation, ingestion, cleaning, and analysis.",
          bullets: [
            "Introduces two primary data structures: Series (1D) and DataFrame (2D tables).",
            "Provides powerful SQL-like operations for merging, filtering, and grouping data."
          ]
        },
        {
          id: "q54",
          q: "What is Matplotlib?",
          a: "The foundational 2D plotting library for Python, used to create static, interactive, and animated data visualizations.",
          bullets: [
            "Forms the backend for many other plotting wrappers, such as Seaborn."
          ]
        },
        {
          id: "q55",
          q: "What is Scikit-learn?",
          a: "The premier open-source library for classical machine learning algorithms in Python.",
          bullets: [
            "Features modules for classification, regression, clustering, preprocessing, and model selection.",
            "Standardized API design centered around `.fit()`, `.transform()`, and `.predict()` methods."
          ]
        },
        {
          id: "q56",
          q: "Difference between Series and DataFrame?",
          a: "The core difference is dimensional structure:",
          bullets: [
            "Series: A one-dimensional array-like object capable of holding any data type, accompanied by an index.",
            "DataFrame: A two-dimensional, size-mutable, tabular data structure with labeled axes (rows and columns)."
          ]
        },
        {
          id: "q57",
          q: "What is vectorization?",
          a: "The practice of replacing explicit element-by-element loops with mathematical operations applied to entire arrays simultaneously.",
          bullets: [
            "Delegates loops to low-level compiled code (written in C) inside NumPy, resulting in massive speedups."
          ]
        },
        {
          id: "q58",
          q: "Why are NumPy arrays faster than lists?",
          a: "NumPy arrays are optimized at the memory and hardware levels:",
          bullets: [
            "Contiguous Memory: Array elements are stored next to each other in memory, enabling CPU cache hits.",
            "Homogeneous Types: All elements must be of the exact same data type, avoiding type-checking overhead.",
            "Vectorized calculations leverage modern CPU SIMD (Single Instruction, Multiple Data) instructions."
          ]
        },
        {
          id: "q59",
          q: "What is a DataFrame index?",
          a: "A set of labels assigned to each row of a DataFrame, acting like a primary key in a database table.",
          bullets: [
            "Used for fast row lookups, data alignment, and indexing operations."
          ]
        },
        {
          id: "q650",
          q: "What is CSV data?",
          a: "Comma-Separated Values, a simple text-file format that represents tabular data. Each line of the file is a data record, and attributes are separated by commas.",
          bullets: [
            "Widely used for transferring tabular data between database applications and Python scripts."
          ]
        }
      ]
    },
    {
      id: "workflow",
      title: "5. ML Workflow",
      laymanTitle: "Model Training Lifecycle",
      questions: [
        {
          id: "q61",
          q: "Explain the complete ML workflow.",
          a: "The standard ML pipeline consists of several iterative phases:",
          bullets: [
            "1. Problem Definition: Identifying the business objective and target metrics.",
            "2. Data Collection: Gathering raw databases, telemetry, or API logs.",
            "3. Data Preprocessing: Handling nulls, duplicate rows, scaling, and encoding.",
            "4. Feature Engineering: Transforming variables to boost learning.",
            "5. Model Training: Fitting parameters on training sets.",
            "6. Model Evaluation: Testing on validation and test sets using metrics.",
            "7. Deployment: Deploying the model to serve inference via APIs."
          ]
        },
        {
          id: "q62",
          q: "Steps involved in training a model?",
          a: "An iterative optimization process:",
          bullets: [
            "Forward Pass: Pass training inputs through the model to generate predictions.",
            "Loss Calculation: Measure prediction errors using a loss function (e.g., MSE).",
            "Backward Pass (Gradients): Calculate the gradient of the loss with respect to parameters.",
            "Weight Update: Adjust weights using an optimizer (like Gradient Descent) to reduce future loss."
          ]
        },
        {
          id: "q63",
          q: "What is model training?",
          a: "The mathematical process where an algorithm analyzes training data to find optimal weights and biases that minimize a cost function.",
          bullets: [
            "Requires balancing underfitting and overfitting."
          ]
        },
        {
          id: "q64",
          q: "What is model testing?",
          a: "Evaluating the fully trained model on a hold-out test set to measure how well it generalizes to unseen, real-world data distributions.",
          bullets: [
            "Helps verify if the model has memorized the training set (overfitting) or learned the actual pattern."
          ]
        },
        {
          id: "q65",
          q: "What is model evaluation?",
          a: "Applying specific statistical formulas (like Accuracy, Precision, Recall, MAE, R²) to interpret model performance and determine if it meets business criteria.",
          bullets: [
            "Allows comparing multiple algorithms side-by-side."
          ]
        },
        {
          id: "q66",
          q: "What is inference in ML?",
          a: "Using a trained model to make predictions on new, unseen data inputs in real-time or batch processes.",
          bullets: [
            "Does not involve calculating loss or updating weights; only a fast mathematical forward pass is executed."
          ]
        },
        {
          id: "q67",
          q: "What is overfitting?",
          a: "When a model learns the training data, including its noise and random fluctuations, too well. It fails to generalize to test data.",
          bullets: [
            "Signature: Extremely low training error, but high validation/testing error.",
            "Solutions: Regularization (L1/L2), simplify the model, or add more training data."
          ]
        },
        {
          id: "q68",
          q: "What is underfitting?",
          a: "When the model is too simple to capture the underlying structure or relationship of the data.",
          bullets: [
            "Signature: High training error and high validation/test error.",
            "Solutions: Increase model complexity, engineer better features, or train for more epochs."
          ]
        },
        {
          id: "q69",
          q: "What is bias in ML?",
          a: "Errors introduced by simplifying assumptions made by the model. High bias models are too simple and fail to fit the training data.",
          bullets: [
            "Leads to underfitting."
          ]
        },
        {
          id: "q70",
          q: "What is variance in ML?",
          a: "The model's sensitivity to small fluctuations in the training dataset. High variance models pay too much attention to individual data points.",
          bullets: [
            "Leads to overfitting."
          ]
        }
      ]
    },
    {
      id: "metrics",
      title: "6. Evaluation Metrics",
      laymanTitle: "Measuring Regression Errors",
      questions: [
        {
          id: "q71",
          q: "What is MAE?",
          a: "Mean Absolute Error. The average of the absolute differences between the actual targets and the predicted outputs:",
          bullets: [
            "Formula: MAE = (1/n) * Σ |y_i - ŷ_i|",
            "Easy to interpret because the error units match the target variable scale.",
            "Robust to outliers because it does not square the differences."
          ]
        },
        {
          id: "q72",
          q: "What is MSE?",
          a: "Mean Squared Error. The average of the squared differences between the actual targets and the predicted outputs:",
          bullets: [
            "Formula: MSE = (1/n) * Σ (y_i - ŷ_i)²",
            "Penalizes larger errors and outliers heavily due to the squaring term.",
            "Differentiable, which makes it popular as a loss function for gradient descent optimization."
          ]
        },
        {
          id: "q73",
          q: "What is RMSE?",
          a: "Root Mean Squared Error. The square root of the Mean Squared Error:",
          bullets: [
            "Formula: RMSE = √MSE",
            "Brings the error metric back to the original units of the target variable, making it easier to interpret than MSE while retaining sensitivity to outliers."
          ]
        },
        {
          id: "q74",
          q: "What is R² Score?",
          a: "Also known as the Coefficient of Determination, it measures the proportion of variance in the dependent variable that is explained by the independent variables:",
          bullets: [
            "Formula: R² = 1 - (SS_res / SS_tot), where SS_res is sum of squared residuals and SS_tot is total sum of squares.",
            "R² = 1: Model perfectly predicts the target.",
            "R² = 0: Model performs no better than predicting the mean of the target.",
            "R² < 0: Model performs worse than a simple horizontal line at the mean."
          ]
        },
        {
          id: "q75",
          q: "Difference between MAE and MSE?",
          a: "The core trade-off centers on outlier penalization and mathematical properties:",
          bullets: [
            "MAE: Robust to outliers (an error of 10 is just 10x worse than 1). Non-differentiable at 0, making it harder to optimize directly with standard gradient solvers.",
            "MSE: Highly sensitive to outliers (an error of 10 becomes 100). Differentiable everywhere, making it ideal for weight adjustments."
          ]
        },
        {
          id: "q76",
          q: "Why is RMSE useful?",
          a: "It combines the advantages of MSE (penalizing large errors) with the scale interpretability of MAE, as its units match the target column.",
          bullets: [
            "Used frequently in business metrics where extreme errors are highly disruptive."
          ]
        },
        {
          id: "q77",
          q: "Which metric is sensitive to outliers?",
          a: "MSE and RMSE are highly sensitive to outliers because squaring errors amplifies large deviations.",
          bullets: [
            "If outliers are actual anomalies you want to ignore, use MAE.",
            "If outliers are critical errors you must avoid (e.g., safety limits), use MSE/RMSE."
          ]
        },
        {
          id: "q78",
          q: "What is residual error?",
          a: "The difference between the actual observed value y and the predicted value ŷ for a single data point.",
          bullets: [
            "Formula: e_i = y_i - ŷ_i",
            "Represented visually as the vertical distance from a data point to the regression line."
          ]
        },
        {
          id: "q79",
          q: "What is prediction error?",
          a: "The deviation between the true population relationship value and the estimated value generated by the model.",
          bullets: [
            "Combines bias, variance, and irreducible noise."
          ]
        },
        {
          id: "q80",
          q: "What is loss function?",
          a: "A mathematical function that evaluates a model's prediction error on a single training instance, driving parameter updates during training.",
          bullets: [
            "Loss function: Evaluated on a single sample.",
            "Cost function: Aggregated loss evaluated over the entire dataset."
          ]
        }
      ]
    },
    {
      id: "linear-regression",
      title: "7. Linear Regression",
      laymanTitle: "The Best Fit Line & Gradient Descent",
      questions: [
        {
          id: "q81",
          q: "What is Linear Regression?",
          a: "A supervised learning algorithm used to model the linear relationship between a dependent continuous target variable (y) and one or more independent variables (x).",
          bullets: [
            "Simple Linear Regression: Uses one feature (y = mx + b).",
            "Multiple Linear Regression: Uses multiple features (y = w1x1 + w2x2 + ... + b)."
          ]
        },
        {
          id: "q82",
          q: "Why is it called regression?",
          a: "The term was coined by Francis Galton in his study of heights, where he noticed that tall parents' children tend to 'regress' back towards the average height of the population.",
          bullets: [
            "In modern ML, 'regression' simply refers to predicting continuous numerical values."
          ]
        },
        {
          id: "q83",
          q: "Difference between regression and classification?",
          a: "The nature of the target variable:",
          bullets: [
            "Regression: Predicts continuous, infinite quantitative values (e.g., price, weight, temperature).",
            "Classification: Predicts discrete, qualitative categories/classes (e.g., spam vs. ham, cat vs. dog)."
          ]
        },
        {
          id: "q84",
          q: "What type of problems does Linear Regression solve?",
          a: "Problems involving continuous forecasts and feature relationships:",
          bullets: [
            "Predictive Forecasting (e.g., predicting sales revenue next quarter).",
            "Assessing Relationship Strength (e.g., how strongly does marketing spend affect revenue?)."
          ]
        },
        {
          id: "q85",
          q: "What is dependent variable?",
          a: "The target outcome variable you are trying to predict or explain (typically denoted as y). It depends on the inputs.",
          bullets: [
            "Also known as response variable or label."
          ]
        },
        {
          id: "q86",
          q: "What is independent variable?",
          a: "The input variables or features used to make predictions (typically denoted as x). They are assumed to be independent controls.",
          bullets: [
            "Also known as predictor variables, features, or regressors."
          ]
        },
        {
          id: "q87",
          q: "What is target variable?",
          a: "Another name for the dependent variable (y) in a supervised learning task.",
          bullets: [
            "The final column containing the output labels."
          ]
        },
        {
          id: "q88",
          q: "What is prediction line?",
          a: "The straight line representing the model's predictions across the feature space, defined by y = mx + b.",
          bullets: [
            "For simple linear regression, it is a 2D line. For multiple regression, it is a hyperplane in higher dimensions."
          ]
        },
        {
          id: "q89",
          q: "What is best fit line?",
          a: "The regression line that minimizes the sum of squared residual errors (distance from points to line) across the entire training dataset.",
          bullets: [
            "In OLS, the parameters are solved analytically to minimize this error sum."
          ]
        },
        {
          id: "q90",
          q: "What is slope?",
          a: "The coefficient 'm' (or weights 'w') in the regression line. It represents the rate of change of y with respect to x.",
          bullets: [
            "Indicates how many units y will change when x changes by exactly 1 unit."
          ]
        },
        {
          id: "q91",
          q: "Explain y = mx + b.",
          a: "The standard algebraic equation of a straight line:",
          bullets: [
            "y: Dependent variable (prediction).",
            "x: Independent variable (feature input).",
            "m: Slope (direction and steepness).",
            "b: Intercept (value of y when x = 0)."
          ]
        },
        {
          id: "q92",
          q: "What is slope (m)?",
          a: "The weight or coefficient of the feature. It measures the steepness of the regression line.",
          bullets: [
            "Positive slope: y increases as x increases.",
            "Negative slope: y decreases as x increases.",
            "Zero slope: Horizontal line, meaning x has no linear relationship with y."
          ]
        },
        {
          id: "q93",
          q: "What is intercept (b)?",
          a: "The bias parameter, indicating where the line crosses the vertical y-axis.",
          bullets: [
            "Represents the baseline output prediction when all feature inputs are exactly zero."
          ]
        },
        {
          id: "q94",
          q: "How does slope affect prediction?",
          a: "The magnitude and sign of the slope determine how the model scales features to outputs.",
          bullets: [
            "Larger absolute slope values mean the model is highly sensitive to changes in that feature."
          ]
        },
        {
          id: "q95",
          q: "What happens if slope is negative?",
          a: "An inverse relationship is established: as the feature value x increases, the predicted target y decreases (e.g., car value vs. mileage)."
        },
        {
          id: "q96",
          q: "What is a cost function?",
          a: "A mathematical formula that measures the overall error of the model's predictions compared to actual labels across the entire dataset.",
          bullets: [
            "For linear regression, it is typically the Mean Squared Error: J(m, b) = (1/n) * Σ (y_i - (mx_i + b))²"
          ]
        },
        {
          id: "q97",
          q: "Why do we minimize cost?",
          a: "Because minimizing the cost function corresponds to adjusting the parameters (m and b) to find the best fit line that yields the smallest overall prediction error.",
          bullets: [
            "At the minimum cost, the model parameters represent the best fit line."
          ]
        },
        {
          id: "q98",
          q: "Why is squared error used?",
          a: "Squared error is chosen due to three key properties:",
          bullets: [
            "Ensures all error values are positive (preventing negative and positive errors from canceling each other out).",
            "Penalizes large errors much more severely than small ones (outer outliers).",
            "Creates a smooth, convex, continuous mathematical curve with a single global minimum, which is highly suited for gradient descent."
          ]
        },
        {
          id: "q99",
          q: "What are residuals?",
          a: "The differences between the actual target values y and the predicted values ŷ: e_i = y_i - ŷ_i.",
          bullets: [
            "Sum of residuals in standard OLS is always 0."
          ]
        },
        {
          id: "q100",
          q: "Difference between loss and cost function?",
          a: "The scope of error evaluation:",
          bullets: [
            "Loss Function: Evaluates the error on a single training sample.",
            "Cost Function: Evaluates the average loss across all training samples in the dataset."
          ]
        },
        {
          id: "q101",
          q: "What is Gradient Descent?",
          a: "An optimization algorithm used to find the parameters (weights and bias) that minimize a cost function. It works by taking iterative steps in the direction of the steepest descent (the negative gradient) of the cost curve.",
          bullets: [
            "Formula: θ = θ - α * (∂J / ∂θ), where α is learning rate and ∂J/∂θ is the gradient."
          ]
        },
        {
          id: "q102",
          q: "What is learning rate?",
          a: "A hyperparameter (denoted as α) that controls the size of the steps the algorithm takes when moving towards the cost function's minimum.",
          bullets: [
            "Directly affects model convergence speed and stability."
          ]
        },
        {
          id: "q103",
          q: "What happens if learning rate is too high?",
          a: "The step size is too large, causing the parameters to overshoot the minimum, bounce back and forth, and potentially fail to converge (diverge).",
          bullets: [
            "The cost function value may actually increase over time."
          ]
        },
        {
          id: "q104",
          q: "What happens if learning rate is too low?",
          a: "The steps are tiny, meaning the model requires thousands of iterations to reach the minimum, making training computationally slow and prone to getting stuck in plateaus.",
          bullets: [
            "High computation time."
          ]
        },
        {
          id: "q105",
          q: "What are local minima?",
          a: "Valleys on a cost function curve where the cost value is lower than adjacent points, but not the absolute lowest.",
          bullets: [
            "In complex non-linear models (deep learning), getting stuck in local minima is a major risk.",
            "Linear regression only has a single global minimum (convex curve), so it has no local minima issues."
          ]
        },
        {
          id: "q106",
          q: "What are global minima?",
          a: "The absolute lowest point on the cost function curve, representing the optimal parameters with the lowest possible error.",
          bullets: [
            "The target destination for Gradient Descent optimization."
          ]
        },
        {
          id: "q107",
          q: "Difference between Batch GD and Stochastic GD?",
          a: "The amount of data processed per step:",
          bullets: [
            "Batch Gradient Descent: Calculates gradients using the entire dataset at every step. Highly accurate but extremely slow for large datasets.",
            "Stochastic Gradient Descent (SGD): Calculates gradients using just one random sample at every step. Extremely fast but noisy, with the cost oscillating as it approaches the minimum."
          ]
        },
        {
          id: "q108",
          q: "Why is optimization important?",
          a: "Without optimization, training would require manual guessing or evaluating all combinations of parameters, which is computationally impossible.",
          bullets: [
            "Allows computers to learn weights systematically using calculus."
          ]
        }
      ]
    },
    {
      id: "assumptions",
      title: "8. Assumptions of LR",
      laymanTitle: "Validating Ordinary Least Squares",
      questions: [
        {
          id: "q109",
          q: "What are the assumptions of Linear Regression?",
          a: "For OLS to provide unbiased, optimal estimates, five core assumptions must hold:",
          bullets: [
            "1. Linearity: The relationship between features and targets is linear.",
            "2. Homoscedasticity: The variance of residuals is constant across all predictions.",
            "3. Independence: Residual errors of different observations are independent.",
            "4. Normality: Residual errors follow a normal distribution.",
            "5. No Multicollinearity: Independent features are not highly correlated with each other."
          ]
        },
        {
          id: "q110",
          q: "What is linearity?",
          a: "The assumption that the true relationship between the independent variable x and the dependent variable y is a straight line.",
          bullets: [
            "If the relationship is curve-shaped, linear regression will underfit."
          ]
        },
        {
          id: "q111",
          q: "What is multicollinearity?",
          a: "A situation where two or more independent variables in a multiple regression model are highly correlated with each other.",
          bullets: [
            "Makes it hard to determine the individual effect of each feature on the target.",
            "Leads to unstable weight coefficients with high standard errors."
          ]
        },
        {
          id: "q112",
          q: "What is homoscedasticity?",
          a: "The condition where the variance of the residual errors remains constant across all values of the independent variables.",
          bullets: [
            "If the errors get wider as predictions grow (forming a cone shape on a scatter plot), it is heteroscedasticity.",
            "Result: Standard errors are biased, compromising significance tests."
          ]
        },
        {
          id: "q113",
          q: "What is independence of errors?",
          a: "The assumption that the residual error of one data sample is completely unrelated to the residual error of any other sample.",
          bullets: [
            "Commonly violated in time-series data where errors show autocorrelation (yesterday's error correlates with today's)."
          ]
        },
        {
          id: "q114",
          q: "What is normal distribution of residuals?",
          a: "The assumption that if you plot a histogram of the residual errors, they should form a symmetric, bell-shaped normal curve centered at zero.",
          bullets: [
            "Ensures that confidence intervals and hypothesis tests on coefficients are mathematically valid."
          ]
        },
        {
          id: "q115",
          q: "What happens if assumptions fail?",
          a: "The regression parameters can be misleading:",
          bullets: [
            "The model may make biased predictions.",
            "The statistical tests (t-tests of features, confidence intervals) become invalid, meaning you cannot trust which features are actually important."
          ]
        },
        {
          id: "q116",
          q: "How do you detect multicollinearity?",
          a: "Using two main diagnostics:",
          bullets: [
            "Correlation Matrix: Look for high coefficients (e.g., > 0.8) between independent variables.",
            "VIF (Variance Inflation Factor): A VIF value > 5 or 10 indicates high multicollinearity."
          ]
        },
        {
          id: "q117",
          q: "What is VIF?",
          a: "Variance Inflation Factor. It measures how much the variance of an estimated regression coefficient is inflated due to collinearity with other features.",
          bullets: [
            "Formula: VIF = 1 / (1 - R_i²), where R_i² is the R² obtained by regressing feature i against all other features."
          ]
        },
        {
          id: "q118",
          q: "Why are assumptions important?",
          a: "They guarantee the Gauss-Markov theorem: that Ordinary Least Squares (OLS) is the Best Linear Unbiased Estimator (BLUE).",
          bullets: [
            "Ensures model parameters are mathematically sound and interpretable."
          ]
        }
      ]
    },
    {
      id: "practical",
      title: "9. Practical ML Qs",
      laymanTitle: "Python Implementation",
      questions: [
        {
          id: "q119",
          q: "How do you train a Linear Regression model in Python?",
          a: "Using the Scikit-learn library in a few standard steps:",
          bullets: [
            "1. Import: from sklearn.linear_model import LinearRegression",
            "2. Instantiate: model = LinearRegression()",
            "3. Fit: model.fit(X_train, y_train)",
            "4. Predict: y_pred = model.predict(X_test)"
          ]
        },
        {
          id: "q120",
          q: "How do you split datasets using Scikit-learn?",
          a: "By importing the train_test_split utility:",
          bullets: [
            "from sklearn.model_selection import train_test_split",
            "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)"
          ]
        },
        {
          id: "q121",
          q: "How do you evaluate predictions?",
          a: "By importing metric functions from sklearn:",
          bullets: [
            "from sklearn.metrics import mean_squared_error, r2_score",
            "mse = mean_squared_error(y_test, y_pred)",
            "r2 = r2_score(y_test, y_pred)"
          ]
        },
        {
          id: "q122",
          q: "How do you visualize regression lines?",
          a: "Using Matplotlib's scatter and plot methods:",
          bullets: [
            "import matplotlib.pyplot as plt",
            "plt.scatter(X_test, y_test, color='blue')",
            "plt.plot(X_test, y_pred, color='red')"
          ]
        },
        {
          id: "q123",
          q: "How do you save ML models?",
          a: "By using serialization libraries like pickle or joblib to save the model object to a file on disk:",
          bullets: [
            "import joblib",
            "joblib.dump(model, 'regression_model.pkl') # Save",
            "model = joblib.load('regression_model.pkl') # Load"
          ]
        },
        {
          id: "q124",
          q: "What is pickle in Python?",
          a: "A Python standard library module used for serializing and de-serializing object structures into binary byte streams.",
          bullets: [
            "Enables saving the exact trained weights and biases to load later without retuning."
          ]
        },
        {
          id: "q125",
          q: "Difference between fit() and predict()?",
          a: "The functional step in the learning pipeline:",
          bullets: [
            "fit(): Trains the model. The algorithm processes the input features and target labels to compute coefficients (weights and biases).",
            "predict(): Applies the trained model weights to new input features to generate predictions."
          ]
        },
        {
          id: "q126",
          q: "What is train_test_split()?",
          a: "A helper function in Scikit-Learn that randomly splits arrays or matrices into random train and test subsets.",
          bullets: [
            "random_state ensures that the split is reproducible across runs."
          ]
        },
        {
          id: "q127",
          q: "How do you handle categorical data?",
          a: "Transform them into numeric categories before feeding them to the algorithm:",
          bullets: [
            "For binary categories: map directly to 0 and 1.",
            "For multi-class columns: use pd.get_dummies() or OneHotEncoder from sklearn to create binary columns."
          ]
        },
        {
          id: "q128",
          q: "How do you deploy a simple ML model?",
          a: "Create an API application wrapping the model code:",
          bullets: [
            "Write a FastAPI or Flask script containing a POST route that accepts JSON features.",
            "Load the serialized model inside the script, run .predict() on inputs, and return predictions as JSON.",
            "Deploy the containerized server to cloud services like Render, AWS, or Docker."
          ]
        }
      ]
    },
    {
      id: "scenarios",
      title: "10. Scenario Qs",
      laymanTitle: "Real-world Problem Solving",
      questions: [
        {
          id: "q129",
          q: "A model performs well on training data but badly on testing data. Why?",
          a: "The model is overfitting. It has memorized the noise and individual points of the training data instead of learning the generalized relationship.",
          bullets: [
            "Solution: Reduce features, gather more data, use regularization, or simplify model complexity."
          ]
        },
        {
          id: "q130",
          q: "Your dataset has missing values. What will you do?",
          a: "A systematic approach is required:",
          bullets: [
            "Check ratio: If a column has > 60% missing, drop it.",
            "Check type: For numerical data, impute with median (robust to outliers). For categorical, impute with mode.",
            "Use models that support missing data, or use KNN imputer."
          ]
        },
        {
          id: "q131",
          q: "Your Linear Regression model has low accuracy. What steps will you take?",
          a: "Steps to diagnose and fix underfitting:",
          bullets: [
            "Feature Engineering: Combine features or extract new indicators.",
            "Non-linearity: Add polynomial features (squares, interactions) if relationship is non-linear.",
            "Scale and normalize features, or try a different algorithm (Decision Trees, XGBoost)."
          ]
        },
        {
          id: "q132",
          q: "The dataset contains outliers. How can it affect regression?",
          a: "Since OLS regression minimizes Squared Errors (MSE), outliers pull the regression line towards themselves to minimize their massive squared residuals, ruining prediction accuracy on normal data points.",
          bullets: [
            "Solution: Detect and drop outliers, or switch to a robust metric like Huber Loss / MAE."
          ]
        },
        {
          id: "q133",
          q: "How would you improve model performance?",
          a: "A combination of data-level and model-level steps:",
          bullets: [
            "Data level: Clean noise, remove outliers, engineer better feature combinations.",
            "Model level: Feature selection (drop redundant features), hyperparameter tuning, or cross-validation."
          ]
        },
        {
          id: "q134",
          q: "When should Linear Regression not be used?",
          a: "In three primary scenarios:",
          bullets: [
            "The relationship is highly non-linear (e.g., exponential growth).",
            "The target output is a categorical label (use Logistic Regression instead).",
            "The features have severe multicollinearity that cannot be resolved."
          ]
        },
        {
          id: "q135",
          q: "If two features are highly correlated, what problem occurs?",
          a: "Multicollinearity occurs. This makes it difficult to assess the individual coefficient impact of each feature, and makes the model parameters highly sensitive to minor changes in training data.",
          bullets: [
            "Solution: Drop one of the correlated features, or use Principal Component Analysis (PCA)."
          ]
        },
        {
          id: "q136",
          q: "How do you choose important features?",
          a: "Three common methods:",
          bullets: [
            "Filter Methods: Check correlation coefficients or Mutual Information scores with the target.",
            "Wrapper Methods: Recursive Feature Elimination (RFE) where features are removed iteratively.",
            "Embedded Methods: Lasso (L1) regularization, which naturally drives unhelpful coefficients to exactly zero."
          ]
        },
        {
          id: "q137",
          q: "What happens when data is not linear?",
          a: "Linear regression will suffer from high bias (underfitting), generating poor predictions.",
          bullets: [
            "Solution: Apply polynomial features mapping x to [x, x²], log transforms, or use tree-based algorithms."
          ]
        },
        {
          id: "q138",
          q: "Why do we need feature scaling?",
          a: "Features on different scales skew optimization. Since gradient descent updates weights based on gradients, features with massive numerical values cause the gradient updates to fluctuate wildly, slowing down or preventing convergence.",
          bullets: [
            "Scaling (Standardization) ensures the cost surface is symmetric, allowing smooth descent."
          ]
        }
      ]
    },
    {
      id: "coding-practice",
      title: "11. Mini Coding Qs",
      laymanTitle: "Python & Scikit-Learn Practice",
      questions: [
        {
          id: "q139",
          q: "Write code to load a CSV file using Pandas.",
          a: "Import pandas and call `read_csv`:",
          code: `import pandas as pd

# Load CSV file into a DataFrame
df = pd.read_csv('dataset.csv')

# View first 5 rows
print(df.head())`,
          codeLang: "python",
          filename: "load_csv.py"
        },
        {
          id: "q140",
          q: "Write code for train-test split.",
          a: "Use `train_test_split` from `sklearn.model_selection`:",
          code: `from sklearn.model_selection import train_test_split

# Split X and y into 80% train and 20% test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`,
          codeLang: "python",
          filename: "split_data.py"
        },
        {
          id: "q141",
          q: "Train a Linear Regression model.",
          a: "Instantiate `LinearRegression` and call `.fit()`:",
          code: `from sklearn.linear_model import LinearRegression

# Initialize model
model = LinearRegression()

# Train the model on training data
model.fit(X_train, y_train)

# View learned coefficients
print("Slope (Coefficients):", model.coef_)
print("Intercept:", model.intercept_)`,
          codeLang: "python",
          filename: "train_model.py"
        },
        {
          id: "q142",
          q: "Predict house prices using Linear Regression.",
          a: "Call `.predict()` using the test features:",
          code: `# Run inference on test data
predictions = model.predict(X_test)

# Compare first 5 predictions with actual values
for pred, actual in zip(predictions[:5], y_test[:5]):
    print(f"Predicted: {pred:.2f} | Actual: {actual:.2f}")`,
          codeLang: "python",
          filename: "predict.py"
        },
        {
          id: "q143",
          q: "Plot regression line using Matplotlib.",
          a: "Plot the scatter points and the predictions line:",
          code: `import matplotlib.pyplot as plt

# Plot actual test data points
plt.scatter(X_test, y_test, color='blue', label='Actual')

# Plot regression line predictions
plt.plot(X_test, predictions, color='red', linewidth=2, label='Predictions')

plt.xlabel('Square Footage')
plt.ylabel('Price')
plt.legend()
plt.show()`,
          codeLang: "python",
          filename: "plot_regression.py"
        },
        {
          id: "q144",
          q: "Calculate MAE and MSE.",
          a: "Import metrics from `sklearn.metrics`:",
          code: `from sklearn.metrics import mean_absolute_error, mean_squared_error

# Calculate Mean Absolute Error
mae = mean_absolute_error(y_test, predictions)

# Calculate Mean Squared Error
mse = mean_squared_error(y_test, predictions)

print(f"MAE: {mae:.2f}")
print(f"MSE: {mse:.2f}")`,
          codeLang: "python",
          filename: "metrics.py"
        },
        {
          id: "q145",
          q: "Remove null values from dataset.",
          a: "Use `.dropna()` or `.fillna()`:",
          code: `# Option A: Drop all rows containing any null values
clean_df = df.dropna()

# Option B: Impute null values in a column with the column mean
df['Age'] = df['Age'].fillna(df['Age'].mean())`,
          codeLang: "python",
          filename: "handle_nulls.py"
        },
        {
          id: "q146",
          q: "Encode categorical columns.",
          a: "Use Pandas `get_dummies` for one-hot encoding:",
          code: `# One-hot encode the categorical 'City' column
encoded_df = pd.get_dummies(df, columns=['City'], drop_first=True)

# Note: drop_first=True avoids the dummy variable trap (multicollinearity)`,
          codeLang: "python",
          filename: "encoding.py"
        },
        {
          id: "q147",
          q: "Normalize a dataset.",
          a: "Use `StandardScaler` from `sklearn.preprocessing`:",
          code: `from sklearn.preprocessing import StandardScaler

# Initialize scaler
scaler = StandardScaler()

# Fit to training data and transform it
X_train_scaled = scaler.fit_transform(X_train)

# Transform test data (using training parameters to avoid leakage)
X_test_scaled = scaler.transform(X_test)`,
          codeLang: "python",
          filename: "scale.py"
        },
        {
          id: "q148",
          q: "Read dataset information using `.info()` and `.describe()`.",
          a: "Methods to inspect schema and summary stats:",
          code: `# Print summary info (data types, non-null counts)
df.info()

# Print statistical description (mean, std, min, percentiles)
print(df.describe())`,
          codeLang: "python",
          filename: "inspect.py"
        }
      ]
    },
    {
      id: "hr-questions",
      title: "12. HR + ML Questions",
      laymanTitle: "Communication & Context",
      questions: [
        {
          id: "q149",
          q: "Explain your ML project.",
          a: "Structure your explanation using the STAR method: Situation (the problem), Task (your goal), Action (how you preprocessed, chose models, resolved leakage), and Result (the metric boost and business value).",
          bullets: [
            "Avoid overly deep jargon immediately; explain the high-level flow first."
          ]
        },
        {
          id: "q150",
          q: "Why do you want to learn Machine Learning?",
          a: "Because ML shifts software engineering from hand-coded scripts to adaptive, data-driven reasoning. It allows solving complex problems like language translation, computer vision, and forecasting that are impossible with basic logical code loops."
        },
        {
          id: "q151",
          q: "Difference between coding and ML development?",
          a: "The core paradigm shift lies in how rules are established:",
          bullets: [
            "Traditional coding: Humans write rules + supply data = computer executes to produce answers.",
            "ML development: Humans supply data + answers = computer iterates to generate the rules (the model weights)."
          ]
        },
        {
          id: "q152",
          q: "Which ML algorithm interests you most?",
          a: "You can express interest in algorithms like Random Forests for their robustness on tabular data, or Gradient Boosted Trees (like XGBoost) for winning Kaggle challenges, explaining their voting/boosting mechanics."
        },
        {
          id: "q153",
          q: "What challenges did you face in your project?",
          a: "Discuss real engineering challenges, such as handling highly imbalanced labels, fixing data leakage in cross-validation splits, or optimizing database queries for real-time model scoring."
        },
        {
          id: "q154",
          q: "How do you debug ML models?",
          a: "ML debugging requires separating code bugs from statistical bugs:",
          bullets: [
            "Plot learning curves (train vs validation loss over iterations) to detect over/underfitting.",
            "Analyze feature coefficient weights and residuals scatter plots to see where predictions fail.",
            "Check validation data leakages."
          ]
        },
        {
          id: "q155",
          q: "What datasets have you worked on?",
          a: "Outline specific datasets (e.g., house price indices, customer transactional datasets, or medical diagnostic rows), detailing the size, feature counts, and target metrics."
        },
        {
          id: "q156",
          q: "What is your future goal in AI/ML?",
          a: "Becoming a skilled ML Engineer who goes beyond fitting models in notebooks, focusing on building end-to-end pipelines, serving high-throughput APIs, and establishing robust MLOps practices."
        },
        {
          id: "q157",
          q: "Explain Linear Regression to a non-technical person.",
          a: "Imagine you're trying to figure out how height affects weight. You draw points on a graph for several people. You then lay a straight ruler through those points, trying to get it as close to all of them as possible. That ruler is your Linear Regression line, allowing you to estimate a new person's weight if you only know their height.",
          bullets: [
            "Use physical analogies (rulers, scales) rather than formulas."
          ]
        },
        {
          id: "q158",
          q: "Why should we hire you for an ML role?",
          a: "Because I offer a balanced combination of solid theoretical understanding (linear algebra, cost functions, evaluation pitfalls) and practical coding execution, backed by a structured approach to problem solving under pressure."
        }
      ]
    }
  ];

  // Selected Section State
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "mastered" | "remaining">("all");

  // Mastered Questions Tracker (stored in localStorage)
  const [masteredQs, setMasteredQs] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("ml_guide_mastered_questions");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleMastered = (qid: string) => {
    setMasteredQs(prev => {
      const next = { ...prev, [qid]: !prev[qid] };
      localStorage.setItem("ml_guide_mastered_questions", JSON.stringify(next));
      return next;
    });
  };

  // Expanded Accordion State
  const [expandedQId, setExpandedQId] = useState<string | null>(null);

  const toggleExpand = (qid: string) => {
    setExpandedQId(expandedQId === qid ? null : qid);
  };

  // Linear Regression Simulator States
  const [m, setM] = useState(0.6);
  const [b, setB] = useState(0.8);
  const learningRate = 0.04;
  const [isFitting, setIsFitting] = useState(false);

  // Live points
  const points = [
    { x: 1, y: 1.6 },
    { x: 2, y: 2.1 },
    { x: 3, y: 3.4 },
    { x: 4, y: 3.7 },
    { x: 5, y: 4.8 }
  ];

  const predictions = points.map(pt => m * pt.x + b);
  const mae = points.reduce((acc, pt, i) => acc + Math.abs(pt.y - predictions[i]), 0) / points.length;
  const mse = points.reduce((acc, pt, i) => acc + Math.pow(pt.y - predictions[i], 2), 0) / points.length;

  const runGradientDescentStep = () => {
    let mGrad = 0;
    let bGrad = 0;
    const N = points.length;

    for (let i = 0; i < N; i++) {
      const x = points[i].x;
      const y = points[i].y;
      const pred = m * x + b;
      mGrad += -2 * x * (y - pred);
      bGrad += -2 * (y - pred);
    }

    mGrad = mGrad / N;
    bGrad = bGrad / N;

    setM(prev => parseFloat((prev - learningRate * mGrad).toFixed(3)));
    setB(prev => parseFloat((prev - learningRate * bGrad).toFixed(3)));
  };

  const runAutoFit = () => {
    if (isFitting) return;
    setIsFitting(true);
    let step = 0;
    const interval = setInterval(() => {
      runGradientDescentStep();
      step++;
      if (step >= 35) {
        clearInterval(interval);
        setIsFitting(false);
      }
    }, 80);
  };

  const resetSimulator = () => {
    setM(0.2);
    setB(2.2);
  };

  // SVG Scalers for Simulator
  const scaleX = (val: number) => 40 + ((val - 0) / 6) * (380 - 40);
  const scaleY = (val: number) => 220 - ((val - 0) / 6) * (220 - 30);

  // Filtered Questions list
  const filteredQuestions = activeSection.questions.filter(item => {
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.a.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isMastered = !!masteredQs[item.id];
    if (statusFilter === "mastered") return matchesSearch && isMastered;
    if (statusFilter === "remaining") return matchesSearch && !isMastered;
    return matchesSearch;
  });

  // Calculate Statistics
  const totalQuestionsCount = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const totalMasteredCount = Object.values(masteredQs).filter(Boolean).length;
  const overallPercentage = totalQuestionsCount > 0 
    ? Math.round((totalMasteredCount / totalQuestionsCount) * 100) 
    : 0;

  const getSectionMasteredCount = (sec: Section) => {
    return sec.questions.filter(q => !!masteredQs[q.id]).length;
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16"
    >
      {/* Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-[10px] font-bold uppercase tracking-widest">
          <Brain className="w-3 h-3" /> Machine Learning Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          ML Interview <span className="text-violet-400">Question Guide</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          From Scratch to Linear Regression. Master key statistical assumptions, coding syntax, cost functions, and optimization intuition.
        </p>
      </header>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Overall Progress</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{overallPercentage}%</span>
            <span className="text-xs text-zinc-400 font-light">Completed</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-violet-500 transition-all duration-500" 
              style={{ width: `${overallPercentage}%` }} 
            />
          </div>
        </div>

        <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-zinc-900 py-4 sm:py-0 sm:px-6">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Flashcards Mastered</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-violet-400">{totalMasteredCount}</span>
            <span className="text-zinc-500 text-sm">/ {totalQuestionsCount} Qs</span>
          </div>
          <p className="text-[10px] text-zinc-400 font-light mt-2">Mark questions as mastered to log progress.</p>
        </div>

        <div className="space-y-1 sm:pl-6 flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Active Subject</span>
          <span className="text-white font-bold text-sm truncate mt-1">{activeSection.title.substring(3)}</span>
          <span className="text-[10px] text-zinc-500 font-light">{getSectionMasteredCount(activeSection)} of {activeSection.questions.length} Mastered</span>
        </div>
      </div>

      {/* Main Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Section Switcher */}
        <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-6 max-h-[80vh] overflow-y-auto pr-1 scrollbar-thin">
          <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 px-3 block mb-1">Sections</span>
          {sections.map(sec => {
            const isSelected = activeSectionId === sec.id;
            const masteredCount = getSectionMasteredCount(sec);
            const isFullyMastered = masteredCount === sec.questions.length;
            const percent = Math.round((masteredCount / sec.questions.length) * 100);

            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSectionId(sec.id);
                  setExpandedQId(null);
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                  isSelected
                    ? "bg-violet-500/10 border-violet-500 text-violet-400 shadow-md font-bold"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:bg-zinc-900/30"
                }`}
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <span className="text-xs uppercase tracking-wider font-semibold truncate block font-sans">
                    {sec.title}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-light block">
                    {sec.laymanTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isFullyMastered 
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" 
                      : "bg-zinc-900 text-zinc-400"
                  }`}>
                    {percent}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Content Display */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section Heading & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-violet-400">Section Review</span>
              <h2 className="text-2xl font-black text-white">{activeSection.title}</h2>
              <p className="text-xs text-zinc-500 font-light mt-0.5">{activeSection.laymanTitle}</p>
            </div>
            
            {/* Realtime Search & Status Filter */}
            <div className="flex items-center gap-2.5">
              <div className="relative group">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-violet-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Filter questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 focus:border-zinc-700 focus:outline-none rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 transition-all font-medium w-40 sm:w-48"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-zinc-900/40 border border-zinc-800 focus:outline-none rounded-xl px-2.5 py-1.5 text-xs text-zinc-400 transition-all cursor-pointer font-medium"
              >
                <option value="all">All</option>
                <option value="mastered">Mastered</option>
                <option value="remaining">Remaining</option>
              </select>
            </div>
          </div>

          {/* Interactive Linear Regression Simulator — promoted to Section 7 */}
          {activeSectionId === "linear-regression" && (
            <div className="border border-zinc-900 rounded-3xl bg-zinc-950/20 overflow-hidden shadow-2xl p-6 space-y-6">
              <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-[8px] font-bold uppercase tracking-widest">
                    <Sparkles className="w-2.5 h-2.5" /> Interactive Lab
                  </span>
                  <h3 className="text-white font-bold text-lg">Linear Regression & GD Simulator</h3>
                  <p className="text-xs text-zinc-400 font-light">
                    Adjust the slope and intercept sliders to fit the scatter points, or run the animated Gradient Descent.
                  </p>
                </div>
                
                {/* Active formula display */}
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl px-3 py-2 text-right">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block">Model Equation</span>
                  <code className="text-xs font-mono font-bold text-violet-400">ŷ = {m}x + {b}</code>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* SVG scatter plot */}
                <div className="md:col-span-7 bg-black/60 rounded-2xl border border-zinc-900/80 p-4 flex flex-col items-center">
                  <svg className="w-full max-w-[340px] h-[220px]" viewBox="0 0 400 250">
                    {/* Grid lines */}
                    <line x1="40" y1="30" x2="380" y2="30" stroke="#1f1f2e" strokeWidth="0.5" />
                    <line x1="40" y1="93" x2="380" y2="93" stroke="#1f1f2e" strokeWidth="0.5" />
                    <line x1="40" y1="156" x2="380" y2="156" stroke="#1f1f2e" strokeWidth="0.5" />
                    <line x1="40" y1="220" x2="380" y2="220" stroke="#2a2b36" strokeWidth="1" />
                    
                    <line x1="40" y1="30" x2="40" y2="220" stroke="#2a2b36" strokeWidth="1" />
                    <line x1="125" y1="30" x2="125" y2="220" stroke="#1f1f2e" strokeWidth="0.5" />
                    <line x1="210" y1="30" x2="210" y2="220" stroke="#1f1f2e" strokeWidth="0.5" />
                    <line x1="295" y1="30" x2="295" y2="220" stroke="#1f1f2e" strokeWidth="0.5" />
                    <line x1="380" y1="30" x2="380" y2="220" stroke="#1f1f2e" strokeWidth="0.5" />

                    {/* Axis labels */}
                    <text x="35" y="235" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">0</text>
                    <text x="125" y="235" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">2</text>
                    <text x="210" y="235" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">4</text>
                    <text x="295" y="235" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">6</text>
                    <text x="380" y="235" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="monospace">8</text>

                    <text x="25" y="223" fill="#71717a" fontSize="9" textAnchor="end" fontFamily="monospace">0</text>
                    <text x="25" y="160" fill="#71717a" fontSize="9" textAnchor="end" fontFamily="monospace">2</text>
                    <text x="25" y="97" fill="#71717a" fontSize="9" textAnchor="end" fontFamily="monospace">4</text>
                    <text x="25" y="34" fill="#71717a" fontSize="9" textAnchor="end" fontFamily="monospace">6</text>

                    {/* Residual lines (errors) */}
                    {points.map((pt, idx) => {
                      const predY = m * pt.x + b;
                      return (
                        <line
                          key={idx}
                          x1={scaleX(pt.x)}
                          y1={scaleY(pt.y)}
                          x2={scaleX(pt.x)}
                          y2={scaleY(predY)}
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeDasharray="2,2"
                          opacity="0.75"
                        />
                      );
                    })}

                    {/* Regression Line */}
                    <line
                      x1={scaleX(0)}
                      y1={scaleY(b)}
                      x2={scaleX(6)}
                      y2={scaleY(m * 6 + b)}
                      stroke="#8b5cf6"
                      strokeWidth="3"
                      className="transition-all duration-100"
                    />

                    {/* Scatter points */}
                    {points.map((pt, idx) => (
                      <g key={idx}>
                        <circle
                          cx={scaleX(pt.x)}
                          cy={scaleY(pt.y)}
                          r="5"
                          fill="#10b981"
                          stroke="#064e3b"
                          strokeWidth="1.5"
                          className="hover:scale-125 transition-transform"
                        />
                        {/* Glow effect */}
                        <circle
                          cx={scaleX(pt.x)}
                          cy={scaleY(pt.y)}
                          r="10"
                          fill="#10b981"
                          opacity="0.15"
                        />
                      </g>
                    ))}
                  </svg>
                  <div className="flex gap-6 mt-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Actual Points</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" /> Regression Line</span>
                    <span className="flex items-center gap-1.5"><span className="border-t border-dashed border-red-500 w-4 inline-block" /> Residuals</span>
                  </div>
                </div>

                {/* Adjustments & Metrics */}
                <div className="md:col-span-5 space-y-5">
                  
                  {/* Live Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-3">
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block">Mean Absolute Error</span>
                      <span className="text-base font-bold font-mono text-zinc-200">{mae.toFixed(3)}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-3">
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block">Mean Squared Error</span>
                      <span className="text-base font-bold font-mono text-violet-400">{mse.toFixed(3)}</span>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-400 font-bold">Slope (m):</span>
                        <span className="text-violet-400 font-bold">{m}</span>
                      </div>
                      <input
                        type="range"
                        min="-0.5"
                        max="2.0"
                        step="0.05"
                        value={m}
                        onChange={(e) => setM(parseFloat(e.target.value))}
                        disabled={isFitting}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500 disabled:opacity-30"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-400 font-bold">Intercept (b):</span>
                        <span className="text-violet-400 font-bold">{b}</span>
                      </div>
                      <input
                        type="range"
                        min="-0.5"
                        max="4.0"
                        step="0.1"
                        value={b}
                        onChange={(e) => setB(parseFloat(e.target.value))}
                        disabled={isFitting}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500 disabled:opacity-30"
                      />
                    </div>
                  </div>

                  {/* Optimization buttons */}
                  <div className="flex gap-2 pt-2 border-t border-zinc-900/60">
                    <button
                      onClick={runAutoFit}
                      disabled={isFitting}
                      className="flex-1 py-2.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 rounded-xl text-xs font-bold text-violet-400 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> {isFitting ? "Fitting..." : "Gradient Descent"}
                    </button>
                    <button
                      onClick={resetSimulator}
                      disabled={isFitting}
                      className="p-2.5 border border-zinc-900 rounded-xl hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Reset parameters"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-450 leading-relaxed font-light">
                      Gradient descent updates: <code>θ = θ - α * ∂J/∂θ</code>. Clicking Auto-Fit executes 35 optimization steps at a learning rate of {learningRate}.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Flashcard List */}
          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map(item => {
                const isExpanded = expandedQId === item.id;
                const isMastered = !!masteredQs[item.id];

                return (
                  <motion.div
                    key={item.id}
                    layout="position"
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isExpanded 
                        ? "bg-zinc-950/30 border-zinc-800" 
                        : "bg-zinc-950/10 border-zinc-900 hover:border-zinc-850"
                    }`}
                  >
                    {/* Header bar click toggle */}
                    <div 
                      onClick={() => toggleExpand(item.id)}
                      className="px-5 py-4 flex items-center justify-between cursor-pointer select-none gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Mastered status circle */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMastered(item.id);
                          }}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isMastered 
                              ? "bg-violet-500 border-violet-500 text-black shadow-md shadow-violet-500/20" 
                              : "border-zinc-850 bg-zinc-900/30 hover:border-zinc-700"
                          }`}
                        >
                          {isMastered && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <h4 className={`text-sm font-bold leading-relaxed truncate ${isExpanded ? "text-violet-400" : "text-zinc-200"}`}>
                          {item.q}
                        </h4>
                      </div>
                      
                      <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${isExpanded ? "rotate-180 text-violet-400" : ""}`} />
                    </div>

                    {/* Expandable answer panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-black/30 border-t border-zinc-900/60"
                        >
                          <div className="p-5 space-y-4 text-xs leading-relaxed">
                            {/* Summary sentence */}
                            <p className="text-zinc-300 font-medium">
                              {item.a}
                            </p>

                            {/* Bullets */}
                            {item.bullets && item.bullets.length > 0 && (
                              <ul className="space-y-2 text-zinc-400 font-light">
                                {item.bullets.map((bText, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-violet-400 font-bold block pt-0.5">•</span>
                                    <span>{bText}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Code Snippet */}
                            {item.code && (
                              <div className="pt-2">
                                <CodeBlock
                                  code={item.code}
                                  language={item.codeLang}
                                  filename={item.filename}
                                />
                              </div>
                            )}

                            {/* Actions bar inside expanded card */}
                            <div className="flex items-center justify-between pt-3 border-t border-zinc-900/60 mt-1">
                              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-zinc-650">
                                Question ID: {item.id.toUpperCase()}
                              </span>
                              <button
                                onClick={() => toggleMastered(item.id)}
                                className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                  isMastered
                                    ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
                                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                {isMastered ? "Mastered" : "Mark Mastered"}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-16 text-zinc-550 border border-dashed border-zinc-900 rounded-2xl">
                No matching questions found in this section. Try a different query.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mini Revision Sheet Section */}
      <section className="space-y-6 pt-12 border-t border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Mini Revision Sheet</h2>
            <p className="text-xs text-zinc-500 font-light mt-0.5">Quick summary card for key formulas and assumptions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950/20 border border-zinc-900 p-5 rounded-2xl space-y-3">
            <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-violet-400 block">Formulas Cheat</span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                <span className="text-zinc-500">Bayes Theorem:</span>
                <span className="text-zinc-300">P(A|B) = P(B|A)P(A)/P(B)</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                <span className="text-zinc-500">Linear Eq:</span>
                <span className="text-zinc-300">y = mx + b</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                <span className="text-zinc-500">MAE:</span>
                <span className="text-zinc-300">Σ|y - ŷ| / n</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                <span className="text-zinc-500">MSE:</span>
                <span className="text-zinc-300">Σ(y - ŷ)² / n</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-500">Cost function J:</span>
                <span className="text-zinc-300">Σ(y - ŷ)² / n</span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-950/20 border border-zinc-900 p-5 rounded-2xl space-y-3">
            <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-violet-400 block">LR Assumptions</span>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li className="flex gap-2">
                <span className="text-violet-400 font-bold font-mono">1.</span>
                <span><strong>Linearity</strong>: Straight line fit.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 font-bold font-mono">2.</span>
                <span><strong>Homoscedasticity</strong>: Constant residual variance.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 font-bold font-mono">3.</span>
                <span><strong>Independence</strong>: No residual autocorrelation.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 font-bold font-mono">4.</span>
                <span><strong>Normality</strong>: Residuals form standard normal curve.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 font-bold font-mono">5.</span>
                <span><strong>No Multicollinearity</strong>: Features aren't correlated.</span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-950/20 border border-zinc-900 p-5 rounded-2xl space-y-3">
            <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-violet-400 block">General Advice</span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              When interviewing for ML roles, prioritize mathematical intuition and dataset understanding over pure syntax coding. Memorize the OLS assumptions and how to detect violations, as they are high-frequency interview topics.
            </p>
            <div className="p-3 bg-violet-500/5 border border-violet-500/10 rounded-xl flex items-center gap-2">
              <Award className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Focus on concepts first.</span>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
