declare module "@mojs/core" {
  type BurstOptions = Record<string, unknown>;

  export class Burst {
    constructor(options: BurstOptions);
    play(): this;
  }
}
