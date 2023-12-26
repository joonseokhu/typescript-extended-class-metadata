import ts from 'typescript';
import { MetaName } from '../lib';

export interface ClassTransformerMetadata {
  properties: string[];
  methods: string[];
  decorators: ts.ModifierLike[];
  metadata: Record<string, Partial<Record<MetaName, ts.Expression>>>;
}
