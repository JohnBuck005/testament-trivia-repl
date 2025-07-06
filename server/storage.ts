import { questions, gameStates, type Question, type InsertQuestion, type GameState, type InsertGameState } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Question methods
  getQuestion(id: number): Promise<Question | undefined>;
  getRandomQuestions(count: number): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Game state methods
  getGameState(playerId: string): Promise<GameState | undefined>;
  createGameState(gameState: InsertGameState): Promise<GameState>;
  updateGameState(playerId: string, updates: Partial<GameState>): Promise<GameState | undefined>;
  deleteGameState(playerId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedDatabase();
  }

  private async seedDatabase() {
    const existingQuestions = await db.select().from(questions).limit(1);
    if (existingQuestions.length > 0) {
      return; // Already seeded
    }

    const questionData = [
      // Isaiah Questions
      {
        text: "According to Isaiah 53:5, 'He was pierced for our...'",
        answers: ["sins", "transgressions", "iniquities", "wounds"],
        correctAnswerIndex: 1,
        difficulty: "medium",
        category: "Isaiah"
      },
      {
        text: "In Isaiah 40:31, what happens to those who wait on the Lord?",
        answers: ["They shall run and not be weary", "They shall mount up with wings like eagles", "They shall walk and not faint", "All of the above"],
        correctAnswerIndex: 3,
        difficulty: "medium",
        category: "Isaiah"
      },
      // Hebrews Questions  
      {
        text: "According to Hebrews 11:1, faith is the substance of things hoped for and the evidence of things...",
        answers: ["not seen", "not heard", "not understood", "not achieved"],
        correctAnswerIndex: 0,
        difficulty: "easy",
        category: "Hebrews"
      },
      {
        text: "Hebrews 4:12 says the word of God is sharper than any...",
        answers: ["sword", "two-edged sword", "spear", "arrow"],
        correctAnswerIndex: 1,
        difficulty: "medium",
        category: "Hebrews"
      },
      // Malachi Questions
      {
        text: "In Malachi 3:10, God challenges us to test Him in what?",
        answers: ["Prayer", "Faith", "Tithing", "Worship"],
        correctAnswerIndex: 2,
        difficulty: "medium",
        category: "Malachi"
      },
      {
        text: "According to Malachi 4:2, the Sun of Righteousness shall arise with what in His wings?",
        answers: ["Light", "Healing", "Power", "Glory"],
        correctAnswerIndex: 1,
        difficulty: "hard",
        category: "Malachi"
      },
      // Deep Bible Questions
      {
        text: "How many sons did Seth have according to Genesis 5:7?",
        answers: ["800 years worth", "Three named sons", "807 years of sons and daughters", "The Bible doesn't specify the exact number"],
        correctAnswerIndex: 3,
        difficulty: "hard",
        category: "Genesis"
      },
      {
        text: "In 1 Chronicles 1:1, who is listed as the first man?",
        answers: ["Adam", "Seth", "Enoch", "Noah"],
        correctAnswerIndex: 0,
        difficulty: "easy",
        category: "Chronicles"
      },
      {
        text: "According to Judges 12:6, what word could the Ephraimites not pronounce correctly?",
        answers: ["Shibboleth", "Sibboleth", "Ephraim", "Gilead"],
        correctAnswerIndex: 0,
        difficulty: "hard",
        category: "Judges"
      },
      {
        text: "In Ezekiel's vision, how many faces did each living creature have?",
        answers: ["Two", "Three", "Four", "Six"],
        correctAnswerIndex: 2,
        difficulty: "hard",
        category: "Ezekiel"
      },
      // Psalms Questions
      {
        text: "Complete Psalm 23:1: 'The Lord is my shepherd...'",
        answers: ["I shall not fear", "I shall not want", "I shall not fall", "I shall not doubt"],
        correctAnswerIndex: 1,
        difficulty: "easy",
        category: "Psalms"
      },
      {
        text: "According to Psalm 119, it is the longest chapter in the Bible. How many verses does it have?",
        answers: ["150", "176", "200", "144"],
        correctAnswerIndex: 1,
        difficulty: "hard",
        category: "Psalms"
      },
      // Proverbs Questions
      {
        text: "Proverbs 31 describes the virtuous woman. Her price is far above what?",
        answers: ["Gold", "Silver", "Rubies", "Pearls"],
        correctAnswerIndex: 2,
        difficulty: "medium",
        category: "Proverbs"
      },
      {
        text: "According to Proverbs 27:6, faithful are the wounds of a...",
        answers: ["friend", "teacher", "parent", "pastor"],
        correctAnswerIndex: 0,
        difficulty: "medium",
        category: "Proverbs"
      },
      // Daniel Questions
      {
        text: "How many times a day did Daniel pray?",
        answers: ["Once", "Twice", "Three times", "Seven times"],
        correctAnswerIndex: 2,
        difficulty: "medium",
        category: "Daniel"
      },
      {
        text: "What were the names of Daniel's three friends?",
        answers: ["Meshach, Shadrach, Abednego", "Shadrach, Meshach, Abednego", "Abednego, Shadrach, Meshach", "All are correct"],
        correctAnswerIndex: 3,
        difficulty: "easy",
        category: "Daniel"
      },
      // Revelation Questions
      {
        text: "In Revelation, how many churches receive letters?",
        answers: ["Five", "Six", "Seven", "Eight"],
        correctAnswerIndex: 2,
        difficulty: "medium",
        category: "Revelation"
      },
      {
        text: "According to Revelation 21:21, what are the gates of the New Jerusalem made of?",
        answers: ["Gold", "Silver", "Pearls", "Precious stones"],
        correctAnswerIndex: 2,
        difficulty: "hard",
        category: "Revelation"
      },
      // Romans Questions
      {
        text: "Romans 8:28 says all things work together for good to them that...",
        answers: ["believe", "love God", "are called according to His purpose", "love God and are called according to His purpose"],
        correctAnswerIndex: 3,
        difficulty: "medium",
        category: "Romans"
      },
      {
        text: "According to Romans 3:23, all have sinned and come short of the...",
        answers: ["love of God", "glory of God", "kingdom of God", "grace of God"],
        correctAnswerIndex: 1,
        difficulty: "easy",
        category: "Romans"
      },
      // 1 Corinthians Questions
      {
        text: "According to 1 Corinthians 13:13, what are the three things that abide?",
        answers: ["Faith, Hope, Love", "Faith, Hope, Charity", "Love, Joy, Peace", "Faith, Love, Joy"],
        correctAnswerIndex: 0,
        difficulty: "medium",
        category: "1 Corinthians"
      },
      // Matthew Questions
      {
        text: "In the Sermon on the Mount, Jesus said 'Blessed are the meek, for they shall inherit the...'",
        answers: ["kingdom", "earth", "riches", "glory"],
        correctAnswerIndex: 1,
        difficulty: "easy",
        category: "Matthew"
      },
      // John Questions
      {
        text: "Complete John 3:16: 'For God so loved the world that He gave His only begotten...'",
        answers: ["Son", "Child", "Lamb", "Savior"],
        correctAnswerIndex: 0,
        difficulty: "easy",
        category: "John"
      },
      // Philippians Questions
      {
        text: "According to Philippians 4:13, 'I can do all things through...'",
        answers: ["God who strengthens me", "Christ who strengthens me", "faith", "prayer"],
        correctAnswerIndex: 1,
        difficulty: "easy",
        category: "Philippians"
      },
      // Ecclesiastes Questions
      {
        text: "Ecclesiastes 3:1 says 'To every thing there is a...'",
        answers: ["purpose", "season", "time", "reason"],
        correctAnswerIndex: 1,
        difficulty: "medium",
        category: "Ecclesiastes"
      }
    ];

    try {
      for (const question of questionData) {
        await db.insert(questions).values(question);
      }
      console.log('Database seeded with diverse biblical questions');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question || undefined;
  }

  async getRandomQuestions(count: number): Promise<Question[]> {
    const allQuestions = await db.select().from(questions);
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const [question] = await db
      .insert(questions)
      .values(insertQuestion)
      .returning();
    return question;
  }

  async getGameState(playerId: string): Promise<GameState | undefined> {
    const [gameState] = await db.select().from(gameStates).where(eq(gameStates.playerId, playerId));
    return gameState || undefined;
  }

  async createGameState(insertGameState: InsertGameState): Promise<GameState> {
    const [gameState] = await db
      .insert(gameStates)
      .values(insertGameState)
      .returning();
    return gameState;
  }

  async updateGameState(playerId: string, updates: Partial<GameState>): Promise<GameState | undefined> {
    const [gameState] = await db
      .update(gameStates)
      .set(updates)
      .where(eq(gameStates.playerId, playerId))
      .returning();
    return gameState || undefined;
  }

  async deleteGameState(playerId: string): Promise<boolean> {
    const result = await db.delete(gameStates).where(eq(gameStates.playerId, playerId));
    return result.rowCount > 0;
  }
}

