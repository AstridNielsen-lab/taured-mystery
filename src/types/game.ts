export interface GameState {
  day: number;
  trustGovernment: number; // -10 a +10
  interdimensionalTheory: number; // 0 a 100
  conspiracyLevel: number; // 0 a 100
  playerSanity: number; // 100 a 0
  timelineDistortion: number; // 0 a 100
  identityCrisis: number; // 0 a 100
}

export interface Player {
  name: string;
  currentLocation: Location;
  discoveredClues: Clue[];
  investigationLog: LogEntry[];
  toolsAvailable: Record<Tool, boolean>;
}

export interface Clue {
  id: string;
  name: string;
  description: string;
  location: Location;
  discoveredAt: Date;
  category: ClueCategory;
}

export type ClueCategory = 
  | 'dimensional'
  | 'government'
  | 'witness'
  | 'document'
  | 'artifact'
  | 'temporal'
  | 'evidence'
  | 'analysis'
  | 'theory'
  | 'cases'
  | 'identity';

export interface LogEntry {
  id: string;
  timestamp: Date;
  location: Location;
  action: string;
  result: string;
  cluesFound: string[];
}

export type Location = 
  | 'orion_base'
  | 'tokyo_airport_1954'
  | 'hotel_room'
  | 'government_archive'
  | 'paris_cafe'
  | 'barcelona_bar'
  | 'conspiracy_room'
  | 'temporal_portal';

export type Tool = 
  | 'multiversal_database'
  | 'temporal_analyzer'
  | 'document_decoder'
  | 'timeline_simulator'
  | 'investigation_diary'
  | 'expanded_reality'
  | 'orion_net'
  | 'contradiction_detector'
  | 'portable_lab'
  | 'report_generator'
  | 'encyclopedia';

export interface LocationData {
  id: Location;
  name: string;
  description: string;
  available: boolean;
  unlockCondition?: (gameState: GameState, clues: Clue[]) => boolean;
}

export interface ToolData {
  id: Tool;
  name: string;
  description: string;
  available: boolean;
  unlockCondition?: (gameState: GameState, clues: Clue[]) => boolean;
}

export interface Choice {
  id: string;
  text: string;
  action: () => GameActionResult;
  available?: boolean;
  condition?: (gameState: GameState, clues: Clue[]) => boolean;
}

export interface GameActionResult {
  success: boolean;
  message: string;
  cluesFound?: Clue[];
  stateChanges?: Partial<GameState>;
  newChoices?: Choice[];
  toolUnlocked?: Tool;
  locationUnlocked?: Location;
}

export type GameEnding = 
  | 'parallel_dimension'
  | 'government_experiment'
  | 'simulation'
  | 'player_is_taured'
  | 'mystery_remains';

export interface EndingCondition {
  id: GameEnding;
  name: string;
  description: string;
  condition: (gameState: GameState, clues: Clue[]) => boolean;
  priority: number;
}

export interface Investigation {
  title: string;
  description: string;
  choices: Choice[];
  background?: string;
  requiredTool?: Tool;
}

