const createMeta = (key: string) => `rich-metadata/${key}`

export const MetaKey = {
  props: createMeta('props'),
  prop: createMeta('prop'),
  methods: createMeta('methods'),
  method: createMeta('method'),
} as const