export class MemStorage implements IStorage {
  private questions: Map<number, Question>;
  private gameStates: Map<string, GameState>;
  private currentQuestionId: number;
  private currentGameStateId: number;

  constructor() {
    this.questions = new Map();
    this.gameStates = new Map();
    this.currentQuestionId = 1;
    this.currentGameStateId = 1;
    this.seedQuestions();
  }

  private seedQuestions() {
    const questionData = [
      {
        text: "Who was the father of Isaac?",
        answers: ["Moses", "Abraham", "Jacob", "David"],
        correctAnswerIndex: 1,
        difficulty: "easy",
        category: "patriarchs"
      },
      {
        text: "How many days did God take to create the world?",
        answers: ["5 days", "6 days", "7 days", "8 days"],
        correctAnswerIndex: 1,
        difficulty: "easy",
        category: "creation"
      },
      {
        text: "Who built the ark?",
        answers: ["Moses", "Noah", "David", "Solomon"],
        correctAnswerIndex: 1,
        difficulty: "easy",
        category: "old-testament"
      }
    ];

    questionData.forEach(q => {
      const id = this.currentQuestionId++;
      const question: Question = { ...q, id };
      this.questions.set(id, question);
    });
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async getRandomQuestions(count: number): Promise<Question[]> {
    const allQuestions = Array.from(this.questions.values());
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }

  async getGameState(playerId: string): Promise<GameState | undefined> {
    return this.gameStates.get(playerId);
  }

  async createGameState(insertGameState: InsertGameState): Promise<GameState> {
    const id = this.currentGameStateId++;
    const gameState: GameState = { 
      ...insertGameState, 
      id,
      currentQuestionIndex: insertGameState.currentQuestionIndex ?? 0,
      playerScore: insertGameState.playerScore ?? 0,
      abrahamScore: insertGameState.abrahamScore ?? 0,
      playerLevel: insertGameState.playerLevel ?? 1,
      timeRemaining: insertGameState.timeRemaining ?? 15,
      helpersUsed: insertGameState.helpersUsed ?? { askAdam: false, askEve: false, skipsUsed: 0 },
      isActive: insertGameState.isActive ?? true,
      abrahamTitle: insertGameState.abrahamTitle ?? "Desert Walker"
    };
    this.gameStates.set(insertGameState.playerId, gameState);
    return gameState;
  }

  async updateGameState(playerId: string, updates: Partial<GameState>): Promise<GameState | undefined> {
    const existing = this.gameStates.get(playerId);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.gameStates.set(playerId, updated);
    return updated;
  }

  async deleteGameState(playerId: string): Promise<boolean> {
    return this.gameStates.delete(playerId);
  }
}

export const storage = new DatabaseStorage();