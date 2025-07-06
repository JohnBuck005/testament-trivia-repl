import { questions, gameStates, type Question, type InsertQuestion, type GameState, type InsertGameState } from "@shared/schema";

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
    const questionData: Omit<Question, 'id'>[] = [
      {
        text: "Who was the father of Isaac?",
        answers: ["Jacob", "Adam", "Abraham", "Moses"],
        correctAnswerIndex: 2,
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
      },
      {
        text: "What was the name of Moses' brother?",
        answers: ["Aaron", "Joshua", "Caleb", "Samuel"],
        correctAnswerIndex: 0,
        difficulty: "medium",
        category: "old-testament"
      },
      {
        text: "In which city was Jesus born?",
        answers: ["Jerusalem", "Nazareth", "Bethlehem", "Capernaum"],
        correctAnswerIndex: 2,
        difficulty: "easy",
        category: "new-testament"
      },
      {
        text: "How many apostles did Jesus have?",
        answers: ["10", "11", "12", "13"],
        correctAnswerIndex: 2,
        difficulty: "easy",
        category: "new-testament"
      },
      {
        text: "Who was swallowed by a great fish?",
        answers: ["Jonah", "Job", "Jeremiah", "Joel"],
        correctAnswerIndex: 0,
        difficulty: "medium",
        category: "old-testament"
      },
      {
        text: "What did God give Moses on Mount Sinai?",
        answers: ["The Torah", "The Ten Commandments", "The Ark", "A burning bush"],
        correctAnswerIndex: 1,
        difficulty: "medium",
        category: "old-testament"
      },
      {
        text: "Who was the strongest man in the Bible?",
        answers: ["David", "Goliath", "Samson", "Solomon"],
        correctAnswerIndex: 2,
        difficulty: "medium",
        category: "old-testament"
      },
      {
        text: "What was the first plague in Egypt?",
        answers: ["Frogs", "Water to blood", "Locusts", "Darkness"],
        correctAnswerIndex: 1,
        difficulty: "hard",
        category: "old-testament"
      }
    ];

    questionData.forEach(q => {
      const question: Question = { ...q, id: this.currentQuestionId++ };
      this.questions.set(question.id, question);
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
    const gameState: GameState = { ...insertGameState, id };
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

export const storage = new MemStorage();
