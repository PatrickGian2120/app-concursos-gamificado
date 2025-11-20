import { Question } from './types';

// Banco de questões mock - em produção viria do backend
export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'Segundo a Constituição Federal de 1988, são Poderes da União, independentes e harmônicos entre si:',
    options: [
      'Executivo, Legislativo e Moderador',
      'Executivo, Legislativo e Judiciário',
      'Executivo, Legislativo e Ministerial',
      'Executivo, Judiciário e Moderador',
    ],
    correctAnswer: 1,
    explanation: 'O artigo 2º da Constituição Federal estabelece que são Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.',
    subject: 'Direito Constitucional',
    difficulty: 'easy',
    xpReward: 10,
    institution: 'FCC',
    year: 2023,
  },
  {
    id: '2',
    text: 'A Lei de Responsabilidade Fiscal (LRF) estabelece normas de finanças públicas voltadas para a responsabilidade na gestão fiscal. Qual é o principal objetivo da LRF?',
    options: [
      'Aumentar a arrecadação tributária',
      'Equilibrar as contas públicas e prevenir déficits',
      'Reduzir o número de servidores públicos',
      'Privatizar empresas estatais',
    ],
    correctAnswer: 1,
    explanation: 'A LRF tem como objetivo principal o equilíbrio das contas públicas, estabelecendo limites e condições para a gestão fiscal responsável.',
    subject: 'Administração Pública',
    difficulty: 'medium',
    xpReward: 25,
    institution: 'CESPE',
    year: 2023,
  },
  {
    id: '3',
    text: 'No âmbito do Direito Administrativo, qual princípio obriga a Administração Pública a atuar de forma transparente e acessível ao cidadão?',
    options: [
      'Princípio da Supremacia do Interesse Público',
      'Princípio da Publicidade',
      'Princípio da Impessoalidade',
      'Princípio da Eficiência',
    ],
    correctAnswer: 1,
    explanation: 'O Princípio da Publicidade determina que os atos administrativos devem ser públicos e transparentes, permitindo o controle social.',
    subject: 'Direito Administrativo',
    difficulty: 'easy',
    xpReward: 10,
    institution: 'FGV',
    year: 2024,
  },
  {
    id: '4',
    text: 'Em relação aos crimes contra a Administração Pública, assinale a alternativa correta sobre o crime de peculato:',
    options: [
      'É praticado apenas por particulares',
      'Consiste em apropriar-se de dinheiro público ou particular de que tem posse em razão do cargo',
      'Não admite modalidade culposa',
      'É crime de menor potencial ofensivo',
    ],
    correctAnswer: 1,
    explanation: 'O peculato é crime funcional praticado por funcionário público que se apropria de valores que tem a posse em razão do cargo, podendo ser doloso ou culposo.',
    subject: 'Direito Penal',
    difficulty: 'hard',
    xpReward: 50,
    institution: 'CESPE',
    year: 2023,
  },
  {
    id: '5',
    text: 'Qual das alternativas abaixo representa corretamente um direito social previsto na Constituição Federal?',
    options: [
      'Direito à propriedade privada',
      'Direito à educação',
      'Direito à liberdade de expressão',
      'Direito ao voto',
    ],
    correctAnswer: 1,
    explanation: 'O artigo 6º da CF/88 estabelece como direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, entre outros.',
    subject: 'Direito Constitucional',
    difficulty: 'easy',
    xpReward: 10,
    institution: 'VUNESP',
    year: 2024,
  },
  {
    id: '6',
    text: 'Sobre o processo administrativo disciplinar, é correto afirmar que:',
    options: [
      'Não é necessária a ampla defesa',
      'A comissão deve ser composta por, no mínimo, três servidores estáveis',
      'O prazo para conclusão é de 30 dias',
      'Não cabe recurso da decisão',
    ],
    correctAnswer: 1,
    explanation: 'A Lei 8.112/90 estabelece que a comissão do PAD deve ser composta por três servidores estáveis, garantindo a ampla defesa e o contraditório.',
    subject: 'Direito Administrativo',
    difficulty: 'medium',
    xpReward: 25,
    institution: 'FCC',
    year: 2023,
  },
  {
    id: '7',
    text: 'Em Língua Portuguesa, qual figura de linguagem está presente na frase: "O silêncio gritava na sala vazia"?',
    options: [
      'Metáfora',
      'Paradoxo',
      'Hipérbole',
      'Eufemismo',
    ],
    correctAnswer: 1,
    explanation: 'O paradoxo é a figura de linguagem que apresenta ideias contraditórias em um mesmo enunciado, como "silêncio" e "gritava".',
    subject: 'Língua Portuguesa',
    difficulty: 'medium',
    xpReward: 25,
    institution: 'CESPE',
    year: 2024,
  },
  {
    id: '8',
    text: 'Qual é o resultado da expressão: 2³ + 5² - 4 × 2?',
    options: [
      '25',
      '33',
      '17',
      '25',
    ],
    correctAnswer: 0,
    explanation: 'Seguindo a ordem das operações: 2³ = 8, 5² = 25, 4 × 2 = 8. Logo: 8 + 25 - 8 = 25.',
    subject: 'Matemática',
    difficulty: 'easy',
    xpReward: 10,
    institution: 'FGV',
    year: 2023,
  },
  {
    id: '9',
    text: 'Sobre a Lei de Acesso à Informação (LAI), é correto afirmar que:',
    options: [
      'Apenas jornalistas podem solicitar informações',
      'Qualquer pessoa pode solicitar acesso a informações públicas',
      'É necessário justificar o motivo da solicitação',
      'Apenas informações antigas podem ser solicitadas',
    ],
    correctAnswer: 1,
    explanation: 'A LAI (Lei 12.527/2011) garante que qualquer cidadão pode solicitar informações públicas sem necessidade de justificativa.',
    subject: 'Legislação',
    difficulty: 'easy',
    xpReward: 10,
    institution: 'VUNESP',
    year: 2024,
  },
  {
    id: '10',
    text: 'No contexto da Administração Pública, o que significa o princípio da eficiência?',
    options: [
      'Gastar o máximo possível do orçamento',
      'Alcançar os melhores resultados com os recursos disponíveis',
      'Contratar apenas servidores concursados',
      'Publicar todos os atos no Diário Oficial',
    ],
    correctAnswer: 1,
    explanation: 'O princípio da eficiência, incluído pela EC 19/98, determina que a Administração deve buscar os melhores resultados com os recursos disponíveis.',
    subject: 'Administração Pública',
    difficulty: 'medium',
    xpReward: 25,
    institution: 'FCC',
    year: 2023,
  },
];

// Função para obter questões aleatórias
export const getRandomQuestions = (count: number = 5): Question[] => {
  const shuffled = [...MOCK_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, MOCK_QUESTIONS.length));
};

// Função para obter questões por dificuldade
export const getQuestionsByDifficulty = (
  difficulty: Question['difficulty'],
  count: number = 5
): Question[] => {
  const filtered = MOCK_QUESTIONS.filter((q) => q.difficulty === difficulty);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, filtered.length));
};

// Função para obter questões por matéria
export const getQuestionsBySubject = (
  subject: string,
  count: number = 5
): Question[] => {
  const filtered = MOCK_QUESTIONS.filter((q) => q.subject === subject);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, filtered.length));
};
