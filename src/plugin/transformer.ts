import ts from 'typescript';

export class MetadataDecorator {
  constructor(
    public program: ts.Program,
    public context: ts.TransformationContext,
    public sourceFile: ts.SourceFile,
  ) {}

  create(key: string, value: ts.Expression) {
    const callExp = this.context.factory.createCallExpression(
      this.context.factory.createIdentifier('Reflect.metadata'),
      undefined,
      [this.context.factory.createStringLiteral(key), value],
    );

    return this.context.factory.createDecorator(callExp);
  }
}

export class CreateStaticGetter {
  constructor(
    public program: ts.Program,
    public context: ts.TransformationContext,
    public sourceFile: ts.SourceFile,
  ) {}

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

  /**
   * @returns `ownNames` if `own` is true,
   * ```ts
   * (isInheriting && !own) ? super.getPropertyNames().concat(ownNames) : ownNames
   * ```
   */
  private createReturnValueExpression(
    name: string,
  ): ts.Expression {
    const condition = this.context.factory.createBinaryExpression(
      this.context.factory.createIdentifier('isInheriting'),
      this.context.factory.createToken(ts.SyntaxKind.AmpersandAmpersandToken),
      this.context.factory.createPrefixUnaryExpression(
        ts.SyntaxKind.ExclamationToken,
        this.context.factory.createIdentifier('own'),
      ),
    );

    const superExpression = this.context.factory.createCallExpression(
      this.context.factory.createPropertyAccessExpression(
        this.context.factory.createSuper(),
        name,
      ),
      undefined,
      [],
    );

    const extendingExpression = this.context.factory.createCallExpression(
      this.context.factory.createPropertyAccessExpression(
        superExpression,
        this.context.factory.createIdentifier('concat'),
      ),
      undefined,
      [this.context.factory.createIdentifier('ownNames')],
    );

    return this.context.factory.createConditionalExpression(
      condition,
      this.context.factory.createToken(ts.SyntaxKind.QuestionToken),
      extendingExpression,
      this.context.factory.createToken(ts.SyntaxKind.ColonToken),
      this.context.factory.createIdentifier('ownNames'),
    );
  }

  create(
    name: string,
    ownNames: string[],
    isInheriting: boolean,
  ) {
    const ownNamesExpression = this.context.factory.createArrayLiteralExpression(
      ownNames.map((ownName) => this.context.factory.createStringLiteral(ownName)),
    );
    const isInheritingExpression = this.context.factory.createIdentifier(isInheriting ? 'true' : 'false');

    return this.context.factory.createMethodDeclaration(
      [this.context.factory.createModifier(ts.SyntaxKind.StaticKeyword)],
      undefined,
      name,
      undefined,
      undefined,
      this.createParam(),
      undefined,
      this.context.factory.createBlock([
        this.createConstantStatement('ownNames', ownNamesExpression),
        this.createConstantStatement('isInheriting', isInheritingExpression),
        this.context.factory.createReturnStatement(
          this.createReturnValueExpression(name),
        ),
      ], true),
    );
  }
}
