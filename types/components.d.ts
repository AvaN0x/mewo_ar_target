type BullsEye = {
  id: number;
  position: string | import('three').Vector3;
  rotation: string | import('three').Vector3;
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
  bullsEye: BullsEye;
  renderer: InstanceType<
    typeof import('~/components/EntityElementRenderer.vue').default
  >;
};

type GameStatus = 'playing' | 'gameOver';
