/* eslint-disable no-bitwise */
import ts from 'typescript';
import { Metadata } from './metadata.abstract';
import { serializeValue } from '../serializer';
import { MemberFlag } from '../../lib';

export class JsDocMetadata extends Metadata {
  private jsDoc: ts.JSDoc | undefined;

  private comment: string = '';

  private tags: { name: string, comment: string }[] = [];

  public flag: number = 0;

  constructor(node: ts.Node, type: ts.Type) {
    super(node, type);
    this.getJsDoc();
    this.parseComment();
    this.parseDeprecated();
    this.parseTags();
  }

  private getJsDoc() {
    this.jsDoc = this.node
      .getChildren()
      .find((child): child is ts.JSDoc => ts.isJSDoc(child));
  }

  private parseComment() {
    if (!this.jsDoc) return;
    this.comment = String(this.jsDoc.comment ?? '');
  }

  private parseDeprecated() {
    if (!this.jsDoc) return;
    const deprecated = !!ts.getJSDocDeprecatedTag(this.jsDoc);
    if (!deprecated) return;
    this.flag |= MemberFlag.Deprecated;
  }

  private parseTags() {
    if (!this.jsDoc) return;
    this.tags = ts
      .getAllJSDocTags(this.jsDoc, (tag): tag is ts.JSDocTag => !!tag)
      .map((tag) => {
        const content = (() => {
          if (!tag.comment) return '';
          if (typeof tag.comment === 'string') return tag.comment;
          return tag.comment
            .map((comment) => String(comment.text).trim())
            .join('\n');
        })();
        return { name: String(tag.tagName.text), comment: content };
      });
  }

  getProperties() {
    return {
      comment: serializeValue.asString(this.comment),
      tags: serializeValue.asArray(this.tags.map((tag) => {
        return serializeValue.asRecord({
          name: serializeValue.asString(tag.name),
          comment: serializeValue.asString(tag.comment),
        });
      })),
    };
  }
}
