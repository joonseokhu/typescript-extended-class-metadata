import ts from 'typescript';
import { MetaName } from '../../lib';
import { PropertyMetadata } from '../metadata';
import { Visitor } from './visitor.abstract';

export class PropertyVisitor extends Visitor<ts.PropertyDeclaration> {
  private update() {
    return this.context.factory.updatePropertyDeclaration(
      this.node,
      [
        ...ts.getModifiers(this.node) ?? [],
        ...ts.getDecorators(this.node) ?? [],
        ...this.decorators,
      ],
      this.node.name,
      this.node.questionToken,
      this.node.type,
      this.node.initializer,
    );
  }

  private parsePropertyMetadata() {
    const propertyMetadata = new PropertyMetadata(this.node, this.type);

    this.addDecorator(MetaName.Prop, propertyMetadata.serialize());
  }

  visit(): ts.PropertyDeclaration {
    this.parsePropertyMetadata();
    return this.update();
  }
}
