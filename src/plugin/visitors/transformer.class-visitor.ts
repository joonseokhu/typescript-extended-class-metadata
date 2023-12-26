import ts from 'typescript';
import { GetterName } from '../../common/constants';
import { CreateStaticGetter, MetadataDecorator } from '../transformer';
import { ClassElementVisitor } from './transformer.class-element-visitor';
import { ClassTransformerMetadata } from '../transformer.types';
import { serializeValue } from '../serializer';

export class ClassVisitor {
  public metadataDecorator: MetadataDecorator;

  public elementVisitor: ClassElementVisitor;

  public createStaticGetter: CreateStaticGetter;

  public metadata: ClassTransformerMetadata = {
    properties: [],
    methods: [],
    decorators: [],
    metadata: {},
  };

  constructor(
    public program: ts.Program,
    public context: ts.TransformationContext,
    public sourceFile: ts.SourceFile,
  ) {
    this.metadataDecorator = new MetadataDecorator(program, context, sourceFile);
    this.elementVisitor = new ClassElementVisitor(program, context, sourceFile, this.metadata);
  }

  private isExtending(node: ts.ClassDeclaration) {
    const clauses = node.heritageClauses;
    if (!clauses?.length) return false;
    return clauses.some((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword);
  }

  visit(node: ts.ClassDeclaration): ts.ClassDeclaration {
    const isExtending = this.isExtending(node);

    // eslint-disable-next-line no-param-reassign
    node = ts.visitEachChild(node, (curr) => this.elementVisitor.visit(curr), this.context);

    return this.context.factory.updateClassDeclaration(
      node,
      [
        ...(ts.getModifiers(node) ?? []),
        ...(ts.getDecorators(node) ?? []),
        ...this.metadata.decorators,
      ],
      node.name,
      node.typeParameters,
      node.heritageClauses,
      [
        ...node.members,
        CreateStaticGetter.create(
          this.context,
          GetterName.Props,
          this.metadata.properties,
          isExtending,
        ),
        CreateStaticGetter.create(
          this.context,
          GetterName.Methods,
          this.metadata.methods,
          isExtending,
        ),
        this.createMetadataGetter(node),
      ],
    );
  }

  createMetadataGetter(node: ts.ClassDeclaration) {
    const isExtending = this.isExtending(node);

    const metadata: Record<string, ts.Expression> = {};
    Object.entries(this.metadata.metadata).forEach(([key, value]) => {
      metadata[key] = serializeValue.asRecord(value);
    });

    const superMetadata = this.isExtending(node)
      ? this.context.factory.createCallExpression(
        this.context.factory.createPropertyAccessExpression(
          this.context.factory.createSuper(),
          GetterName.Metadata,
        ),
        undefined,
        [],
      )
      : this.context.factory.createObjectLiteralExpression();

    return this.context.factory.createMethodDeclaration(
      [this.context.factory.createModifier(ts.SyntaxKind.StaticKeyword)],
      undefined,
      GetterName.Metadata,
      undefined,
      undefined,
      [],
      undefined,
      this.context.factory.createBlock([
        this.context.factory.createReturnStatement(
          this.context.factory.createCallExpression(
            this.context.factory.createPropertyAccessExpression(
              this.context.factory.createIdentifier('Object'),
              this.context.factory.createIdentifier('assign'),
            ),
            undefined,
            [
              superMetadata,
              serializeValue.asRecord(metadata, true),
            ],
          ),
        ),
      ]),
    );
  }
}
