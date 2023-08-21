import ts from 'typescript';
import { serializeValue } from '../serializer';
import { MemberMetadata } from './member.metadata';

export class MethodMetadata extends MemberMetadata<ts.MethodDeclaration> {
  getProperties() {
    return super.getProperties();
  }
}
