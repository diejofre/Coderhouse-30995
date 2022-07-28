var normalizr = (function (exports) {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * Helpers to enable Immutable compatibility *without* bringing in
   * the 'immutable' package as a dependency.
   */

  /**
   * Check if an object is immutable by checking if it has a key specific
   * to the immutable library.
   *
   * @param  {any} object
   * @return {bool}
   */
  function isImmutable(object) {
    return !!(object && typeof object.hasOwnProperty === 'function' && (object.hasOwnProperty('__ownerID') || // Immutable.Map
    object._map && object._map.hasOwnProperty('__ownerID'))); // Immutable.Record
  }
  /**
   * Denormalize an immutable entity.
   *
   * @param  {Schema} schema
   * @param  {Immutable.Map|Immutable.Record} input
   * @param  {function} unvisit
   * @param  {function} getDenormalizedEntity
   * @return {Immutable.Map|Immutable.Record}
   */

  function denormalizeImmutable(schema, input, unvisit) {
    return Object.keys(schema).reduce(function (object, key) {
      // Immutable maps cast keys to strings on write so we need to ensure
      // we're accessing them using string keys.
      var stringKey = "" + key;

      if (object.has(stringKey)) {
        return object.set(stringKey, unvisit(object.get(stringKey), schema[stringKey]));
      } else {
        return object;
      }
    }, input);
  }

  var getDefaultGetId = function getDefaultGetId(idAttribute) {
    return function (input) {
      return isImmutable(input) ? input.get(idAttribute) : input[idAttribute];
    };
  };

  var EntitySchema = /*#__PURE__*/function () {
    function EntitySchema(key, definition, options) {
      if (definition === void 0) {
        definition = {};
      }

      if (options === void 0) {
        options = {};
      }

      if (!key || typeof key !== 'string') {
        throw new Error("Expected a string key for Entity, but found " + key + ".");
      }

      var _options = options,
          _options$idAttribute = _options.idAttribute,
          idAttribute = _options$idAttribute === void 0 ? 'id' : _options$idAttribute,
          _options$mergeStrateg = _options.mergeStrategy,
          mergeStrategy = _options$mergeStrateg === void 0 ? function (entityA, entityB) {
        return _extends({}, entityA, entityB);
      } : _options$mergeStrateg,
          _options$processStrat = _options.processStrategy,
          processStrategy = _options$processStrat === void 0 ? function (input) {
        return _extends({}, input);
      } : _options$processStrat,
          _options$fallbackStra = _options.fallbackStrategy,
          fallbackStrategy = _options$fallbackStra === void 0 ? function (key, schema) {
        return undefined;
      } : _options$fallbackStra;
      this._key = key;
      this._getId = typeof idAttribute === 'function' ? idAttribute : getDefaultGetId(idAttribute);
      this._idAttribute = idAttribute;
      this._mergeStrategy = mergeStrategy;
      this._processStrategy = processStrategy;
      this._fallbackStrategy = fallbackStrategy;
      this.define(definition);
    }

    var _proto = EntitySchema.prototype;

    _proto.define = function define(definition) {
      this.schema = Object.keys(definition).reduce(function (entitySchema, key) {
        var _extends2;

        var schema = definition[key];
        return _extends({}, entitySchema, (_extends2 = {}, _extends2[key] = schema, _extends2));
      }, this.schema || {});
    };

    _proto.getId = function getId(input, parent, key) {
      return this._getId(input, parent, key);
    };

    _proto.merge = function merge(entityA, entityB) {
      return this._mergeStrategy(entityA, entityB);
    };

    _proto.fallback = function fallback(id, schema) {
      return this._fallbackStrategy(id, schema);
    };

    _proto.normalize = function normalize(input, parent, key, visit, addEntity, visitedEntities) {
      var _this = this;

      var id = this.getId(input, parent, key);
      var entityType = this.key;

      if (!(entityType in visitedEntities)) {
        visitedEntities[entityType] = {};
      }

      if (!(id in visitedEntities[entityType])) {
        visitedEntities[entityType][id] = [];
      }

      if (visitedEntities[entityType][id].some(function (entity) {
        return entity === input;
      })) {
        return id;
      }

      visitedEntities[entityType][id].push(input);

      var processedEntity = this._processStrategy(input, parent, key);

      Object.keys(this.schema).forEach(function (key) {
        if (processedEntity.hasOwnProperty(key) && typeof processedEntity[key] === 'object') {
          var schema = _this.schema[key];
          var resolvedSchema = typeof schema === 'function' ? schema(input) : schema;
          processedEntity[key] = visit(processedEntity[key], processedEntity, key, resolvedSchema, addEntity, visitedEntities);
        }
      });
      addEntity(this, processedEntity, input, parent, key);
      return id;
    };

    _proto.denormalize = function denormalize(entity, unvisit) {
      var _this2 = this;

      if (isImmutable(entity)) {
        return denormalizeImmutable(this.schema, entity, unvisit);
      }

      Object.keys(this.schema).forEach(function (key) {
        if (entity.hasOwnProperty(key)) {
          var schema = _this2.schema[key];
          entity[key] = unvisit(entity[key], schema);
        }
      });
      return entity;
    };

    _createClass(EntitySchema, [{
      key: "key",
      get: function get() {
        return this._key;
      }
    }, {
      key: "idAttribute",
      get: function get() {
        return this._idAttribute;
      }
    }]);

    return EntitySchema;
  }();

  var PolymorphicSchema = /*#__PURE__*/function () {
    function PolymorphicSchema(definition, schemaAttribute) {
      if (schemaAttribute) {
        this._schemaAttribute = typeof schemaAttribute === 'string' ? function (input) {
          return input[schemaAttribute];
        } : schemaAttribute;
      }

      this.define(definition);
    }

    var _proto = PolymorphicSchema.prototype;

    _proto.define = function define(definition) {
      this.schema = definition;
    };

    _proto.getSchemaAttribute = function getSchemaAttribute(input, parent, key) {
      return !this.isSingleSchema && this._schemaAttribute(input, parent, key);
    };

    _proto.inferSchema = function inferSchema(input, parent, key) {
      if (this.isSingleSchema) {
        return this.schema;
      }

      var attr = this.getSchemaAttribute(input, parent, key);
      return this.schema[attr];
    };

    _proto.normalizeValue = function normalizeValue(value, parent, key, visit, addEntity, visitedEntities) {
      var schema = this.inferSchema(value, parent, key);

      if (!schema) {
        return value;
      }

      var normalizedValue = visit(value, parent, key, schema, addEntity, visitedEntities);
      return this.isSingleSchema || normalizedValue === undefined || normalizedValue === null ? normalizedValue : {
        id: normalizedValue,
        schema: this.getSchemaAttribute(value, parent, key)
      };
    };

    _proto.denormalizeValue = function denormalizeValue(value, unvisit) {
      var schemaKey = isImmutable(value) ? value.get('schema') : value.schema;

      if (!this.isSingleSchema && !schemaKey) {
        return value;
      }

      var id = this.isSingleSchema ? undefined : isImmutable(value) ? value.get('id') : value.id;
      var schema = this.isSingleSchema ? this.schema : this.schema[schemaKey];
      return unvisit(id || value, schema);
    };

    _createClass(PolymorphicSchema, [{
      key: "isSingleSchema",
      get: function get() {
        return !this._schemaAttribute;
      }
    }]);

    return PolymorphicSchema;
  }();

  var UnionSchema = /*#__PURE__*/function (_PolymorphicSchema) {
    _inheritsLoose(UnionSchema, _PolymorphicSchema);

    function UnionSchema(definition, schemaAttribute) {
      if (!schemaAttribute) {
        throw new Error('Expected option "schemaAttribute" not found on UnionSchema.');
      }

      return _PolymorphicSchema.call(this, definition, schemaAttribute) || this;
    }

    var _proto = UnionSchema.prototype;

    _proto.normalize = function normalize(input, parent, key, visit, addEntity, visitedEntities) {
      return this.normalizeValue(input, parent, key, visit, addEntity, visitedEntities);
    };

    _proto.denormalize = function denormalize(input, unvisit) {
      return this.denormalizeValue(input, unvisit);
    };

    return UnionSchema;
  }(PolymorphicSchema);

  var ValuesSchema = /*#__PURE__*/function (_PolymorphicSchema) {
    _inheritsLoose(ValuesSchema, _PolymorphicSchema);

    function ValuesSchema() {
      return _PolymorphicSchema.apply(this, arguments) || this;
    }

    var _proto = ValuesSchema.prototype;

    _proto.normalize = function normalize(input, parent, key, visit, addEntity, visitedEntities) {
      var _this = this;

      return Object.keys(input).reduce(function (output, key, index) {
        var _extends2;

        var value = input[key];
        return value !== undefined && value !== null ? _extends({}, output, (_extends2 = {}, _extends2[key] = _this.normalizeValue(value, input, key, visit, addEntity, visitedEntities), _extends2)) : output;
      }, {});
    };

    _proto.denormalize = function denormalize(input, unvisit) {
      var _this2 = this;

      return Object.keys(input).reduce(function (output, key) {
        var _extends3;

        var entityOrId = input[key];
        return _extends({}, output, (_extends3 = {}, _extends3[key] = _this2.denormalizeValue(entityOrId, unvisit), _extends3));
      }, {});
    };

    return ValuesSchema;
  }(PolymorphicSchema);

  var validateSchema = function validateSchema(definition) {
    var isArray = Array.isArray(definition);

    if (isArray && definition.length > 1) {
      throw new Error("Expected schema definition to be a single schema, but found " + definition.length + ".");
    }

    return definition[0];
  };

  var getValues = function getValues(input) {
    return Array.isArray(input) ? input : Object.keys(input).map(function (key) {
      return input[key];
    });
  };

  var normalize = function normalize(schema, input, parent, key, visit, addEntity, visitedEntities) {
    schema = validateSchema(schema);
    var values = getValues(input); // Special case: Arrays pass *their* parent on to their children, since there
    // is not any special information that can be gathered from themselves directly

    return values.map(function (value, index) {
      return visit(value, parent, key, schema, addEntity, visitedEntities);
    });
  };
  var denormalize = function denormalize(schema, input, unvisit) {
    schema = validateSchema(schema);
    return input && input.map ? input.map(function (entityOrId) {
      return unvisit(entityOrId, schema);
    }) : input;
  };

  var ArraySchema = /*#__PURE__*/function (_PolymorphicSchema) {
    _inheritsLoose(ArraySchema, _PolymorphicSchema);

    function ArraySchema() {
      return _PolymorphicSchema.apply(this, arguments) || this;
    }

    var _proto = ArraySchema.prototype;

    _proto.normalize = function normalize(input, parent, key, visit, addEntity, visitedEntities) {
      var _this = this;

      var values = getValues(input);
      return values.map(function (value, index) {
        return _this.normalizeValue(value, parent, key, visit, addEntity, visitedEntities);
      }).filter(function (value) {
        return value !== undefined && value !== null;
      });
    };

    _proto.denormalize = function denormalize(input, unvisit) {
      var _this2 = this;

      return input && input.map ? input.map(function (value) {
        return _this2.denormalizeValue(value, unvisit);
      }) : input;
    };

    return ArraySchema;
  }(PolymorphicSchema);

  var _normalize = function normalize(schema, input, parent, key, visit, addEntity, visitedEntities) {
    var object = _extends({}, input);

    Object.keys(schema).forEach(function (key) {
      var localSchema = schema[key];
      var resolvedLocalSchema = typeof localSchema === 'function' ? localSchema(input) : localSchema;
      var value = visit(input[key], input, key, resolvedLocalSchema, addEntity, visitedEntities);

      if (value === undefined || value === null) {
        delete object[key];
      } else {
        object[key] = value;
      }
    });
    return object;
  };

  var _denormalize = function denormalize(schema, input, unvisit) {
    if (isImmutable(input)) {
      return denormalizeImmutable(schema, input, unvisit);
    }

    var object = _extends({}, input);

    Object.keys(schema).forEach(function (key) {
      if (object[key] != null) {
        object[key] = unvisit(object[key], schema[key]);
      }
    });
    return object;
  };

  var ObjectSchema = /*#__PURE__*/function () {
    function ObjectSchema(definition) {
      this.define(definition);
    }

    var _proto = ObjectSchema.prototype;

    _proto.define = function define(definition) {
      this.schema = Object.keys(definition).reduce(function (entitySchema, key) {
        var _extends2;

        var schema = definition[key];
        return _extends({}, entitySchema, (_extends2 = {}, _extends2[key] = schema, _extends2));
      }, this.schema || {});
    };

    _proto.normalize = function normalize() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _normalize.apply(void 0, [this.schema].concat(args));
    };

    _proto.denormalize = function denormalize() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _denormalize.apply(void 0, [this.schema].concat(args));
    };

    return ObjectSchema;
  }();

  var visit = function visit(value, parent, key, schema, addEntity, visitedEntities) {
    if (typeof value !== 'object' || !value) {
      return value;
    }

    if (typeof schema === 'object' && (!schema.normalize || typeof schema.normalize !== 'function')) {
      var method = Array.isArray(schema) ? normalize : _normalize;
      return method(schema, value, parent, key, visit, addEntity, visitedEntities);
    }

    return schema.normalize(value, parent, key, visit, addEntity, visitedEntities);
  };

  var addEntities = function addEntities(entities) {
    return function (schema, processedEntity, value, parent, key) {
      var schemaKey = schema.key;
      var id = schema.getId(value, parent, key);

      if (!(schemaKey in entities)) {
        entities[schemaKey] = {};
      }

      var existingEntity = entities[schemaKey][id];

      if (existingEntity) {
        entities[schemaKey][id] = schema.merge(existingEntity, processedEntity);
      } else {
        entities[schemaKey][id] = processedEntity;
      }
    };
  };

  var schema = {
    Array: ArraySchema,
    Entity: EntitySchema,
    Object: ObjectSchema,
    Union: UnionSchema,
    Values: ValuesSchema
  };
  var normalize$1 = function normalize(input, schema) {
    if (!input || typeof input !== 'object') {
      throw new Error("Unexpected input given to normalize. Expected type to be \"object\", found \"" + (input === null ? 'null' : typeof input) + "\".");
    }

    var entities = {};
    var addEntity = addEntities(entities);
    var visitedEntities = {};
    var result = visit(input, input, null, schema, addEntity, visitedEntities);
    return {
      entities: entities,
      result: result
    };
  };

  var unvisitEntity = function unvisitEntity(id, schema, unvisit, getEntity, cache) {
    var entity = getEntity(id, schema);

    if (entity === undefined && schema instanceof EntitySchema) {
      entity = schema.fallback(id, schema);
    }

    if (typeof entity !== 'object' || entity === null) {
      return entity;
    }

    if (!cache[schema.key]) {
      cache[schema.key] = {};
    }

    if (!cache[schema.key][id]) {
      // Ensure we don't mutate it non-immutable objects
      var entityCopy = isImmutable(entity) ? entity : _extends({}, entity); // Need to set this first so that if it is referenced further within the
      // denormalization the reference will already exist.

      cache[schema.key][id] = entityCopy;
      cache[schema.key][id] = schema.denormalize(entityCopy, unvisit);
    }

    return cache[schema.key][id];
  };

  var getUnvisit = function getUnvisit(entities) {
    var cache = {};
    var getEntity = getEntities(entities);
    return function unvisit(input, schema) {
      if (typeof schema === 'object' && (!schema.denormalize || typeof schema.denormalize !== 'function')) {
        var method = Array.isArray(schema) ? denormalize : _denormalize;
        return method(schema, input, unvisit);
      }

      if (input === undefined || input === null) {
        return input;
      }

      if (schema instanceof EntitySchema) {
        return unvisitEntity(input, schema, unvisit, getEntity, cache);
      }

      return schema.denormalize(input, unvisit);
    };
  };

  var getEntities = function getEntities(entities) {
    var isImmutable$1 = isImmutable(entities);
    return function (entityOrId, schema) {
      var schemaKey = schema.key;

      if (typeof entityOrId === 'object') {
        return entityOrId;
      }

      if (isImmutable$1) {
        return entities.getIn([schemaKey, entityOrId.toString()]);
      }

      return entities[schemaKey] && entities[schemaKey][entityOrId];
    };
  };

  var denormalize$1 = function denormalize(input, schema, entities) {
    if (typeof input !== 'undefined') {
      return getUnvisit(entities)(input, schema);
    }
  };

  exports.denormalize = denormalize$1;
  exports.normalize = normalize$1;
  exports.schema = schema;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
