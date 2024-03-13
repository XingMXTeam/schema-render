import { v4 } from 'uuid';

export default function generateComponentKey(schema) {
  if (Array.isArray(schema)) {
    schema.forEach((i) => {
      i.componentKey = v4();
    });
    return schema;
  }
  schema.componentKey = v4();
  return schema;
}
