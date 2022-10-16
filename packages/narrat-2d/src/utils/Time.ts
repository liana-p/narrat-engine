export class Time {
  public lastTime: number = 0;
  public deltaTime: number = 0;
  public time: number = 0;
  public startTime: number = 0;

  public start() {
    this.startTime = Date.now() / 1000;
    this.lastTime = Date.now() / 1000;
  }

  public beforeUpdate() {
    const now = Date.now() / 1000;
    this.deltaTime = now - this.lastTime;
    this.time = now - this.startTime;
    this.lastTime = now;
  }
}
