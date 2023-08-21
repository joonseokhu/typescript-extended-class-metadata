import ts from 'typescript';
import { GetterName } from '../../common/constants';
import { CreateStaticGetter, MetadataDecorator } from '../transformer';
import { ClassElementVisitor } from './transformer.class-element-visitor';
import { ClassTransformerMetadata } from '../transformer.types';

export class ClassVisitor {
  public metadataDecorator: MetadataDecorator;

  public elementVisitor: ClassElementVisitor;

  public createStaticGetter: CreateStaticGetter;

  public metadata: ClassTransformerMetadata = { properties: [], methods: [] };

  constructor(
    public program: ts.Program,
    public context: ts.TransformationContext,
    public sourceFile: ts.SourceFile,
  ) {
    this.metadataDecorator = new MetadataDecorator(program, context, sourceFile);
    this.elementVisitor = new ClassElementVisitor(program, context, sourceFile, this.metadata);
    this.createStaticGetter = new CreateStaticGetter(program, context, sourceFile);
  }

  visit(node: ts.Node): ts.Node {
    if (!ts.isClassDeclaration(node)) return node;

    const isExtending = (() => {
      const clauses = node.heritageClauses;
      if (!clauses?.length) return false;
      return clauses.some((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword);
    })();

    // eslint-disable-next-line no-param-reassign
    node = ts.visitEachChild(node, (curr) => this.elementVisitor.visit(curr), this.context);

    if (!ts.isClassDeclaration(node)) {
      throw new Error('Expected node to be a ClassDeclaration');
    }

    return this.context.factory.updateClassDeclaration(
      node,
      [...(ts.getModifiers(node) ?? []), ...(ts.getDecorators(node) ?? [])],
      node.name,
      node.typeParameters,
      node.heritageClauses,
      [
        ...node.members,
        this.createStaticGetter.create(
          GetterName.Props,
          this.metadata.properties,
          isExtending,
        ),
        this.createStaticGetter.create(
          GetterName.Methods,
          this.metadata.methods,
          isExtending,
        ),
      ],
    );
  }
}
