import axios from 'axios';
import timers from 'timers/promises'
import { COMPATIBILITY, SchemaRegistry, SchemaType } from "@kafkajs/confluent-schema-registry";

export const SCHEMA_REGISTRY_HOST = 'http://0.0.0.0:8081';

const registry = new SchemaRegistry({ host: SCHEMA_REGISTRY_HOST }, {
  [SchemaType.JSON]: {
    // ajvInstance: ajv,
    // unknownFormats: 'ignore',
    strict: false,
    removeAdditional: true
  },
});

export interface SchemaOpts {
  compatibility?: COMPATIBILITY;
  separator?: string;
  subject: string;
}

export const resetSchemaRegistry = async (subject: string) => {
  try {
    await axios.delete(`${SCHEMA_REGISTRY_HOST}/subjects/${subject}`);
    await axios.delete(`${SCHEMA_REGISTRY_HOST}/subjects/${subject}?permanent=true`);
    await timers.setTimeout(2000);
  } catch { }
}

export default registry;