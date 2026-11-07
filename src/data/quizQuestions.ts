import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is a text embedding in modern artificial intelligence?',
    options: [
      'An encrypted password hash used to secure user accounts',
      'A dense numerical vector that represents the semantic meaning of text',
      'An alphabetical lookup table that stores dictionary definitions',
      'A compressed image file format used by computer vision algorithms',
    ],
    correctAnswer: 1,
    explanation:
      'Correct! An embedding is a dense numerical vector (array of numbers) where the coordinates capture the semantic, contextual meaning of words or sentences in multi-dimensional space.',
    concept: 'Embeddings & Vectors',
  },
  {
    id: 2,
    question: 'Why do computers and neural networks require text to be converted into embeddings?',
    options: [
      'Computers can only perform mathematical and algebraic operations, not read raw human words',
      'Text takes up too much hard drive space unless converted to numbers',
      'Text files cannot be sent over internet protocols without vectorization',
      'All AI models are programmed in binary machine code only',
    ],
    correctAnswer: 0,
    explanation:
      'Correct! Computers are calculating engines. Neural networks rely on matrix multiplications, dot products, and activation functions, so words must be converted into numerical vectors before any computation can occur.',
    concept: 'Why AI Uses Embeddings',
  },
  {
    id: 3,
    question: 'What does "dimensionality" mean when referring to an embedding model with 384 dimensions?',
    options: [
      'The model can process text in 384 different spoken languages',
      'The embedding vector consists of a list of 384 floating-point numbers',
      'The model requires 384 gigabytes of RAM to execute inference',
      'The text is limited to a maximum length of 384 characters',
    ],
    correctAnswer: 1,
    explanation:
      'Correct! The dimension of an embedding corresponds to the number of coordinates in the vector array (e.g. 384 numbers for all-MiniLM-L6-v2, 1536 for OpenAI text-embedding-3-small).',
    concept: 'Vector Dimensionality',
  },
  {
    id: 4,
    question: 'How does semantic search differ fundamentally from traditional keyword search?',
    options: [
      'Semantic search operates much faster by skipping the indexing phase completely',
      'Semantic search matches exact character strings, while keyword search ignores spelling',
      'Semantic search understands intent and meaning, even when different vocabulary is used',
      'Semantic search only searches image metadata rather than written text',
    ],
    correctAnswer: 2,
    explanation:
      'Correct! Traditional keyword search relies on literal string matches (exact words). Semantic search compares vector representations in semantic space, allowing it to find synonyms and conceptually related ideas even with zero exact word overlap.',
    concept: 'Keyword vs Semantic Search',
  },
  {
    id: 5,
    question: 'What mathematical metric is most commonly used to measure the semantic similarity between two embedding vectors?',
    options: [
      'Cosine similarity, which calculates the cosine of the angle between two vectors',
      'Standard deviation of the character counts',
      'The Fibonacci sequence ratio',
      'The alphanumeric ASCII difference between the strings',
    ],
    correctAnswer: 0,
    explanation:
      'Correct! Cosine similarity measures directional alignment: cos(θ) = (A · B) / (||A|| × ||B||). Vectors pointing in the same direction have a cosine similarity near 1.0, indicating strong semantic relationship.',
    concept: 'Cosine Similarity',
  },
  {
    id: 6,
    question: 'If Sentence A is "I enjoy coding Python" and Sentence B is "I love programming software", what would you expect their cosine similarity to be?',
    options: [
      'Near -1.0, because the sentences contain almost no identical words',
      'Exactly 0.0, because vectors are always orthogonal by default',
      'High (typically between 0.70 and 0.90), because their semantic concepts are closely aligned',
      'Undefined, because similarity cannot be computed without identical tokens',
    ],
    correctAnswer: 2,
    explanation:
      'Correct! Despite using different vocabulary, the core concepts ("enjoy" vs "love", "coding Python" vs "programming software") occupy nearby positions in vector space, resulting in a high positive cosine similarity.',
    concept: 'Semantic Similarity',
  },
  {
    id: 7,
    question: 'Why can looking at individual coordinates in a real 384-dimensional embedding be misleading?',
    options: [
      'High-dimensional embeddings distribute semantic meaning across complex entangled patterns across all dimensions, rather than having one coordinate equal one human concept',
      'The numbers in modern embeddings are randomly generated on each run',
      'Embedding coordinates are always integers between 0 and 10',
      'Coordinates are only used for graphic display and have no mathematical meaning',
    ],
    correctAnswer: 0,
    explanation:
      'Correct! In modern contextual neural networks, meaning is represented holistically across the entire dense vector. A single dimension does not simply mean "gender" or "technology"; rather, the global direction and geometry of all 384 dimensions together encode meaning.',
    concept: 'Embedding Interpretability',
  },
  {
    id: 8,
    question: 'In a Retrieval-Augmented Generation (RAG) system, what specific role do embeddings play?',
    options: [
      'Embeddings generate the final creative prose answer shown to the end user',
      'Embeddings translate the user question into multiple foreign languages',
      'Embeddings convert documents and queries into vectors to retrieve the most relevant knowledge snippets from a vector database',
      'Embeddings format the HTML elements on the web browser page',
    ],
    correctAnswer: 2,
    explanation:
      'Correct! In RAG, embeddings perform the RETRIEVAL step: they match the user prompt to the most relevant knowledge chunks in a vector database. The retrieved chunks are then passed to the LLM, which synthesizes the final answer.',
    concept: 'Retrieval-Augmented Generation (RAG)',
  },
  {
    id: 9,
    question: 'Why does 2D visualization (such as PCA or t-SNE) sometimes distort or compress relationships between vectors?',
    options: [
      'Projecting a 384-dimensional space onto a flat 2D plane inevitably loses multi-dimensional angular information',
      '2D plots can only plot positive numbers and delete negative values',
      'Screens cannot display vectors that have floating-point decimals',
      'The Python math library is limited to two dimensions',
    ],
    correctAnswer: 0,
    explanation:
      'Correct! Compressing 384 dimensions of geometric variance into just 2 axes (X and Y) must discard nuances. While PCA captures the primary variance so clusters remain visible, fine-grained multi-angle relationships exist only in the full dimensional space.',
    concept: 'Dimensionality Reduction (PCA)',
  },
  {
    id: 10,
    question: 'Which of the following is NOT an appropriate real-world use case for text embeddings?',
    options: [
      'Detecting duplicate support tickets or questions in a customer portal',
      'Recommending relevant articles based on semantic similarity to previously read content',
      'Executing secure encrypted Bitcoin blockchain transactions',
      'Clustering unstructured customer feedback into common thematic groups',
    ],
    correctAnswer: 2,
    explanation:
      'Correct! Blockchain transactions rely on cryptographic hashes (like SHA-256) where exact binary uniqueness is required. Embeddings are designed to capture fuzzy semantic meaning, making them ideal for search, duplicate detection, and recommendations, but not financial cryptography.',
    concept: 'Real-World Applications',
  },
];
