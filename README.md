
# Schema compatibility evolution rules
Here we have a bunch of assertions that demonstrate how and what we can change in our schemas without breaking contracts between consumers and producers. 

### Forward Transitive

```
✓ will ALLOW new optional fields in OPEN schema mode (105 ms)
✓ will DENY new optional fields in CLOSED schema mode (64 ms)
✓ will ALLOW new required fields in OPEN schema mode (56 ms)
✓ will DENY new required fields in CLOSED schema mode (60 ms)
✓ will DENY deletion of required field in OPEN schema mode (53 ms)
✓ will DENY deletion of required field in CLOSED schema mode (53 ms)
✓ will DENY deletion of optional field in OPEN schema mode (53 ms)
✓ will ALLOW deletion of optional field in CLOSED schema mode (63 ms)
✓ will DENY adding value to ENUM field in OPEN schema mode (60 ms)
✓ will DENY adding value to ENUM field in CLOSED schema mode (52 ms)
✓ will ALLOW removing value from ENUM field in OPEN schema mode (51 ms)
✓ will ALLOW removing value from ENUM field in CLOSED schema mode (56 ms)
```

### Forward
```
✓ will ALLOW new optional fields in OPEN schema mode (105 ms)
✓ will DENY new optional fields in CLOSED schema mode (64 ms)
✓ will ALLOW new required fields in OPEN schema mode (56 ms)
✓ will DENY new required fields in CLOSED schema mode (60 ms)
✓ will DENY deletion of required field in OPEN schema mode (53 ms)
✓ will DENY deletion of required field in CLOSED schema mode (53 ms)
✓ will DENY deletion of optional field in OPEN schema mode (53 ms)
✓ will ALLOW deletion of optional field in CLOSED schema mode (63 ms)
✓ will DENY adding value to ENUM field in OPEN schema mode (60 ms)
✓ will DENY adding value to ENUM field in CLOSED schema mode (52 ms)
✓ will ALLOW removing value from ENUM field in OPEN schema mode (51 ms)
✓ will ALLOW removing value from ENUM field in CLOSED schema mode (56 ms)
```
- When adding a required field:
    - and you need the field to be `REQUIRED` in BigQuery
        - then when connector config should use `allBQFieldsNullable=false`. The connector will then fail since you cannot add `REQUIRED` fields in the BigQuery table since the old record will not have a value.
        - then you must delete the sink table in BigQuery and re-create the connector, this will create the required columns as needed but will require the whole topic to be processed from offset 0
    - If `NULLABLE` in BigQuery is acceptable
        - then enable `allBQFieldsNullable=true` in the connector for automatic schema creation
- Removing a required field you previously added
    - If you remove a required field that doesn't exist in an older version on the schema, the schema registry can use the old id and push the new message
    - This means the topic can contain old versions of the schema in front of newer versions of the schema
    - The result being the removed field in BigQuery is marked as NULL (even if it had a value) and the connector continues to function as expected (this required field must hav been generated from the connector using `allBQFieldsNullable=true`, this means it's `NULLABLE` in BigQuery which allows it to be safely deleted)
    - the deleted field is never removed from BigQuery, in fact it doesn't seem to be possible which is great otherwise we are at risk of breaking reports
    - This could lead to strange results since the table may contain `NULL` values causing unintended results
    - If you try and publish a message using the latest schema with the removed field it will throw `ConfluentSchemaRegistryValidationError: invalid payload` (make sure we force the producer to use the latest version of the schema... the schema reg may return an older version of schema)
- Removing a required field from the root schema
    -- This will fail at the producers schema level so will never make it into the topic

### Backward transitive
```
✓ will ALLOW new optional fields in CLOSED schema mode (98 ms)
✓ will DENY new optional fields in OPEN schema mode (58 ms)
✓ will DENY new required fields in OPEN schema mode (53 ms)
✓ will DENY new required fields in CLOSED schema mode (53 ms)
✓ will DENY deletion of required field in OPEN schema mode (52 ms)
✓ will ALLOW deletion of required field in CLOSED schema mode (56 ms)
✓ will ALLOW deletion of optional field in OPEN schema mode (61 ms)
✓ will DENY deletion of optional field in CLOSED schema mode (47 ms)
✓ will ALLOW adding value to ENUM field in OPEN schema mode (53 ms)
✓ will ALLOW adding value to ENUM field in CLOSED schema mode (49 ms)
✓ will DENY removing value from ENUM field in OPEN schema mode (49 ms)
✓ will DENY removing value from ENUM field in CLOSED schema mode (47 ms)
```

### Backward
```
✓ will ALLOW new optional fields in CLOSED schema mode (98 ms)
✓ will DENY new optional fields in OPEN schema mode (58 ms)
✓ will DENY new required fields in OPEN schema mode (53 ms)
✓ will DENY new required fields in CLOSED schema mode (53 ms)
✓ will DENY deletion of required field in OPEN schema mode (52 ms)
✓ will ALLOW deletion of required field in CLOSED schema mode (56 ms)
✓ will ALLOW deletion of optional field in OPEN schema mode (61 ms)
✓ will DENY deletion of optional field in CLOSED schema mode (47 ms)
✓ will ALLOW adding value to ENUM field in OPEN schema mode (53 ms)
✓ will ALLOW adding value to ENUM field in CLOSED schema mode (49 ms)
✓ will DENY removing value from ENUM field in OPEN schema mode (49 ms)
✓ will DENY removing value from ENUM field in CLOSED schema mode (47 ms)
```

