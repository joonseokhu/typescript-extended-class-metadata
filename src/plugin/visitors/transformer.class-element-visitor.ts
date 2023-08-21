import ts from 'typescript';
import { MetaName } from '../../common/constants';
import { ValueTypeMetadata } from '../metadata';
import { serializeValue } from '../serializer';
import { MetadataDecorator } from '../transformer';
import { ClassTransformerMetadata } from '../transformer.types';
import { MethodVisitor } from './method.visitor';
import { PropertyVisitor } from './property.visitor';

export class ClassElementVisitor {
  public metadataDecorator: MetadataDecorator;

  constructor(
    public program: ts.Program,
    public context: ts.TransformationContext,
    public sourceFile: ts.SourceFile,
    public metadata: ClassTransformerMetadata,
  ) {
    this.metadataDecorator = new MetadataDecorator(program, context, sourceFile);
  }

  visitConstructor(node: ts.ConstructorDeclaration) {
    const paramTypes = node.parameters.map((parameter) => {
      const parameterType = this.program.getTypeChecker().getTypeAtLocation(parameter);
      return new ValueTypeMetadata(parameter, parameterType).serialize();
    });

    return this.context.factory.updateConstructorDeclaration(
      node,
      [
        ...ts.getModifiers(node) ?? [],
        this.metadataDecorator.create(
          MetaName.ParamTypes,
          serializeValue.asArray(paramTypes),
        ),
      ],
      node.parameters,
      node.body,
    );
  }

  private getName(node: ts.ClassElement) {
    return node.name?.getText() ?? '';
  }

  private visitProperty(node: ts.PropertyDeclaration) {
    this.metadata.properties.push(this.getName(node));
    return new PropertyVisitor(
      node,
      this.program,
      this.context,
      this.sourceFile,
    ).visit();
  }

  private visitMethod(node: ts.MethodDeclaration) {
    this.metadata.methods.push(this.getName(node));
    return new MethodVisitor(
      node,
      this.program,
      this.context,
      this.sourceFile,
    ).visit();
  }

  visit(node: ts.Node): ts.Node {
    if (ts.isConstructorDeclaration(node)) return this.visitConstructor(node);
    if (ts.isMethodDeclaration(node)) return this.visitMethod(node);
    if (ts.isPropertyDeclaration(node)) return this.visitProperty(node);
    return node;
  }
}
