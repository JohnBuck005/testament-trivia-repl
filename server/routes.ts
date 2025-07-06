import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameStateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get random questions for a new game
  app.get("/api/questions/random/:count", async (req, res) => {
    try {
      const count = parseInt(req.params.count);
      if (isNaN(count) || count <= 0 || count > 50) {
        return res.status(400).json({ message: "Invalid count parameter" });
      }
      
      const questions = await storage.getRandomQuestions(count);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Get game state for a player
  app.get("/api/game-state/:playerId", async (req, res) => {
    try {
      const gameState = await storage.getGameState(req.params.playerId);
      if (!gameState) {
        return res.status(404).json({ message: "Game state not found" });
      }
      res.json(gameState);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game state" });
    }
  });

  // Create new game state
  app.post("/api/game-state", async (req, res) => {
    try {
      const validatedData = insertGameStateSchema.parse(req.body);
      const gameState = await storage.createGameState(validatedData);
      res.status(201).json(gameState);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game state data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create game state" });
    }
  });

  // Update game state
  app.patch("/api/game-state/:playerId", async (req, res) => {
    try {
      const updates = req.body;
      const gameState = await storage.updateGameState(req.params.playerId, updates);
      if (!gameState) {
        return res.status(404).json({ message: "Game state not found" });
      }
      res.json(gameState);
    } catch (error) {
      res.status(500).json({ message: "Failed to update game state" });
    }
  });

  // Delete game state
  app.delete("/api/game-state/:playerId", async (req, res) => {
    try {
      const deleted = await storage.deleteGameState(req.params.playerId);
      if (!deleted) {
        return res.status(404).json({ message: "Game state not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete game state" });
    }
  });

  // Get Abraham's witty response
  app.post("/api/abraham/response", async (req, res) => {
    try {
      const { isCorrect, questionText } = req.body;
      
      const titles = [
        "Burnt Offering",
        "Desert Walker", 
        "Camel Rider",
        "Old Prophet",
        "Dusk Fisherman"
      ];
      
      const correctResponses = [
        "Even the stars know that answer!",
        "As clear as the desert sky.",
        "My camels could answer that one.",
        "The Lord whispered that to me years ago.",
        "Older than the sands, easier than breathing."
      ];
      
      const incorrectResponses = [
        "Perhaps more time in the scriptures?",
        "The desert teaches patience, young one.",
        "Even my camels look confused.",
        "The Lord works in mysterious ways... unlike that answer.",
        "I've seen burning bushes make better guesses."
      ];
      
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const responses = isCorrect ? correctResponses : incorrectResponses;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      res.json({
        title: randomTitle,
        response: randomResponse
      });
    } catch (error) {
      res.status(500).json({ message: "Abraham is taking a nap" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
