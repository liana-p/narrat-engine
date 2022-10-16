export interface Vector2 {
  x: number;
  y: number;
}

export namespace Vec2 {
  export function create(x?: number, y?: number) {
    return {
      x: x ?? 0,
      y: y ?? 0,
    };
  }
  export function magnitude(v: Vector2) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
  export function normalize(v: Vector2) {
    const mag = magnitude(v);
    if (mag === 0) {
      return create(0, 0);
    }
    return {
      x: v.x / mag,
      y: v.y / mag,
    };
  }
  export function add(a: Vector2, b: Vector2) {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
    };
  }
  export function subtract(a: Vector2, b: Vector2) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
    };
  }
  export function multiply(a: Vector2, b: Vector2) {
    return {
      x: a.x * b.x,
      y: a.y * b.y,
    };
  }
  export function scale(v: Vector2, s: number) {
    return {
      x: v.x * s,
      y: v.y * s,
    };
  }
  export function divide(a: Vector2, b: Vector2) {
    return {
      x: a.x / b.x,
      y: a.y / b.y,
    };
  }
  export function distance(a: Vector2, b: Vector2) {
    return magnitude(subtract(a, b));
  }
  export function lerp(a: Vector2, b: Vector2, t: number) {
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
    };
  }
  export function rotate(v: Vector2, angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: v.x * cos - v.y * sin,
      y: v.x * sin + v.y * cos,
    };
  }
}
