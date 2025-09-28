import { Node } from '@tiptap/core'

export const Columns = Node.create({
  name: 'columns',
  group: 'block',
  content: 'column{1,3}', // 1 tot 3 kolommen
  parseHTML() {
    return [{ tag: 'div.columns' }]
  },
  renderHTML() {
    return ['div', { class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' }, 0]
  },
})

export const Column = Node.create({
  name: 'column',
  group: 'block',
  content: 'block+',
  parseHTML() {
    return [{ tag: 'div.column' }]
  },
  renderHTML() {
    return ['div', { class: 'col-span-1' }, 0]
  },
})
