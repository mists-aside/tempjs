export class Y {
  private x: string;

  constructor(x: string) {
    this.x = x;
  }

  get foo(): string {
    return this.x;
  }
}
