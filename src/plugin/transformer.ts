import ts from 'typescript';
import { serializeValue } from './serializer';

export class MetadataDecorator {
  constructor(
    public program: ts.Program,
    public context: ts.TransformationContext,
    public sourceFile: ts.SourceFile,
  ) {}

  create(key: string, value: ts.Expression) {
    const callExp = this.context.factory.createCallExpression(
      this.context.factory.createIdentifier('__metadata'),
      undefined,
      [this.context.factory.createStringLiteral(key), value],
    );

    return this.context.factory.createDecorator(callExp);
  }
}

export class CreateStaticGetter {
  private constructor(
    public context: ts.TransformationContext,
    public name: string,
    public ownNames: string[],
    public isInheriting: boolean,
  ) {}

  static create(
    context: ts.TransformationContext,
    name: string,
    ownNames: string[],
    isInheriting: boolean,
  ) {
    return new CreateStaticGetter(context, name, ownNames, isInheriting).create();
  }

  /**
   * `own` is a boolean parameter that indicates whether to get only own properties/methods or not.
   * @returns parameter declaration
   * ```ts
   * (own: boolean = false)
   * ```
   */
  private createParam(): ts.ParameterDeclaration[] {
    return [
      this.context.factory.createParameterDeclaration(
        undefined,
        undefined,
        'own',
        undefined,
        this.context.factory.createToken(ts.SyntaxKind.BooleanKeyword),
        this.context.factory.createFalse(),
      ),
    ];
  }

  /**
   * @returns
   * ```ts
   * const {{name}} = {{initializer}};
   * ```
   */
  private createConstantStatement(
    name: string,
    initializer: ts.Expression,
  ): ts.VariableStatement {
    const variableDeclaration = this.context.factory.createVariableDeclaration(
      name,
      undefined,
      undefined,
      initializer,
    );
    return this.context.factory.createVariableStatement(
      undefined,
      this.context.factory.createVariableDeclarationList(
        [variableDeclaration],
        ts.NodeFlags.Const,
      ),
    );
  }

  private createSuperCallExpression(): ts.CallExpression {
    return this.context.factory.createCallExpression(
      this.context.factory.createPropertyAccessExpression(
        this.context.factory.createSuper(),
        this.name,
      ),
      undefined,
      [],
    );
  }

  private createOwnNamesExpression() {
    return serializeValue.asArray(this.ownNames.map(serializeValue.asString));
  }

  private createExtendingExpression() {
    return this.context.factory.createCallExpression(
      this.context.factory.createPropertyAccessExpression(
        this.createSuperCallExpression(),
        this.context.factory.createIdentifier('concat'),
      ),
      undefined,
      [serializeValue.asIdentifier('l')],
    );
  }

  private createConditionalExpression() {
    return this.context.factory.createConditionalExpression(
      this.context.factory.createIdentifier('own'),
      this.context.factory.createToken(ts.SyntaxKind.QuestionToken),
      serializeValue.asIdentifier('l'),
      this.context.factory.createToken(ts.SyntaxKind.ColonToken),
      this.createExtendingExpression(),
    );
  }

  private createResult(): ts.Expression {
    if (!this.isInheriting) return serializeValue.asIdentifier('l');
    if (!this.ownNames.length) return this.createSuperCallExpression();
    return this.createConditionalExpression();
  }

  create() {
    return this.context.factory.createMethodDeclaration(
      [this.context.factory.createModifier(ts.SyntaxKind.StaticKeyword)],
      undefined,
      this.name,
      undefined,
      undefined,
      this.createParam(),
      undefined,
      this.context.factory.createBlock([
        this.createConstantStatement('l', this.createOwnNamesExpression()),
        this.context.factory.createReturnStatement(this.createResult()),
      ], true),
    );
  }
}
