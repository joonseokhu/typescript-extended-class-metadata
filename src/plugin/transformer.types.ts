import { ClassMethodMetadata, ClassPropertyMetadata } from './metadata.types';

export interface ClassTransformerMetadata {
  properties: ClassPropertyMetadata[];
  methods: ClassMethodMetadata[];
}
