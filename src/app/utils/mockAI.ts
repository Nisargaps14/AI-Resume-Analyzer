// Mock AI functions - Replace with real API calls for production
// These functions simulate AI responses for interview coaching

export interface InterviewQuestion {
  id: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface AnswerEvaluation {
  score: number; // 0-100
  feedback: string;
  strengths: string[];
  improvements: string[];
  betterAnswer: string;
}

// Generate role-based interview questions
export function generateInterviewQuestions(role: string, count: number = 5): InterviewQuestion[] {
  const questionBank: { [key: string]: InterviewQuestion[] } = {
    'software engineer': [
      {
        id: '1',
        question: 'Explain the difference between let, const, and var in JavaScript.',
        difficulty: 'easy',
        category: 'Technical - JavaScript'
      },
      {
        id: '2',
        question: 'What is the time complexity of searching in a balanced binary search tree?',
        difficulty: 'medium',
        category: 'Technical - Data Structures'
      },
      {
        id: '3',
        question: 'Describe how you would design a URL shortening service like bit.ly',
        difficulty: 'hard',
        category: 'System Design'
      },
      {
        id: '4',
        question: 'Explain the concept of closures in JavaScript with an example.',
        difficulty: 'medium',
        category: 'Technical - JavaScript'
      },
      {
        id: '5',
        question: 'How do you handle state management in a React application?',
        difficulty: 'medium',
        category: 'Technical - React'
      }
    ],
    'data scientist': [
      {
        id: '1',
        question: 'Explain the difference between supervised and unsupervised learning.',
        difficulty: 'easy',
        category: 'Machine Learning'
      },
      {
        id: '2',
        question: 'What is overfitting and how do you prevent it?',
        difficulty: 'medium',
        category: 'Machine Learning'
      },
      {
        id: '3',
        question: 'Describe the process of feature engineering in a machine learning project.',
        difficulty: 'medium',
        category: 'Machine Learning'
      },
      {
        id: '4',
        question: 'Explain the bias-variance tradeoff.',
        difficulty: 'hard',
        category: 'Machine Learning Theory'
      },
      {
        id: '5',
        question: 'How would you handle imbalanced datasets?',
        difficulty: 'medium',
        category: 'Data Processing'
      }
    ],
    'product manager': [
      {
        id: '1',
        question: 'How do you prioritize features in a product roadmap?',
        difficulty: 'medium',
        category: 'Product Strategy'
      },
      {
        id: '2',
        question: 'Describe a time when you had to make a difficult product decision.',
        difficulty: 'medium',
        category: 'Behavioral'
      },
      {
        id: '3',
        question: 'How do you measure product success?',
        difficulty: 'easy',
        category: 'Product Metrics'
      },
      {
        id: '4',
        question: 'Explain how you would improve [popular app].',
        difficulty: 'hard',
        category: 'Product Design'
      },
      {
        id: '5',
        question: 'How do you handle conflicts between stakeholders?',
        difficulty: 'medium',
        category: 'Stakeholder Management'
      }
    ]
  };

  // Default technical questions
  const defaultQuestions: InterviewQuestion[] = [
    {
      id: '1',
      question: 'Tell me about yourself and your professional background.',
      difficulty: 'easy',
      category: 'General'
    },
    {
      id: '2',
      question: 'What are your greatest strengths and weaknesses?',
      difficulty: 'easy',
      category: 'Behavioral'
    },
    {
      id: '3',
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      difficulty: 'medium',
      category: 'Behavioral'
    },
    {
      id: '4',
      question: 'Where do you see yourself in 5 years?',
      difficulty: 'easy',
      category: 'Career Goals'
    },
    {
      id: '5',
      question: 'Why do you want to work for our company?',
      difficulty: 'medium',
      category: 'Motivation'
    }
  ];

  const roleLower = role.toLowerCase();
  const questions = questionBank[roleLower] || defaultQuestions;
  
  return questions.slice(0, count);
}

// Simulate AI evaluation of answer
export function evaluateAnswer(question: string, answer: string): AnswerEvaluation {
  // In production, this would call an AI API (OpenAI, Gemini, etc.)
  // For now, we'll provide mock evaluation based on answer length and keywords

  const wordCount = answer.trim().split(/\s+/).length;
  const hasExamples = /example|instance|time when|experience/i.test(answer);
  const hasStructure = /first|second|third|finally|additionally/i.test(answer);
  const hasQuantifiableResults = /\d+%|increased|decreased|improved|saved/i.test(answer);

  let score = 50; // Base score
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Evaluate based on heuristics
  if (wordCount > 50 && wordCount < 300) {
    score += 20;
    strengths.push('Answer has appropriate length');
  } else if (wordCount < 50) {
    improvements.push('Provide more detail in your answer');
  } else {
    improvements.push('Try to be more concise');
  }

  if (hasExamples) {
    score += 15;
    strengths.push('Uses concrete examples');
  } else {
    improvements.push('Include specific examples from your experience');
  }

  if (hasStructure) {
    score += 10;
    strengths.push('Answer is well-structured');
  } else {
    improvements.push('Use structured approach (e.g., STAR method)');
  }

  if (hasQuantifiableResults) {
    score += 15;
    strengths.push('Includes quantifiable achievements');
  } else {
    improvements.push('Add measurable results where possible');
  }

  // Cap score at 100
  score = Math.min(score, 100);

  const feedback = generateFeedback(score, strengths, improvements);
  const betterAnswer = generateBetterAnswer(question, answer);

  return {
    score,
    feedback,
    strengths,
    improvements,
    betterAnswer
  };
}

function generateFeedback(score: number, strengths: string[], improvements: string[]): string {
  if (score >= 80) {
    return 'Excellent answer! Your response demonstrates strong communication skills and relevant experience.';
  } else if (score >= 60) {
    return 'Good answer with room for improvement. Consider incorporating more specific examples and quantifiable results.';
  } else {
    return 'Your answer needs more development. Focus on providing concrete examples and demonstrating your value.';
  }
}

function generateBetterAnswer(question: string, originalAnswer: string): string {
  // Generate specific, contextual answers based on the question
  const questionLower = question.toLowerCase();
  
  // JavaScript/Programming questions
  if (questionLower.includes('let, const, and var')) {
    return `In JavaScript, let, const, and var are used for variable declaration with different scopes and behaviors:

**var:**
- Function-scoped or globally-scoped
- Can be redeclared and reassigned
- Hoisted to the top with undefined value
- Can cause unexpected behavior due to scope issues

**let:**
- Block-scoped (within curly braces {})
- Can be reassigned but not redeclared in same scope
- Hoisted but not initialized (Temporal Dead Zone)
- Preferred for variables that need reassignment

**const:**
- Block-scoped like let
- Cannot be reassigned after declaration
- Must be initialized at declaration
- Preferred for constants and references that shouldn't change

Example:
function example() {
  var x = 1;        // Function scoped
  if (true) {
    let y = 2;      // Block scoped
    const z = 3;    // Block scoped, cannot reassign
    x = 4;          // Valid
    y = 5;          // Valid
    // z = 6;       // Error: Cannot reassign const
  }
  console.log(x);   // 4
  // console.log(y); // Error: y is not defined
}

Using let and const provides better code predictability and prevents common bugs associated with var's hoisting and scope behavior.`;
  }
  
  if (questionLower.includes('binary search tree')) {
    return `The time complexity of searching in a balanced binary search tree (BST) is **O(log n)**, where n is the number of nodes.

**Why O(log n)?**
- In a balanced BST, each comparison eliminates approximately half of the remaining nodes
- The height of a balanced BST is approximately log₂(n)
- At each level, we make one comparison and move to either left or right subtree
- Maximum comparisons = height of tree = log₂(n)

**Example:**
For a BST with 1,000,000 nodes:
- Height ≈ log₂(1,000,000) ≈ 20
- Maximum comparisons needed: 20

**Comparison with other structures:**
- Unbalanced BST: O(n) - worst case (degrades to linked list)
- Balanced BST (AVL, Red-Black): O(log n) - guaranteed
- Array (binary search): O(log n) but requires sorted data
- Hash table: O(1) average case, but no ordering

**Balancing techniques:**
- AVL trees: Strictly balanced (height difference ≤ 1)
- Red-Black trees: Approximately balanced (faster insertions/deletions)
- B-trees: Optimized for disk storage

This logarithmic complexity makes balanced BSTs excellent for applications requiring both ordered data and efficient search operations.`;
  }
  
  if (questionLower.includes('url shortening service')) {
    return `**Designing a URL Shortening Service (like bit.ly)**

**Requirements:**
- Generate short, unique URLs from long URLs
- Redirect short URLs to original long URLs
- Handle high traffic (millions of requests/day)
- Provide analytics (click counts, timestamps)
- Custom short URLs option

**System Architecture:**

**1. API Gateway:**
- Load balancing and rate limiting
- Authentication for premium features

**2. Application Layer:**
- Short URL generation service
- Redirect service
- Analytics service

**3. Database Design:**
- **Primary Database (SQL):**
  - Table: urls(id, short_code, long_url, created_at, user_id, custom)
  - Index on short_code for fast lookups
- **Cache Layer (Redis):**
  - Cache hot URLs for faster redirects
  - Store click counts temporarily

**4. Short URL Generation:**
- Base62 encoding (0-9, a-z, A-Z) for compact URLs
- Hash function: MD5(long_url) → first 6 characters
- Collision handling: Append counter or use different hash
- Custom URLs: Check availability and reserve

**5. Redirect Flow:**
1. User clicks short URL
2. Lookup short_code in cache (Redis)
3. If miss, query database
4. Cache the result
5. Return 301 redirect to long URL
6. Log analytics asynchronously

**6. Scaling Considerations:**
- Horizontal scaling of application servers
- Database sharding by user_id or geographic region
- CDN for static assets
- Message queue for analytics processing

**7. Monitoring:**
- Track redirect latency
- Monitor cache hit rates
- Alert on high error rates

This design ensures high availability, scalability, and fast redirects while maintaining data consistency.`;
  }
  
  if (questionLower.includes('closures')) {
    return `**JavaScript Closures Explained**

A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has finished executing.

**Key Concept:**
Closures allow functions to "remember" the environment in which they were created.

**Example 1: Basic Closure**
function outerFunction(x) {
  // Outer function variable
  let outerVariable = x;
  
  // Inner function that forms a closure
  function innerFunction() {
    console.log(outerVariable); // Accesses outer variable
  }
  
  return innerFunction;
}

const myClosure = outerFunction(10);
myClosure(); // Outputs: 10 (outerVariable is still accessible!)

**Example 2: Counter with Private State**
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count variable is not directly accessible - private state

**Example 3: Event Handlers**
function attachListeners() {
  let buttons = document.querySelectorAll('button');
  
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      console.log('Button ' + i + ' clicked'); // Closure captures i
    });
  }
}

**Common Use Cases:**
- Data privacy and encapsulation
- Function factories
- Callbacks and event handlers
- Memoization and caching
- Module pattern implementation

**Memory Considerations:**
Closures keep references to outer variables, so they're not garbage collected. This is powerful but requires careful memory management in long-running applications.`;
  }
  
  if (questionLower.includes('state management in react')) {
    return `**State Management in React Applications**

**Local Component State (useState):**
- For component-specific data
- Simple and built-in
- Example: form inputs, toggle states

const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', email: '' });

**Lifting State Up:**
- Share state between parent and child components
- Pass state down as props, functions up as callbacks

**Context API (useContext):**
- Avoid prop drilling for deeply nested components
- Good for global data (theme, user auth, language)

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar />
      <Content />
    </ThemeContext.Provider>
  );
}

**State Management Libraries:**

**Redux Toolkit:**
- Predictable state container
- Great for large, complex applications
- Time-travel debugging
- Middleware support

**Zustand:**
- Lightweight alternative to Redux
- Simple API, minimal boilerplate
- Good for medium-sized apps

**Recoil:**
- Facebook's state management library
- Atom-based state management
- Derived state with selectors

**Best Practices:**
1. Start simple with useState
2. Use Context for global, infrequently changing data
3. Consider Redux/Zustand for complex state logic
4. Keep state as close to where it's used as possible
5. Normalize complex state structures
6. Use TypeScript for better type safety

**Example Architecture:**
- Local state: Form inputs, UI states
- Context: User authentication, theme, language
- Redux: Shopping cart, complex business logic, API data

The key is choosing the right tool for your specific use case rather than over-engineering.`;
  }
  
  // Data Science questions
  if (questionLower.includes('supervised and unsupervised learning')) {
    return `**Supervised vs Unsupervised Learning**

**Supervised Learning:**
- **Definition**: Learning from labeled data with known outcomes
- **Goal**: Predict outcomes for new, unseen data
- **Training Data**: Input features + correct labels/targets
- **Types**:
  - **Classification**: Predict discrete categories
    - Examples: Spam detection, image classification, medical diagnosis
    - Algorithms: Logistic Regression, SVM, Decision Trees, Neural Networks
  - **Regression**: Predict continuous values
    - Examples: House prices, stock prices, temperature forecasting
    - Algorithms: Linear Regression, Random Forest, Gradient Boosting

**Unsupervised Learning:**
- **Definition**: Finding patterns in unlabeled data without predefined outcomes
- **Goal**: Discover hidden structures, relationships, or groupings
- **Training Data**: Only input features, no labels
- **Types**:
  - **Clustering**: Group similar data points
    - Examples: Customer segmentation, document grouping, anomaly detection
    - Algorithms: K-Means, Hierarchical Clustering, DBSCAN
  - **Dimensionality Reduction**: Reduce feature space
    - Examples: Data visualization, feature extraction, noise reduction
    - Algorithms: PCA, t-SNE, Autoencoders
  - **Association Rules**: Find relationships between variables
    - Examples: Market basket analysis, recommendation systems
    - Algorithms: Apriori, FP-Growth

**Key Differences:**

| Aspect | Supervised | Unsupervised |
|--------|------------|--------------|
| Training Data | Labeled | Unlabeled |
| Goal | Prediction | Pattern Discovery |
| Evaluation | Accuracy, Precision, Recall | Silhouette Score, Inertia |
| Complexity | Generally simpler | More complex evaluation |
| Use Cases | Classification, Regression | Clustering, Anomaly Detection |

**Real-World Example:**
- **Supervised**: Predicting customer churn using historical churn data
- **Unsupervised**: Identifying customer segments without predefined categories

**Semi-Supervised Learning**: Combines both approaches using small labeled datasets with large unlabeled datasets.`;
  }
  
  if (questionLower.includes('overfitting')) {
    return `**Overfitting in Machine Learning**

**Definition:**
Overfitting occurs when a model learns the training data too well, including noise and random fluctuations, resulting in poor performance on new, unseen data.

**Signs of Overfitting:**
- High training accuracy, low validation/test accuracy
- Model performs well on training data but poorly on new data
- Complex model with many parameters relative to data size

**Causes:**
1. **Model Complexity**: Too many parameters (deep neural networks, high-degree polynomials)
2. **Insufficient Data**: Small dataset relative to model complexity
3. **Noisy Data**: Model learns random noise instead of true patterns
4. **Too Many Features**: High dimensionality without proper feature selection

**Prevention Techniques:**

**1. Cross-Validation:**
- K-fold cross-validation to assess model performance
- Helps detect overfitting early

**2. Regularization:**
- **L1 (Lasso)**: Adds absolute value of coefficients to loss function
- **L2 (Ridge)**: Adds squared coefficients to loss function
- **Elastic Net**: Combines L1 and L2 regularization

Python code example:
# L2 Regularization example
from sklearn.linear_model import Ridge
model = Ridge(alpha=0.1)  # Higher alpha = more regularization

**3. Early Stopping:**
- Monitor validation loss during training
- Stop when validation loss starts increasing

**4. Dropout (Neural Networks):**
- Randomly deactivate neurons during training
- Prevents co-adaptation of features

**5. Data Augmentation:**
- Increase training data size artificially
- Image rotation, text paraphrasing, etc.

**6. Feature Selection:**
- Remove irrelevant or redundant features
- Use techniques like Recursive Feature Elimination

**7. Ensemble Methods:**
- Random Forests, Gradient Boosting
- Combine multiple weak learners to reduce overfitting

**8. Simplify Model:**
- Reduce neural network layers/neurons
- Use simpler algorithms when appropriate

**Example: Polynomial Regression**
Python code example:
- Overfitting: degree_10_model = PolynomialFeatures(degree=10)
- Better: degree_3_model = PolynomialFeatures(degree=3) + Ridge(alpha=0.1)

**Evaluation:**
Always evaluate on held-out test data to ensure generalization performance.`;
  }
  
  // Product Manager questions
  if (questionLower.includes('prioritize features')) {
    return `**Feature Prioritization in Product Roadmaps**

**Frameworks and Methods:**

**1. RICE Scoring:**
- **Reach**: How many users will this impact? (1-1000+)
- **Impact**: How much will this impact individual users? (1-3)
- **Confidence**: How confident are we in our estimates? (20-100%)
- **Effort**: How much time/resources will this require? (person-months)

**Formula**: (Reach × Impact × Confidence) ÷ Effort

**2. MoSCoW Method:**
- **Must Have**: Critical for release success
- **Should Have**: Important but not critical
- **Could Have**: Nice to have if time permits
- **Won't Have**: Explicitly excluded for this release

**3. Kano Model:**
- **Basic Needs**: Expected features (absence causes dissatisfaction)
- **Performance Needs**: More is better (speed, accuracy)
- **Excitement Needs**: Unexpected features that delight users
- **Indifferent**: Users don't care about these features

**4. Value vs. Effort Matrix:**
- **Quick Wins**: High value, low effort (prioritize first)
- **Major Projects**: High value, high effort (plan carefully)
- **Fill-ins**: Low value, low effort (fill gaps)
- **Money Pits**: Low value, high effort (avoid)

**Data-Driven Prioritization:**
- User feedback and NPS scores
- Usage analytics and feature adoption
- Customer support tickets
- Market research and competitive analysis
- Revenue impact and business metrics

**Stakeholder Considerations:**
- Engineering capacity and technical debt
- Sales team feedback and customer requests
- Marketing timelines and campaigns
- Executive strategic goals
- Legal and compliance requirements

**Process:**
1. Collect all feature requests and ideas
2. Define clear success metrics for each feature
3. Score features using chosen framework
4. Review with cross-functional team
5. Consider dependencies and sequencing
6. Create timeline with buffer for unexpected changes
7. Communicate priorities transparently to all stakeholders

**Best Practices:**
- Review priorities quarterly or as market conditions change
- Maintain a visible backlog with clear status
- Say "no" gracefully and explain reasoning
- Balance short-term wins with long-term strategy
- Consider technical debt alongside new features`;
  }
  
  if (questionLower.includes('measure product success')) {
    return `**Measuring Product Success: Key Metrics and Frameworks**

**North Star Metrics:**
- Single metric that best captures core value delivery
- Examples: 
  - Airbnb: Nights booked
  - Facebook: Daily active users
  - Slack: Messages sent per team

**User Engagement Metrics:**
- **DAU/MAU Ratio**: Daily active users ÷ Monthly active users
  - 20%+ is excellent, 10% is good, <5% needs improvement
- **Session Duration**: How long users spend in product
- **Feature Adoption**: Percentage of users using key features
- **Retention Rate**: Users who return after specific time periods

**Business Metrics:**
- **Customer Lifetime Value (CLV)**: Total revenue from average customer
- **Customer Acquisition Cost (CAC)**: Cost to acquire new customer
- **LTV:CAC Ratio**: 3:1 or higher indicates healthy business
- **Monthly Recurring Revenue (MRR)**: Predictable revenue stream
- **Churn Rate**: Percentage of customers lost over time

**User Satisfaction Metrics:**
- **Net Promoter Score (NPS)**: Likelihood to recommend (0-10)
  - Promoters (9-10), Passives (7-8), Detractors (0-6)
- **Customer Satisfaction (CSAT)**: Satisfaction with specific interactions
- **Customer Effort Score (CES)**: Ease of getting tasks done

**Product-Specific Metrics:**

**E-commerce:**
- Conversion rate, Average order value, Cart abandonment rate

**SaaS:**
- MRR growth, Expansion revenue, Logo retention

**Content Platforms:**
- Time on page, Bounce rate, Content shares

**Frameworks for Success Measurement:**

**HEART Framework (Google):**
- **Happiness**: User satisfaction (NPS, CSAT)
- **Engagement**: Frequency and depth of interaction
- **Adoption**: New user acquisition and onboarding
- **Retention**: User return rates over time
- **Task Success**: Ability to complete key tasks

**AARRR Pirate Metrics:**
- **Acquisition**: How users find you
- **Activation**: First positive experience
- **Retention**: Do users come back?
- **Revenue**: How you make money
- **Referral**: Do users tell others?

**Implementation Tips:**
- Define success metrics before building features
- Use both quantitative and qualitative data
- Segment metrics by user cohorts
- Set baseline measurements and track trends
- Create dashboards for real-time monitoring
- Review metrics regularly and adjust strategy
- Correlate metrics with business outcomes

**Example Success Dashboard:**
- North Star metric trend
- User growth and retention
- Revenue and profitability
- Customer satisfaction scores
- Feature adoption rates`;
  }
  
  // Behavioral questions
  if (questionLower.includes('tell me about yourself')) {
    return `**Professional Introduction Example**

"I'm a results-driven Software Engineer with 5 years of experience building scalable web applications and leading cross-functional teams. I specialize in React, Node.js, and cloud architecture, with a track record of delivering products that serve millions of users.

**Background:**
I started my career at a startup where I wore multiple hats, which gave me end-to-end experience from database design to deployment. This foundation taught me the importance of writing clean, maintainable code and considering the full product lifecycle.

**Key Achievements:**
At my current role at TechCorp, I led the migration of our monolithic application to microservices, which improved system reliability by 40% and reduced deployment time from 2 hours to 15 minutes. I also implemented a comprehensive testing strategy that reduced production bugs by 60%.

**Technical Expertise:**
- Frontend: React, TypeScript, Next.js
- Backend: Node.js, Python, PostgreSQL
- Cloud: AWS, Docker, Kubernetes
- Tools: Git, CI/CD, Agile methodologies

**What Drives Me:**
I'm passionate about solving complex problems and mentoring junior developers. I believe in writing code that not only works but is also maintainable and scalable. I enjoy staying current with emerging technologies and contributing to open-source projects.

**Why I'm Here:**
I'm looking to join a company where I can leverage my technical skills to make a meaningful impact while continuing to grow and learn from talented colleagues. Your company's focus on innovation and user-centric design aligns perfectly with my professional values."

**Key Elements:**
- Present role and years of experience
- 2-3 key achievements with metrics
- Technical skills relevant to the role
- Personal motivation and career goals
- Connection to the specific company/role`;
  }
  
  if (questionLower.includes('strengths and weaknesses')) {
    return `**Professional Strengths and Weaknesses**

**My Strengths:**

**1. Problem-Solving Skills:**
"I excel at breaking down complex technical challenges into manageable components. For example, when our team faced performance issues with our main application, I systematically identified bottlenecks through profiling and implemented targeted optimizations that improved response times by 45%."

**2. Adaptability and Quick Learning:**
"I thrive in fast-paced environments and rapidly pick up new technologies. When our company decided to migrate to Kubernetes, I took the initiative to become certified and led the training for our team, enabling a smooth transition within 3 months."

**3. Collaboration and Communication:**
"I bridge the gap between technical and non-technical stakeholders. In my previous project, I facilitated daily stand-ups between engineering and product teams, ensuring clear communication that helped us deliver our feature 2 weeks ahead of schedule."

**Areas for Improvement:**

**1. Delegation:**
"Early in my career, I tended to take on too much myself to ensure quality. I've learned that effective delegation and mentoring team members not only reduces my workload but also helps develop the team's capabilities. I now actively identify opportunities to empower junior developers."

**2. Public Speaking:**
"While I'm comfortable in team meetings, I used to get nervous presenting to larger audiences. I joined Toastmasters and have been actively seeking opportunities to present at team meetings and local tech meetups. I've seen significant improvement and now actually enjoy sharing technical insights with groups."

**3. Work-Life Balance:**
"I'm passionate about my work and sometimes find it challenging to disconnect. I've implemented strict boundaries, like no work emails after 7 PM and taking regular breaks throughout the day. This has actually improved my focus and productivity during work hours."

**How I'm Addressing Weaknesses:**
- Regular feedback sessions with my manager
- Setting specific, measurable goals for improvement
- Seeking mentorship in areas I want to develop
- Taking courses and reading books on leadership and communication

**Self-Awareness:**
I believe in continuous self-assessment and actively seek feedback from colleagues to identify blind spots and growth opportunities."`;
  }
  
  // Default generic answer for other questions
  return `Here's a structured approach to answering this question using the STAR method:

**Situation:**
Provide context about the specific scenario or challenge you faced. Be specific about the circumstances, timeline, and stakeholders involved.

**Task:**
Clearly articulate what needed to be accomplished. What were your responsibilities and what were the expectations or goals?

**Action:**
Detail the specific steps you took to address the situation. Focus on your individual contributions, the skills you applied, and the decisions you made. Use "I" statements rather than "we."

**Result:**
Share the quantifiable outcomes of your actions. Include metrics, percentages, or specific achievements. Also mention what you learned and how it impacted the team or organization.

**Example Structure:**
"In my previous role as [Your Position], we faced [specific challenge]. My responsibility was to [your task]. I took the following steps: [action 1], [action 2], and [action 3]. As a result, we achieved [specific metric], which led to [broader impact]."

**Key Tips:**
- Be honest and authentic
- Use specific examples from your experience
- Include measurable results when possible
- Keep answers concise (2-3 minutes)
- Practice but don't memorize
- Tailor examples to the role you're applying for

This approach ensures your answers are structured, compelling, and demonstrate your value to potential employers.`;
}

// Mock function to simulate AI resume improvement suggestions
export function generateResumeImprovements(resumeText: string): string[] {
  return [
    'Replace passive voice with active voice (e.g., "Led a team" instead of "Team was led by me")',
    'Add specific metrics to achievements (e.g., "Increased sales by 30%")',
    'Use industry-specific keywords to pass ATS filters',
    'Start each bullet point with a strong action verb',
    'Include relevant certifications and technical skills',
    'Tailor your resume to match the job description',
    'Keep formatting consistent and professional',
    'Highlight leadership experiences and initiatives'
  ];
}
