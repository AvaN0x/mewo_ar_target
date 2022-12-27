type BullsEye = {
  id: number;
  position: string;
  rotation: string;
  down: boolean;
};

type EntityElement = {
  instance: Vue;
  duration?: number;
  removeFunction?: Function;
};

type BullsEyeOnHit = {
  bullsEyeId: number;
  id: number;
  position: import('three').Vector3;
};

type GameBaseOnHit = Omit<BullsEyeOnHit, 'id'> & {
  circleId: number;
  points: number;
};

type GameStatus = 'playing' | 'gameOver';
