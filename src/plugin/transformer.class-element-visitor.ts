import ts from 'typescript';
import { MetaName } from '../common/constants';
import { ClassTransformerMetadata } from './transformer.types';
import { MetadataDecorator } from './transformer';
import { MethodMetadata, PropertyMetadata } from './metadata';

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

  visitMethod(node: ts.MethodDeclaration) {
    const type = this.program.getTypeChecker().getTypeAtLocation(node);
    const methodMetadata = new MethodMetadata(node, type);

    this.metadata.methods.push(methodMetadata.name);

    return this.context.factory.updateMethodDeclaration(
      node,
      [
        ...ts.getModifiers(node) ?? [],
        ...ts.getDecorators(node) ?? [],
        this.metadataDecorator.create(
          MetaName.Method,
          methodMetadata.serialize(),
        ),
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

  visitProperty(node: ts.PropertyDeclaration) {
    const type = this.program.getTypeChecker().getTypeAtLocation(node);
    const propertyMetadata = new PropertyMetadata(node, type);

    this.metadata.properties.push(propertyMetadata.name);

    return this.context.factory.updatePropertyDeclaration(
      node,
      [
        ...ts.getModifiers(node) ?? [],
        ...ts.getDecorators(node) ?? [],
        this.metadataDecorator.create(
          MetaName.Prop,
          propertyMetadata.serialize(),
        ),
      ],
      node.name,
      node.questionToken,
      node.type,
      node.initializer,
    );
  }

  visit(node: ts.Node): ts.Node {
    if (!ts.isClassElement(node)) return node;
    if (ts.isMethodDeclaration(node)) return this.visitMethod(node);
    if (ts.isPropertyDeclaration(node)) return this.visitProperty(node);
    return node;
  }
}
