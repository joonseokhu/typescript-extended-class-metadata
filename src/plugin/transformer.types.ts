import ts from 'typescript';

export interface ClassTransformerMetadata {
  properties: string[];
  methods: string[];
  decorators: ts.ModifierLike[];
}
