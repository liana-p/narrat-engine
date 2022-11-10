import {
  CircleShape,
  ColliderComponent,
  RectangleShape,
} from '@/components/ColliderComponent';
import { GameObject } from '@/scene/GameObject';
import { error, Vec2, Vector2 } from 'narrat';
import { Scene } from '../scene/Scene';

let layerNames: string[] = ['default'];

let collisionLayers: number[][] = [];

export function createCollisionMatrix(
  newLayerNames: string[],
  layers: { [key: string]: string[] },
) {
  const collisionMatrix = [];
  layerNames = newLayerNames;
  for (const key in layers) {
    const collisionLayer: number[] = [];
    const collidingLayers = layers[key];
    let layerIndex = layerNames.indexOf(key);
    if (layerIndex === -1) {
      error(`Layer ${key} does not exist`);
      layerIndex = 0;
    }
    collisionMatrix[layerIndex] = collisionLayer;
    for (const layer of collidingLayers) {
      const layerIndex = layerNames.indexOf(layer);
      if (layerIndex === -1) {
        error(`Layer ${layer} does not exist`);
        continue;
      }
      collisionLayer.push(layerIndex);
    }
  }
  return collisionMatrix;
}

export function processEntities(scene: Scene) {
  const allObjects = Object.values(scene.allObjects).filter((obj) =>
    obj.hasComponent(ColliderComponent.type),
  );

  for (const obj of allObjects) {
    const testCollider = obj.getComponent<ColliderComponent>(
      ColliderComponent.type,
    )!;
    if (testCollider.isTrigger) {
      continue;
    }
    const collidingWith = findWhatEntityCollidesWith(testCollider, allObjects);
    let collided = false;
    for (const hitObject of collidingWith) {
      const collider = hitObject.getComponent<ColliderComponent>(
        ColliderComponent.type,
      )!;
      if (collider.isTrigger) {
        testCollider.onTriggerEnter(hitObject);
      } else {
        collided = true;
        console.log(
          `Collision happened. Position: [${obj.position.x}][${obj.position.y}], last: [${testCollider.lastPosition.x}][${testCollider.lastPosition.y}]`,
        );
        // Revert the position, since we collided
        // testCollider.gameObject.setPosition(testCollider.lastPosition);
        if (collider.shape === 'rectangle') {
          const motion = testCollider.getMotion();
          const collidedWall = findCollidedWall(motion, testCollider, collider);
          // const newPosition = findIntersection(
          //   testCollider.gameObject.node.getGlobalPosition(),
          //   motion,
          //   collidedWall[0],
          //   collidedWall[1],
          // );
          const newMotion = slideWalk(motion, collidedWall[0], collidedWall[1]);
          testCollider.gameObject.setPosition(
            Vec2.add(testCollider.gameObject.getPosition(), newMotion),
          );
        }
        testCollider.onCollisionEnter(hitObject);
      }
    }
    if (!collided) {
      testCollider.gameObject.setPosition(
        Vec2.add(
          testCollider.gameObject.getPosition(),
          testCollider.getMotion(),
        ),
      );
    }
  }
  for (const obj of allObjects) {
    obj.getComponent<ColliderComponent>(ColliderComponent.type)!.lastPosition =
      Vec2.create(obj.position.x, obj.position.y);
  }
}

export function findWhatEntityCollidesWith(
  testCollider: ColliderComponent,
  allColliders: GameObject[],
): GameObject[] {
  const collidableLayers = collisionLayers[testCollider.gameObject.layer] ?? [];
  if (collidableLayers.length <= 0) {
    return [];
  }
  const objectsToCheckCollisionsFor = allColliders.filter((otherObj) => {
    return (
      otherObj !== testCollider.gameObject &&
      collidableLayers.includes(otherObj.layer)
    );
  });
  return objectsToCheckCollisionsFor.filter((otherObj) => {
    const bCollider = otherObj.getComponent<ColliderComponent>(
      ColliderComponent.type,
    )!;
    return isColliding(
      testCollider.getColliderPosition(),
      bCollider.getColliderPosition(),
      testCollider,
      bCollider,
    );
  });
}

export function setCollisionMatrix(matrix: number[][]) {
  collisionLayers = matrix;
}

export function isColliding(
  aPos: Vector2,
  bPos: Vector2,
  colliderA: ColliderComponent,
  colliderB: ColliderComponent,
) {
  if (colliderA.shape === 'circle') {
    if (colliderB.shape === 'circle') {
      return circleToCircleCollision(aPos, bPos, colliderA, colliderB);
    } else if (colliderB.shape === 'rectangle') {
      return rectangleToCircleCollision(bPos, aPos, colliderB, colliderA);
    }
  } else if (colliderA.shape === 'rectangle') {
    if (colliderB.shape === 'circle') {
      return rectangleToCircleCollision(aPos, bPos, colliderA, colliderB);
    } else if (colliderB.shape === 'rectangle') {
      return rectangleToRectangleCollision(aPos, bPos, colliderA, colliderB);
    }
  }
}

