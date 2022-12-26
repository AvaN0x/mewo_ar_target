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
