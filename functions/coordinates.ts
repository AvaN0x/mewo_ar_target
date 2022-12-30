import { Vector3 } from 'three';

export const generatePositionAndRotationWithAngle = (
  distance: number,
  angle: number,
  origin: Vector3 = new Vector3(0, 0, 0)
): { position: Vector3; rotation: Vector3 } => {
  // angle is in degrees
  const rad = angle * (Math.PI / 180);
  const x = origin.x + distance * Math.sin(rad);
  const z = origin.z + distance * Math.cos(rad);

  const position = new Vector3(x, origin.y, z);
  const rotation = new Vector3(0, angle, 0);

  return { position, rotation };
};
