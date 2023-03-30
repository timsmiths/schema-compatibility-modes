import axios from 'axios';
import timers from 'timers/promises'
import { COMPATIBILITY, SchemaType } from "@kafkajs/confluent-schema-registry";
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import {
  BookingV1ValueBase,
  BookingV1Value_BaseWithDeleteEnumValue,
  BookingV1Value_BaseWithDeleteOptional,
  BookingV1Value_BaseWithDeleteRequired,
  BookingV1Value_BaseWithNewEnumValue,
  BookingV1Value_BaseWithNewOptional,
  BookingV1Value_BaseWithNewRequired,
  makeSchema,
} from './_fixtures';

const registry = new SchemaRegistry({ host: 'http://0.0.0.0:8081' }, {
  [SchemaType.JSON]: {
    // ajvInstance: ajv,
    // unknownFormats: 'ignore',
    strict: false,
    removeAdditional: true
  },
});

const userOps = {
  subject: 'com.tim.test.backward.transitive',
  compatibility: COMPATIBILITY.BACKWARD_TRANSITIVE,
}

describe('BackwardTransitive Compatible Schemas Evolution', () => {

  beforeEach(async () => {
    try {
      await axios.delete("http://localhost:8081/subjects/com.tim.test.backward.transitive");
      await axios.delete("http://localhost:8081/subjects/com.tim.test.backward.transitive?permanent=true");
      await timers.setTimeout(2000);
    } catch { }
  })

  it('will ALLOW new optional fields in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithNewOptional, additionalProperties: false } }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will DENY new optional fields in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: BookingV1Value_BaseWithNewOptional }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/customerId\', type=PROPERTY_ADDED_TO_OPEN_CONTENT_MODEL}]');
  });

  it('will DENY new required fields in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: BookingV1Value_BaseWithNewRequired }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/customerId\', type=PROPERTY_ADDED_TO_OPEN_CONTENT_MODEL}]');
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

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/customerId\', type=REQUIRED_PROPERTY_ADDED_TO_UNOPEN_CONTENT_MODEL}]');
  });

  it('will DENY deletion of required field in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: BookingV1Value_BaseWithDeleteRequired }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will ALLOW deletion of required field in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithDeleteRequired, additionalProperties: false } }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/vehicleId\', type=PROPERTY_REMOVED_FROM_CLOSED_CONTENT_MODEL}]');
  });

  it('will ALLOW deletion of optional field in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: BookingV1Value_BaseWithDeleteOptional }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will DENY deletion of optional field in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithDeleteOptional, additionalProperties: false } }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/phone\', type=PROPERTY_REMOVED_FROM_CLOSED_CONTENT_MODEL}]');
  });

  it('will ALLOW adding value to ENUM field in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: BookingV1Value_BaseWithNewEnumValue }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will ALLOW adding value to ENUM field in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithNewEnumValue, additionalProperties: false } }),
      userOps
    )

    await expect(id).toBeTruthy();
  });

  it('will DENY removing value from ENUM field in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: BookingV1ValueBase }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: BookingV1Value_BaseWithDeleteEnumValue }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/segment\', type=COMBINED_TYPE_SUBSCHEMAS_CHANGED}]');
  });

  it('will DENY removing value from ENUM field in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithDeleteEnumValue, additionalProperties: false } }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/segment\', type=COMBINED_TYPE_SUBSCHEMAS_CHANGED}]');
  });
});