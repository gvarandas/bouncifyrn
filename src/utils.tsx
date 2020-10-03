import React from 'react';
import {
  Colors,
  GameState,
  Sizing,
  CollisionDetection,
  GameMode,
} from './config';
import {Floor, ScoreBar, Ball, SpeedUpButton} from './renderers';
import {ColorValue, Dimensions} from 'react-native';

export interface Position {
  x: number;
  y: number;
}

export interface FloorEntity {
  total_hits: number;
  height: number;
  current_hits: number;
  renderer: React.ReactNode;
}

export interface ScoreBarEntity {
  height: number;
  best: number;
  mode: GameMode;
  state: GameState;
  level: number;
  balls: number;
  new_balls: number;
  balls_in_play: number;
  score: number;
  renderer: React.ReactNode;
  balls_returned: number;
}

export interface BallEntity {
  color: ColorValue;
  state: GameState;
  start: Position;
  position: Position;
  speed: Position;
  direction: Position;
  renderer: React.ReactNode;
}

export interface SpeedButtonEntity {
  available: boolean;
  speed: number;
  row: number;
  column: number;
  renderer: React.ReactNode;
}

export interface BoxEntity {
  row: number;
  col: number;
  type?: string;
  explode: boolean;
  explosionComplete: boolean;
  falling?: boolean;
  collecting?: boolean;
  hits: number;
  renderer: React.ReactNode;
  slidePosition: number;
}

export type GameEntities = {
  [key: string]: FloorEntity | ScoreBarEntity | SpeedButtonEntity | BallEntity;
};

const utils = {
  getDistance: function (p1: Position, p2: Position) {
    return Math.sqrt(
      Math.abs(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
    );
  },

  getPointsDeltas: function (p1: Position, p2: Position): Position {
    return {x: p2.x - p1.x, y: p2.y - p1.y};
  },

  clonePosition: function (position: Position): Position {
    return {x: position.x, y: position.y};
  },

  newPosition: function (x_val: number, y_val: number): Position {
    return {x: x_val, y: y_val};
  },

  randomValue: function (min: number, max: number) {
    return Math.random() * (max - min) + min;
  },

  randomValueRounded: function (min: number, max: number) {
    return Math.round(utils.randomValue(min, max));
  },

  randomRoll: function (percent: number) {
    return utils.randomValueRounded(1, 100) <= percent;
  },

  randomKey: function () {
    return (Math.random() + 1).toString(36).substring(7);
  },

  colToLeftPosition: function (col: number) {
    return (
      Sizing.BOX_TILE_SPACE +
      (col * Sizing.BOX_TILE_SPACE + col * Sizing.BOX_TILE_SIZE)
    );
  },

  rowToTopPosition: function (row: number) {
    return (
      Sizing.SCOREBOARD_HEIGHT +
      Sizing.BOX_TILE_SPACE +
      (row * Sizing.BOX_TILE_SPACE + row * Sizing.BOX_TILE_SIZE)
    );
  },

  hitsToColor: function (hits: number) {
    if (hits <= 10) {
      return Colors.YELLOW;
    } else if (hits <= 20) {
      return Colors.GREEN;
    } else if (hits <= 30) {
      return Colors.RED;
    } else if (hits <= 50) {
      return Colors.LIGHT_BLUE;
    } else if (hits <= 99) {
      return Colors.DARK_BLUE;
    } else if (hits <= 150) {
      return Colors.PURPLE;
    }
    return Colors.TEAL;
  },

  newGameEntities: (topScore: number, mode: GameMode): GameEntities => {
    return {
      floor: {
        current_hits: 0,
        total_hits: 0,
        height: Sizing.FLOOR_HEIGHT,
        renderer: Floor,
      },
      scorebar: {
        height: Sizing.SCOREBOARD_HEIGHT,
        best: topScore,
        mode: mode,
        state: GameState.STOPPED,
        level: 0,
        balls: 1,
        new_balls: 0,
        balls_in_play: 0,
        score: 0,
        renderer: ScoreBar,
        balls_returned: 0,
      },
      speedbutton: {
        available: false,
        speed: 1,
        row: 0,
        column: 7,
        renderer: SpeedUpButton,
      },
      ball: {
        color: 'white',
        state: GameState.STOPPED,
        start: utils.newPosition(300, Sizing.FLOOR_HEIGHT - Sizing.RADIUS * 2),
        position: utils.newPosition(
          300,
          Sizing.FLOOR_HEIGHT - Sizing.RADIUS * 2
        ),
        speed: utils.newPosition(1.0, 1.0),
        direction: utils.newPosition(0, 0),
        renderer: Ball,
      },
    };
  },

  initializeGameSizing: () => {
    // TODO: Refactor this method to share values via a Context API instead
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    Sizing.FLOOR_HEIGHT = height - Sizing.FLOOR_HEIGHT_SIZE;
    Sizing.BOX_TILE_SIZE =
      (width - (CollisionDetection.COLUMNS + 1) * Sizing.BOX_TILE_SPACE) /
      CollisionDetection.COLUMNS;
    // top and bottom rows can't have boxes so subtract 2 from available space
    CollisionDetection.ROWS =
      Math.floor(
        (Sizing.FLOOR_HEIGHT - Sizing.SCOREBOARD_HEIGHT) /
          (Sizing.BOX_TILE_SIZE + Sizing.BOX_TILE_SPACE)
      ) - 2;
  },
};

export default utils;
