const createMeta = (key: string) => Symbol(`rich-type:${key}`);

export const MetaKey = {
  props: createMeta('props'),
  prop: createMeta('prop'),
  methods: createMeta('methods'),
  method: createMeta('method'),
} as const
