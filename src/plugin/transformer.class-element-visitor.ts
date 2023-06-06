import ts from 'typescript';
import { parseMethodDeeclaration, parsePropertyDeclaration } from './metadata.parser';
import { MetaNames } from '../common/constants';
import { ClassTransformerMetadata } from './transformer.types';
import { metadataSerializers } from './metadata.serializer';
import { MetadataDecorator } from './transformer';

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
    const parsed = parseMethodDeeclaration(node, type);

    this.metadata.methods.push(parsed);

    return this.context.factory.updateMethodDeclaration(
      node,
      [
        ...ts.getModifiers(node) ?? [],
        ...ts.getDecorators(node) ?? [],
        this.metadataDecorator.create(
          MetaNames.method,
          metadataSerializers.classMethod(parsed),
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
    const parsed = parsePropertyDeclaration(node, type);

    this.metadata.properties.push(parsed);

    return this.context.factory.updatePropertyDeclaration(
      node,
      [
        ...ts.getModifiers(node) ?? [],
        ...ts.getDecorators(node) ?? [],
        this.metadataDecorator.create(
          MetaNames.prop,
          metadataSerializers.classProperty(parsed),
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
