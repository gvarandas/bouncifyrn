export enum CollisionDetection {
  NO_COLLISION = 0,
  SIDE = 1,
  TOP_BOTTOM = 2,
  ROWS = 10,
  COLUMNS = 8,
}

export enum Sizing {
  RADIUS = 7,
  SCOREBOARD_HEIGHT = 90,
  BOX_TILE_SIZE = 40,
  BOX_TILE_SPACE = 6,
  FLOOR_HEIGHT = 640,
  FLOOR_HEIGHT_SIZE = 172,
  // 8x9 on most screens, but have to check
}

export enum GameMode {
  MODE_LINES = 100,
  MODE_BRICKS = 200,
}

export enum GameState {
  MOVING = 100,
  STOPPED = 200,
  STARTED = 300,
}

export enum Colors {
  YELLOW = '#DFB44F', // yellow 1-10
  GREEN = '#8CB453', // green 11-20
  RED = '#EA225E', // red 21-30,
  LIGHT_BLUE = '#59B9F9', // light blue 31-50,
  DARK_BLUE = '#265BF6', // darker blue 51-99,
  PURPLE = '#7112F5', // purple 100-150
  TEAL = '#449b8e', // dull green 151+
}

export const FLOOR_BOX_POSITION =
  Sizing.FLOOR_HEIGHT - Sizing.BOX_TILE_SIZE + 10;
