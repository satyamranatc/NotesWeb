# Machine Learning Interview Question Guide

## From Scratch to Linear Regression

---

# 1. Introduction to Machine Learning

### Basic Questions

1. What is Machine Learning?
2. Difference between AI, ML, and Deep Learning?
3. Types of Machine Learning?
4. What is Supervised Learning?
5. What is Unsupervised Learning?
6. What is Reinforcement Learning?
7. What is training data?
8. What is testing data?
9. What is validation data?
10. Why do we split datasets?

---

# 2. Data Handling & Preprocessing

### Beginner Questions

1. What is a dataset?
2. What are features and labels?
3. Difference between structured and unstructured data?
4. What is data preprocessing?
5. Why is preprocessing important?
6. What are missing values?
7. How do you handle missing values?
8. What is data cleaning?
9. What is duplicate data?
10. What is noisy data?

---

### Intermediate Questions

1. What is feature engineering?
2. What is feature scaling?
3. Difference between normalization and standardization?
4. What is encoding?
5. Difference between Label Encoding and One-Hot Encoding?
6. What is dimensionality reduction?
7. Why do we shuffle datasets?
8. What is data leakage?
9. What is imbalance in datasets?
10. What is outlier detection?

---

# 3. Statistics for Machine Learning

### Fundamental Questions

1. What is mean?
2. What is median?
3. What is mode?
4. What is variance?
5. What is standard deviation?
6. What is probability?
7. What is distribution?
8. What is normal distribution?
9. What is correlation?
10. Difference between covariance and correlation?

---

### Interview-Level Statistics Questions

1. What is skewness?
2. What is kurtosis?
3. What is hypothesis testing?
4. What is p-value?
5. What is confidence interval?
6. What is central limit theorem?
7. What is Bayes theorem?

genui{"math_block_widget_always_prefetch_v4":{"content":"P(A|B)=\frac{P(B|A)P(A)}{P(B)}"}}

8. What is conditional probability?
9. Difference between dependent and independent events?
10. What is random variable?

---

# 4. Python & Libraries for ML

### Questions

1. Why is Python popular in Machine Learning?
2. What is NumPy?
3. What is Pandas?
4. What is Matplotlib?
5. What is Scikit-learn?
6. Difference between Series and DataFrame?
7. What is vectorization?
8. Why are NumPy arrays faster than lists?
9. What is a DataFrame index?
10. What is CSV data?

---

# 5. Machine Learning Workflow

### Questions

1. Explain the complete ML workflow.
2. Steps involved in training a model?
3. What is model training?
4. What is model testing?
5. What is model evaluation?
6. What is inference in ML?
7. What is overfitting?
8. What is underfitting?
9. What is bias in ML?
10. What is variance in ML?

---

# 6. Evaluation Metrics

### Regression Metrics

1. What is MAE?

MAE=\frac{1}{n}\sum_{i=1}^{n}|y_i-\hat{y}_i|

2. What is MSE?

MSE=\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2

3. What is RMSE?
4. What is R² Score?
5. Difference between MAE and MSE?
6. Why is RMSE useful?
7. Which metric is sensitive to outliers?
8. What is residual error?
9. What is prediction error?
10. What is loss function?

---

# 7. Linear Regression

## Core Concepts

1. What is Linear Regression?
2. Why is it called regression?
3. Difference between regression and classification?
4. What type of problems does Linear Regression solve?
5. What is dependent variable?
6. What is independent variable?
7. What is target variable?
8. What is prediction line?
9. What is best fit line?
10. What is slope?

---

## Important Formula Questions

### Linear Equation

genui{"math_block_widget_always_prefetch_v4":{"content":"y=mx+b"}}

Questions:

1. Explain y = mx + b
2. What is slope (m)?
3. What is intercept (b)?
4. How does slope affect prediction?
5. What happens if slope is negative?

---

## Cost Function

J(m,b)=\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2

Questions:

1. What is a cost function?
2. Why do we minimize cost?
3. Why is squared error used?
4. What are residuals?
5. Difference between loss and cost function?

---

## Gradient Descent

\theta=\theta-\alpha\frac{\partial J}{\partial \theta}

Questions:

1. What is Gradient Descent?
2. What is learning rate?
3. What happens if learning rate is too high?
4. What happens if learning rate is too low?
5. What are local minima?
6. What are global minima?
7. Difference between Batch Gradient Descent and Stochastic Gradient Descent?
8. Why is optimization important?

---

# 8. Assumptions of Linear Regression

### Interview Questions

1. What are the assumptions of Linear Regression?
2. What is linearity?
3. What is multicollinearity?
4. What is homoscedasticity?
5. What is independence of errors?
6. What is normal distribution of residuals?
7. What happens if assumptions fail?
8. How do you detect multicollinearity?
9. What is VIF?
10. Why are assumptions important?

---

# 9. Practical ML Questions

### Coding/Project Questions

1. How do you train a Linear Regression model in Python?
2. How do you split datasets using Scikit-learn?
3. How do you evaluate predictions?
4. How do you visualize regression lines?
5. How do you save ML models?
6. What is pickle in Python?
7. Difference between fit() and predict()?
8. What is train_test_split()?
9. How do you handle categorical data?
10. How do you deploy a simple ML model?

---

# 10. Scenario-Based Interview Questions

1. A model performs well on training data but badly on testing data. Why?
2. Your dataset has missing values. What will you do?
3. Your Linear Regression model has low accuracy. What steps will you take?
4. The dataset contains outliers. How can it affect regression?
5. How would you improve model performance?
6. When should Linear Regression not be used?
7. If two features are highly correlated, what problem occurs?
8. How do you choose important features?
9. What happens when data is not linear?
10. Why do we need feature scaling?

---

# 11. Mini Coding Interview Questions

### Python + ML Practice

1. Write code to load a CSV file using Pandas.
2. Write code for train-test split.
3. Train a Linear Regression model.
4. Predict house prices using Linear Regression.
5. Plot regression line using Matplotlib.
6. Calculate MAE and MSE.
7. Remove null values from dataset.
8. Encode categorical columns.
9. Normalize a dataset.
10. Read dataset information using `.info()` and `.describe()`.

---

# 12. HR + ML Mixed Questions

1. Explain your ML project.
2. Why do you want to learn Machine Learning?
3. Difference between coding and ML development?
4. Which ML algorithm interests you most?
5. What challenges did you face in your project?
6. How do you debug ML models?
7. What datasets have you worked on?
8. What is your future goal in AI/ML?
9. Explain Linear Regression to a non-technical person.
10. Why should we hire you for an ML role?

---

# Recommended Topics to Study Before Next Step

After mastering Linear Regression, move toward:

* Logistic Regression
* Decision Trees
* Random Forest
* KNN
* SVM
* Clustering
* PCA
* Neural Networks
* Deep Learning Basics

---

# Best Practice for Interviews

### Focus on:

* Concepts first
* Small coding practice daily
* Mathematics intuition
* Dataset understanding
* Model evaluation
* Real projects

---

# Mini Revision Sheet

| Topic              | Must Know                   |
| ------------------ | --------------------------- |
| ML Basics          | Types of ML                 |
| Data Preprocessing | Scaling, Encoding           |
| Statistics         | Mean, Variance, Correlation |
| Python Libraries   | NumPy, Pandas, sklearn      |
| Regression         | y = mx + b                  |
| Cost Function      | Error minimization          |
| Gradient Descent   | Optimization                |
| Metrics            | MAE, MSE, RMSE              |
| Assumptions        | Linearity, Independence     |
