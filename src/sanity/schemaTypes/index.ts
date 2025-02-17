import { type SchemaTypeDefinition } from 'sanity'
import {blog} from "./blog"
import { author } from './author'
import { Tags } from './tag'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Tags,author,blog],
}
