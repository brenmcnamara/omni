import * as t from 'io-ts';
import tStringSerialize from './tSerialize/tStringSerialize';

export type DocumentContent = string;

export const tSerialize = tStringSerialize;
