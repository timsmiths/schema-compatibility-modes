import { COMPATIBILITY } from "@kafkajs/confluent-schema-registry";
import registry, { resetSchemaRegistry, SchemaOpts } from './schemaRegistry';
import {
  BookingV1ValueBase,
  BookingV1Value_BaseWithDeleteEnumValue,
  BookingV1Value_BaseWithDeleteOptional,
  BookingV1Value_BaseWithDeleteRequired,
  BookingV1Value_BaseWithModifiedMaxLength,
  BookingV1Value_BaseWithModifiedType,
  BookingV1Value_BaseWithNewEnumValue,
  BookingV1Value_BaseWithNewOptional,
  BookingV1Value_BaseWithNewRequired,
  makeSchema
} from './_fixtures';

const userOps: SchemaOpts = {
  subject: 'com.tim.test.forward.transitive',
  compatibility: COMPATIBILITY.FORWARD_TRANSITIVE,
}

describe('ForwardTransitive Compatible Schemas Evolution', () => {

  beforeEach(() => resetSchemaRegistry(userOps.subject));

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

  it('will DENY changing type from Number to String in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: BookingV1Value_BaseWithModifiedType }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/bookingId\', type=TYPE_CHANGED}]');
  });

  it('will DENY changing type from Number to String in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const throwable = async () =>
      registry.register(
        makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithModifiedType, additionalProperties: false } }),
        userOps
      );

    await expect(throwable).rejects.toThrowError('Difference{jsonPath=\'#/properties/bookingId\', type=TYPE_CHANGED}]');
  });

  it('will ALLOW changing validation in OPEN schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase } }),
      userOps
    );
    const { id } = await registry.register(
      makeSchema({ BookingV1Value: BookingV1Value_BaseWithModifiedMaxLength }),
      userOps
    );

    await expect(id).toBeTruthy();
  });

  it('will ALLOW changing validation in CLOSED schema mode', async () => {
    await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1ValueBase, additionalProperties: false } }),
      userOps
    );

    const { id } = await registry.register(
      makeSchema({ BookingV1Value: { ...BookingV1Value_BaseWithModifiedMaxLength, additionalProperties: false } }),
      userOps
    );

    await expect(id).toBeTruthy();
  });
});