export function circleToCircleCollision(
  aPos: Vector2,
  bPos: Vector2,
  colliderA: ColliderComponent,
  colliderB: ColliderComponent,
): boolean {
  const dimensionsA = colliderA.dimensions as CircleShape;
  const dimensionsB = colliderB.dimensions as CircleShape;
  const distance = Vec2.distance(aPos, bPos);
  return distance < dimensionsA.radius + dimensionsB.radius;
}

export function rectangleToRectangleCollision(
  aPos: Vector2,
  bPos: Vector2,
  rectangleA: ColliderComponent,
  rectangleB: ColliderComponent,
): boolean {
  const dimensionsA = rectangleA.dimensions as RectangleShape;
  const dimensionsB = rectangleB.dimensions as RectangleShape;
  // Perform aabb collision test between the two rectangles
  return (
    aPos.x < bPos.x + dimensionsB.width &&
    aPos.x + dimensionsA.width > bPos.x &&
    aPos.y < bPos.y + dimensionsB.height &&
    aPos.y + dimensionsA.height > bPos.y
  );
}

export function rectangleToCircleCollision(
  recPos: Vector2,
  circlePos: Vector2,
  rectangle: ColliderComponent,
  circle: ColliderComponent,
): boolean {
  // Perform collision test between a rectangle and a circle
  const recDimensions = rectangle.dimensions as RectangleShape;
  const circleDimensions = circle.dimensions as CircleShape;
  // Step#1: Find the vertical & horizontal (distX/distY) distances between the circle’s center and the rectangle’s center
  const distX = Math.abs(circlePos.x - recPos.x - recDimensions.width / 2);
  const distY = Math.abs(circlePos.y - recPos.y - recDimensions.height / 2);
  // Step#2: If the distance is greater than halfCircle + halfRect, then they are too far apart to be colliding
  if (distX > recDimensions.width / 2 + circleDimensions.radius) {
    return false;
  }
  if (distY > recDimensions.height / 2 + circleDimensions.radius) {
    return false;
  }
  // Step#3: If the distance is less than halfRect then they are definitely colliding
  if (distX <= recDimensions.width / 2) {
    return true;
  }
  if (distY <= recDimensions.height / 2) {
    return true;
  }
  const dx = distX - recDimensions.width / 2;
  const dy = distY - recDimensions.height / 2;
  return dx * dx + dy * dy <= circleDimensions.radius * circleDimensions.radius;
}

export function slideWalk(
  motion: Vector2,
  wall1: Vector2,
  wall2: Vector2,
): Vector2 {
  const normal = Vec2.normal(wall1, wall2);
  const dot = Vec2.dot(motion, normal);
  const newMotion = Vec2.subtract(motion, Vec2.scale(normal, dot));
  return newMotion;
}
// export function findIntersection(
//   player: Vector2,
//   motion: Vector2,
//   wall1: Vector2,
//   wall2: Vector2,
// ) {
//   return Vec2.create(
//     -(
//       motion.x * (wall1.x * wall2.y - wall1.y * wall2.x) +
//       motion.x * player.y * (wall2.x - wall1.x) +
//       motion.y * player.x * (wall1.x - wall2.x)
//     ) /
//       (motion.x * (wall1.y - wall2.y) + motion.y * (wall2.x - wall1.x)),

//     -(
//       motion.y * (wall1.x * wall2.y - wall1.y * wall2.x) +
//       motion.x * player.y * (wall2.y - wall1.y) +
//       motion.y * player.x * (wall1.y - wall2.y)
//     ) /
//       (motion.x * (wall1.y - wall2.y) + motion.y * (wall2.x - wall1.x)),
//   );
// }

export function findCollidedWall(
  motion: Vector2,
  collider: ColliderComponent,
  wall: ColliderComponent,
): [Vector2, Vector2] {
  const dimensions = wall.dimensions as RectangleShape;
  const topLeft = wall.getColliderPosition();
  const topRight = Vec2.create(topLeft.x + dimensions.width, topLeft.y);
  const bottomLeft = Vec2.create(topLeft.x, topLeft.y + dimensions.height);
  const bottomRight = Vec2.create(
    topLeft.x + dimensions.width,
    topLeft.y + dimensions.height,
  );

  const xMovement = Vec2.create(motion.x, 0);
  const yMovement = Vec2.create(0, motion.y);
  const newX = Vec2.add(
    collider.gameObject.node.getGlobalPosition(),
    xMovement,
  );
  const newY = Vec2.add(
    collider.gameObject.node.getGlobalPosition(),
    yMovement,
  );
  const xCollision = isColliding(newX, topLeft, collider, wall);
  if (xCollision) {
    if (motion.x > 0) {
      return [topLeft, bottomLeft];
    } else {
      return [topRight, bottomRight];
    }
  } else {
    const yCollision = isColliding(newY, topLeft, collider, wall);
    if (yCollision) {
      if (motion.y > 0) {
        return [topLeft, topRight];
      } else {
        return [bottomLeft, bottomRight];
      }
    }
  }
  return [topLeft, topRight];
}
