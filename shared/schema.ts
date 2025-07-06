import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  answers: jsonb("answers").notNull().$type<string[]>(),
  correctAnswerIndex: integer("correct_answer_index").notNull(),
  difficulty: text("difficulty").notNull().default("medium"),
  category: text("category").notNull().default("general"),
});

export const gameStates = pgTable("game_states", {
  id: serial("id").primaryKey(),
  playerId: text("player_id").notNull(),
  currentQuestionIndex: integer("current_question_index").notNull().default(0),
  playerScore: integer("player_score").notNull().default(0),
  abrahamScore: integer("abraham_score").notNull().default(0),
  playerLevel: integer("player_level").notNull().default(1),
  timeRemaining: integer("time_remaining").notNull().default(15),
  helpersUsed: jsonb("helpers_used").notNull().$type<{
    askAdam: boolean;
    askEve: boolean;
    skipsUsed: number;
  }>().default({ askAdam: false, askEve: false, skipsUsed: 0 }),
  isActive: boolean("is_active").notNull().default(true),
  abrahamTitle: text("abraham_title").notNull().default("Desert Walker"),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertGameStateSchema = createInsertSchema(gameStates).omit({
  id: true,
});

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type GameState = typeof gameStates.$inferSelect;
export type InsertGameState = z.infer<typeof insertGameStateSchema>;
