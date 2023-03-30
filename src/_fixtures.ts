import { SchemaType } from "@kafkajs/confluent-schema-registry"
import { JSONSchema7 } from "json-schema"

export const initialSchema: JSONSchema7 = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "BookingV1Value",
  "definitions": {},
  "$ref": "#/definitions/BookingV1Value",
  "$comment": "This was uploaded automatically, do not edit this schema manually."
}

export const BookingV1ValueBase: JSONSchema7 = {
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

export const BookingV1Value_BaseWithNewRequired: JSONSchema7 = {
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

export const BookingV1Value_BaseWithNewOptional: JSONSchema7 = {
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

export const BookingV1Value_BaseWithDeleteOptional: JSONSchema7 = {
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

export const BookingV1Value_BaseWithDeleteRequired: JSONSchema7 = {
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

export const BookingV1Value_BaseWithNewEnumValue: JSONSchema7 = {
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

export const BookingV1Value_BaseWithDeleteEnumValue: JSONSchema7 = {
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

export const makeSchema = (definitions): any => ({
  type: SchemaType.JSON,
  schema: JSON.stringify({ ...initialSchema, definitions }),
})