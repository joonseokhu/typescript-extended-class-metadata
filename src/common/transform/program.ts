import ts from 'typescript';
import * as parse from '../parser'
import { parseMethodDeeclaration, parsePropertyDeclaration } from './metadata.parser';
import { transformClass } from './transform-class';

const MetaKey = {
  props: 'rich-meta:props',
} as const;

export const transformerProgram = (program: ts.Program, config?: any): ts.TransformerFactory<any> => {
  return (context: ts.TransformationContext): ts.Transformer<any> => {
    return (sourceFile: ts.SourceFile): ts.SourceFile => {
      const visitor = (node: ts.Node): ts.Node => {
        if (!node) return ts.visitEachChild(node, visitor, context);
        if (!node.parent) return ts.visitEachChild(node, visitor, context);

        return transformClass(program, context, sourceFile)(node);

        const type = program.getTypeChecker().getTypeAtLocation(node);

        if (ts.isClassDeclaration(node)) {
          const myDecorator = context.factory.createDecorator(
            context.factory.createCallExpression(
              context.factory.createIdentifier('Reflect.metadata'),
              undefined,
              [
                context.factory.createStringLiteral(MetaKey.props),
                context.factory.createArrayLiteralExpression([]),
              ],
            )
          );
          const prevModifiers = node.modifiers ?? []

          // add decorator to class
          // @ts-ignore
          node.modifiers = [...prevModifiers, myDecorator];

          // // @ts-ignore
          // node.modifiers = [...prevModifiers, myDecorator]
        }
        
        // check if node is method
        if (ts.isMethodDeclaration(node)) {
          const parsed = parseMethodDeeclaration(node, type);

          // set metadata decorator for method
          // Use factory.createDecorator or the factory supplied by your transformation context instead.
          // const decorator = context.factory.createDecorator(
          //   context.factory.createCallExpression(
          //     context.factory.createIdentifier('Meta'),
          //     undefined,
          //     [
          //       context.factory.createObjectLiteralExpression(
          //         Object.entries(meta).map(([key, value]) => {
          //           return context.factory.createPropertyAssignment(
          //             key,
          //             context.factory.createStringLiteral(value)
          //           )
          //         }
          //         ),
          //         false
          //       )
          //     ]
          //   )
          // );
          // apply decorator to method
        }

        // check if node is class property
        if (ts.isPropertyDeclaration(node)) {
          const parsed = parsePropertyDeclaration(node, type);
          // console.dir(parsed, { depth: 0 });

          // get decorators of class property
          const decorators = ts.canHaveDecorators(node)
            ? (ts.getDecorators(node) ?? [])
            : undefined;
            
          if (!decorators) return ts.visitEachChild(node, visitor, context);
          
          const myDecorator = context.factory.createDecorator(
            context.factory.createCallExpression(
              context.factory.createIdentifier('Reflect.metadata'),
              undefined,
              [
                context.factory.createStringLiteral('test:meta'),
                context.factory.createObjectLiteralExpression([
                  context.factory.createPropertyAssignment(
                    'a',
                    context.factory.createStringLiteral('1')
                  ),
                ])
              ],
            )
          );

          const parentClass = node.parent;

          // ;(() => {
          //   const abc = ts.getDecorators(parentClass)?.find(dec => {
          //     let flag = false;

          //     dec.forEachChild(child => {
          //       if (!ts.isCallExpression(child)) return;

          //       console.log(child.getText())
          //       console.log(child.getText())

          //       if (child.expression.getText() !== 'Reflect.metadata') {
          //         flag = false;
          //         return;
          //       }
          //       const metadataNameNode = child.arguments[0] as ts.StringLiteral
          //       const metadataName = metadataNameNode.text;
          //       flag = metadataName === 'MetaKey.props'
          //     });
          //     const child = dec.getChildren()[1] as ts.CallExpression
          //   })
  
          //   if (abc) {
          //     const exp = abc?.getChildren()[1] as ts.CallExpression
          //     const props = exp.arguments[1] as ts.ArrayLiteralExpression;
          //     context.factory.updateArrayLiteralExpression(props, [])
          //     //   ...props.elements,
          //     //   context.factory.createStringLiteral(parsed.name),
          //     // ]);
          //   }
          // })();
          

          // console.log('asdfasdf', abc?.getText())

          // if (decorators.length) {
          //   console.log(parsed.name)
          //   const first = decorators?.[0]!.expression!
          //   console.log(first)
          // }
          // const meta = { a: '1', b: '2' }

          if (ts.canHaveDecorators(node)) {
            const prevDecorators = ts.getDecorators(node) ?? []

            const nextDecorators = [...decorators, myDecorator]

            node.modifiers = nextDecorators;
          }

          // // apply metadata decorator to class property
          // const newDecorators = [...decorators, decorator];
          // const newProperty = context.factory.updatePropertyDeclaration(
          //   node,
          //   newDecorators,
          //   node.modifiers ?? [],
          //   node.name,
          //   node.questionToken,
          //   node.type,
          //   node.initializer
          // );
        }

        return ts.visitEachChild(node, visitor, context);
      }
      return ts.visitNode(sourceFile, visitor);
    }
  }
};
