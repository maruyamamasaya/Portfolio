import type { Process } from 'node:process';
import type { Buffer as NodeBuffer } from 'node:buffer';

declare const process: Process;
declare const Buffer: typeof NodeBuffer;

declare module '*';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: Record<string, unknown>;
  }
}
