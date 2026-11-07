export interface ChallengeScenario {
  id: string;
  customerQuery: string;
  expectedDocIndex: number; // 0-indexed in sampleDocs
  explanation: string;
  hints: string[];
}

export const CHALLENGE_DOCUMENTS = [
  'Troubleshooting billing errors, duplicate charges, and pending bank holds.', // 0
  'How to update personal profile information and email address.', // 1
  'Configuring two-factor authentication (2FA) and security keys.', // 2
  'Resolving delayed credit card transactions and refund processing timelines.', // 3
  'Resetting forgotten master account passwords via SMS verification.', // 4
  'Exporting monthly analytics reports and invoice receipts in PDF format.', // 5
  'Integrating third-party webhook endpoints for automated order webhooks.', // 6
  'Cancellation policies, subscription downgrades, and prorated account credits.', // 7
];

export const CHALLENGE_SCENARIOS: ChallengeScenario[] = [
  {
    id: 'scenario-1',
    customerQuery: 'My debit card was charged twice for the annual plan renewal yesterday.',
    expectedDocIndex: 0,
    explanation:
      'Document 1 ("Troubleshooting billing errors, duplicate charges, and pending bank holds") is the optimal match because the customer is dealing with duplicate billing charges. Semantic search matches "charged twice" directly to "duplicate charges" through conceptual proximity.',
    hints: [
      'Look for documents addressing payment anomalies rather than normal checkout procedures.',
      'Notice how the user uses the phrase "charged twice" — which document explicitly resolves this scenario?',
      'Check the cosine similarity score for the document discussing duplicate charges.',
    ],
  },
  {
    id: 'scenario-2',
    customerQuery: 'I want to secure my account with an authenticator app on my phone.',
    expectedDocIndex: 2,
    explanation:
      'Document 3 ("Configuring two-factor authentication (2FA) and security keys") is the correct document. Even though the query said "authenticator app" and the title mentions "two-factor authentication (2FA)", semantic embeddings recognize they denote the same cybersecurity protocol.',
    hints: [
      'The user is asking about cybersecurity and phone verification apps.',
      'What enterprise acronym represents two-factor authentication?',
      'Inspect Document 3’s high cosine similarity score.',
    ],
  },
  {
    id: 'scenario-3',
    customerQuery: 'Where can I download last month’s tax statement and purchase invoices?',
    expectedDocIndex: 5,
    explanation:
      'Document 6 ("Exporting monthly analytics reports and invoice receipts in PDF format") is the best answer. The keywords "tax statement" and "purchase invoices" map semantically to "invoice receipts" and "exporting monthly reports".',
    hints: [
      'Focus on documents handling financial record keeping and downloadable files.',
      'Check which document mentions exporting receipts in PDF format.',
      'Observe the top 3 similarity scores for this query.',
    ],
  },
];
