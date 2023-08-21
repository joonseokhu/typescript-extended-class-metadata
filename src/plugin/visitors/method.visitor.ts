import ts from 'typescript';
import { MetaName } from '../../lib';
import { MethodMetadata, ValueTypeMetadata } from '../metadata';
import { serializeValue } from '../serializer';
import { Visitor } from './visitor.abstract';

export class MethodVisitor extends Visitor<ts.MethodDeclaration> {
  private update() {
    return this.context.factory.updateMethodDeclaration(
      this.node,
      [
        ...ts.getModifiers(this.node) ?? [],
        ...ts.getDecorators(this.node) ?? [],
        ...this.decorators,
      ],
      this.node.asteriskToken,
      this.node.name,
      this.node.questionToken,
      this.node.typeParameters,
      this.node.parameters,
      this.node.type,
      this.node.body,
    );
  }

  private parseMethodMetadata() {
    const methodMetadata = new MethodMetadata(this.node, this.type);

    this.addDecorator(MetaName.Method, methodMetadata.serialize());
  }

  private parseParamTypes() {
    const paramTypes = this.node.parameters.map((parameter) => {
      const parameterType = this.program.getTypeChecker().getTypeAtLocation(parameter);
      return new ValueTypeMetadata(parameter, parameterType).serialize();
    });

    this.addDecorator(MetaName.ParamTypes, serializeValue.asArray(paramTypes));
  }

  private parseReturnType() {
    const returnType = this.type.getCallSignatures()[0].getReturnType();
    const metadata = new ValueTypeMetadata(this.node, returnType);

    this.addDecorator(MetaName.ReturnType, metadata.serialize());
  }

  visit(): ts.MethodDeclaration {
    this.parseMethodMetadata();
    this.parseParamTypes();
    this.parseReturnType();

    return this.update();
  }
}
