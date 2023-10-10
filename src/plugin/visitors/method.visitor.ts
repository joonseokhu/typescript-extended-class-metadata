import ts from 'typescript';
import { MetaName } from '../../lib';
import { MethodMetadata, ValueTypeMetadata } from '../metadata';
import { serializeValue } from '../serializer';
import { Visitor } from './visitor.abstract';

export class MethodVisitor extends Visitor<ts.MethodDeclaration> {
  private update(node: ts.MethodDeclaration, decorators: ts.Decorator[]) {
    return this.context.factory.updateMethodDeclaration(
      node,
      [
        ...ts.getModifiers(node) ?? [],
        ...ts.getDecorators(node) ?? [],
        ...decorators,
      ],
      node.asteriskToken,
      node.name,
      node.questionToken,
      node.typeParameters,
      node.parameters,
      node.type,
      node.body,
    );
  }

  private parseMethodMetadata(node: ts.MethodDeclaration) {
    const methodMetadata = new MethodMetadata(
      node,
      this.getType(node),
      this.program,
      this.context,
    );

    // MetaName.Method
    return methodMetadata.serialize();
  }

  private parseParamTypes(node: ts.MethodDeclaration) {
    const paramTypes = node.parameters.map((parameter) => {
      const parameterType = this.program.getTypeChecker().getTypeAtLocation(parameter);
      return new ValueTypeMetadata(
        parameter,
        parameterType,
        this.program,
        this.context,
      ).serialize();
    });

    // MetaName.ParamTypes
    return serializeValue.asArray(paramTypes);
  }

  private parseReturnType(node: ts.MethodDeclaration) {
    const returnType = this.getType(node).getCallSignatures()[0].getReturnType();
    const metadata = new ValueTypeMetadata(
      node,
      returnType,
      this.program,
      this.context,
    );

    // MetaName.ReturnType
    return metadata.serialize();
  }

  visit(node: ts.MethodDeclaration): ts.MethodDeclaration {
    const [decorators, addDecorator] = this.useDecorators();

    addDecorator(MetaName.Method, this.parseMethodMetadata(node));
    addDecorator(MetaName.ParamTypes, this.parseParamTypes(node));
    addDecorator(MetaName.ReturnType, this.parseReturnType(node));

    return this.update(node, decorators);
  }
}
