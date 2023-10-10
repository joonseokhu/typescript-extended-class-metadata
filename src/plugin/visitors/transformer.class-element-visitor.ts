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

  public propertyVisitor: PropertyVisitor;

  public methodVisitor: MethodVisitor;

  constructor(
    public program: ts.Program,
    public context: ts.TransformationContext,
    public sourceFile: ts.SourceFile,
    public metadata: ClassTransformerMetadata,
  ) {
    this.metadataDecorator = new MetadataDecorator(program, context, sourceFile);
    this.propertyVisitor = new PropertyVisitor(program, context, sourceFile);
    this.methodVisitor = new MethodVisitor(program, context, sourceFile);
  }

  visitConstructor(node: ts.ConstructorDeclaration) {
    const paramTypes = node.parameters.map((parameter) => {
      const parameterType = this.program.getTypeChecker().getTypeAtLocation(parameter);
      return new ValueTypeMetadata(
        parameter,
        parameterType,
        this.program,
        this.context,
      ).serialize();
    });

    this.metadata.decorators.push(this.metadataDecorator.create(
      MetaName.ParamTypes,
      serializeValue.asArray(paramTypes),
    ));

    return node;
  }

  private getName(node: ts.ClassElement) {
    return node.name?.getText() ?? '';
  }

  private visitProperty(node: ts.PropertyDeclaration) {
    this.metadata.properties.push(this.getName(node));
    // return new PropertyVisitor(this.program, this.context, this.sourceFile).visit(node);
    return this.propertyVisitor.visit(node);
  }

  private visitMethod(node: ts.MethodDeclaration) {
    this.metadata.methods.push(this.getName(node));
    // return new MethodVisitor(this.program, this.context, this.sourceFile).visit(node);
    return this.methodVisitor.visit(node);
  }

  visit(node: ts.Node): ts.Node {
    if (ts.isConstructorDeclaration(node)) return this.visitConstructor(node);
    if (ts.isMethodDeclaration(node)) return this.visitMethod(node);
    if (ts.isPropertyDeclaration(node)) return this.visitProperty(node);
    return node;
  }
}
