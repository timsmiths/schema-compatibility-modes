import axios from 'axios';
import timers from 'timers/promises'
import { COMPATIBILITY, SchemaType } from "@kafkajs/confluent-schema-registry";
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { JSONSchema7 } from 'json-schema';

const initialSchema: JSONSchema7 = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "BookingV1Value",
  "definitions": {},
  "$ref": "#/definitions/BookingV1Value",
  "$comment": "This was uploaded automatically, do not edit this schema manually."
}

const BookingV1ValueBase: JSONSchema7 = {
  "additionalProperties": true,
  "properties": {
    "bookingId": {
      "minimum": 0,
      "title": "bookingId",
      "type": "integer"
    },
    "vehicleId": {
      "title": "vehicleId",
      "type": "string"
    },
    "segment": {
      "enum": [
        "UK",
        "FR"
      ],
      "title": "segment",
      "type": "string",
    },
    "phone": {
      "title": "phone",
      "anyOf": [
        {
          "maxLength": 128,
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
    }
  },
  "required": [
    "bookingId",
    "vehicleId",
    "segment",
  ],
  "type": "object"
}

const BookingV1Value_BaseWithNewRequired: JSONSchema7 = {
  "additionalProperties": true,
  "properties": {
    "bookingId": {
      "minimum": 0,
      "title": "bookingId",
      "type": "integer"
    },
    "vehicleId": {
      "title": "vehicleId",
      "type": "string"
    },
    "segment": {
      "enum": [
        "UK",
        "FR"
      ],
      "title": "segment",
      "type": "string"
    },
    "phone": {
      "title": "phone",
      "anyOf": [
        {
          "maxLength": 128,
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
    },
    "customerId": {
      "title": "customerId",
      "type": "string"
    }
  },
  "required": [
    "bookingId",
    "vehicleId",
    "segment",
    "customerId"
  ],
  "type": "object"
}

const BookingV1Value_BaseWithNewOptional: JSONSchema7 = {
  "additionalProperties": true,
  "properties": {
    "bookingId": {
      "minimum": 0,
      "title": "bookingId",
      "type": "integer"
    },
    "vehicleId": {
      "title": "vehicleId",
      "type": "string"
    },
    "segment": {
      "enum": [
        "UK",
        "FR"
      ],
      "title": "segment",
      "type": "string"
    },
    "phone": {
      "title": "phone",
      "anyOf": [
        {
          "maxLength": 128,
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
    },
    "customerId": {
      "title": "customerId",
      "anyOf": [
        {
          "maxLength": 128,
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
    }
  },
  "required": [
    "bookingId",
    "vehicleId",
    "segment",
  ],
  "type": "object"
}

const BookingV1Value_BaseWithDeleteOptional: JSONSchema7 = {
  "additionalProperties": true,
  "properties": {
    "bookingId": {
      "minimum": 0,
      "title": "bookingId",
      "type": "integer"
    },
    "vehicleId": {
      "title": "vehicleId",
      "type": "string"
    },
    "segment": {
      "enum": [
        "UK",
        "FR"
      ],
      "title": "segment",
      "type": "string"
    },
  },
  "required": [
    "bookingId",
    "vehicleId",
    "segment",
  ],
  "type": "object"
}

const BookingV1Value_BaseWithDeleteRequired: JSONSchema7 = {
  "additionalProperties": true,
  "properties": {
    "bookingId": {
      "minimum": 0,
      "title": "bookingId",
      "type": "integer"
    },
    "segment": {
      "enum": [
        "UK",
        "FR"
      ],
      "title": "segment",
      "type": "string"
    },
    "phone": {
      "title": "phone",
      "anyOf": [
        {
          "maxLength": 128,
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
    }
  },
  "required": [
    "bookingId",
    "vehicleId",
    "segment",
  ],
  "type": "object"
}

const BookingV1Value_BaseWithNewEnumValue: JSONSchema7 = {
  "additionalProperties": true,
  "properties": {
    "bookingId": {
      "minimum": 0,
      "title": "bookingId",
      "type": "integer"
    },
    "vehicleId": {
      "title": "vehicleId",
      "type": "string"
    },
    "segment": {
      "enum": [
        "UK",
        "FR",
        "GR",
      ],
      "title": "segment",
      "type": "string",
    },
    "phone": {
      "title": "phone",
      "anyOf": [
        {
          "maxLength": 128,
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
    },
  },
  "required": [
    "bookingId",
    "vehicleId",
    "segment",
  ],
  "type": "object"
}

const BookingV1Value_BaseWithDeleteEnumValue: JSONSchema7 = {
  "additionalProperties": true,
  "properties": {
    "bookingId": {
      "minimum": 0,
      "title": "bookingId",
      "type": "integer"
    },
    "vehicleId": {
      "title": "vehicleId",
      "type": "string"
    },
    "segment": {
      "enum": [
        "UK",
      ],
      "title": "segment",
      "type": "string"
    },
    "phone": {
      "title": "phone",
      "anyOf": [
        {
          "maxLength": 128,
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
    }
  },
  "required": [
    "bookingId",
    "vehicleId",
    "segment",
  ],
  "type": "object"
}

const makeSchema = (definitions): any => ({
  type: SchemaType.JSON,
  schema: JSON.stringify({ ...initialSchema, definitions }),
})

const registry = new SchemaRegistry({ host: 'http://0.0.0.0:8081' }, {
  [SchemaType.JSON]: {
    // ajvInstance: ajv,
    // unknownFormats: 'ignore',
    strict: false,
    removeAdditional: true
  },
});

const userOps = {
  subject: 'com.tim.test.forward.transitive',
  compatibility: COMPATIBILITY.FORWARD_TRANSITIVE,
}

describe('ForwardTransitive Compatible Schemas Evolution', () => {

  beforeEach(async () => {
    try {
      await axios.delete("http://localhost:8081/subjects/com.tim.test.forward.transitive");
      await axios.delete("http://localhost:8081/subjects/com.tim.test.forward.transitive?permanent=true");
      await timers.setTimeout(2000);
    } catch { }
  })

  it('will ALLOW new optional fields in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: BookingV1Value_BaseWithNewOptional }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will DENY new optional fields in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithNewOptional, additionalProperties: false } }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/customerId\', type=PROPERTY_REMOVED_FROM_CLOSED_CONTENT_MODEL}]');
  });

  it('will ALLOW new required fields in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: BookingV1Value_BaseWithNewRequired }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will DENY new required fields in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithNewRequired, additionalProperties: false } }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/customerId\', type=PROPERTY_REMOVED_FROM_CLOSED_CONTENT_MODEL}]');
  });

  it('will DENY deletion of required field in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: BookingV1Value_BaseWithDeleteRequired }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/vehicleId\', type=PROPERTY_ADDED_TO_OPEN_CONTENT_MODEL}]');
  })

  it('will DENY deletion of required field in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithDeleteRequired, additionalProperties: false } }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/vehicleId\', type=REQUIRED_PROPERTY_ADDED_TO_UNOPEN_CONTENT_MODEL}]');
  });

  it('will DENY deletion of optional field in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: BookingV1Value_BaseWithDeleteOptional }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/phone\', type=PROPERTY_ADDED_TO_OPEN_CONTENT_MODEL}]');
  });

  it('will ALLOW deletion of optional field in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithDeleteOptional, additionalProperties: false } }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will DENY adding value to ENUM field in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: BookingV1Value_BaseWithNewEnumValue }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/segment\', type=COMBINED_TYPE_SUBSCHEMAS_CHANGED}]');
  });

  it('will DENY adding value to ENUM field in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithNewEnumValue, additionalProperties: false } }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/segment\', type=COMBINED_TYPE_SUBSCHEMAS_CHANGED}]');
  });

  it('will ALLOW removing value from ENUM field in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );


    const { id } = await registry.register(
      makeSchema({ BookingV1Value: BookingV1Value_BaseWithDeleteEnumValue }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will ALLOW removing value from ENUM field in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithDeleteEnumValue, additionalProperties: false } }),
      userOps
    )

    await expect(id).toBeTruthy();
  });
});