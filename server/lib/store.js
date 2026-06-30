const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const DATA_DIR = process.env.DATA_DIR || process.env.RENDER && process.env.RENDER === 'true'
  ? '/data'
  : path.join(__dirname, '..', 'data');
const DATA_FILE = process.env.STORE_FILE || path.join(DATA_DIR, 'store.json');

let state;

function clone(value) {
  if (value == null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map((entry) => clone(entry));
  if (value instanceof Date) return new Date(value.getTime());

  const output = {};
  for (const key of Object.keys(value)) {
    output[key] = clone(value[key]);
  }
  return output;
}

function nowIso() {
  return new Date().toISOString();
}

async function loadState() {
  if (state) return state;

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });

  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    state = {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      leads: Array.isArray(parsed.leads) ? parsed.leads : [],
    };
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    state = { users: [], leads: [] };
  }

  return state;
}

async function saveState() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2));
}

function matches(doc, query = {}) {
  return Object.entries(query).every(([key, value]) => {
    if (key === '$or') {
      return Array.isArray(value) && value.some((entry) => matches(doc, entry));
    }

    const candidate = doc[key];

    if (value instanceof RegExp) {
      return value.test(String(candidate ?? ''));
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return JSON.stringify(candidate) === JSON.stringify(value);
    }

    return candidate === value;
  });
}

function sortDocuments(documents, sortSpec = {}) {
  const entries = Object.entries(sortSpec);
  if (entries.length === 0) return documents;

  const [field, direction] = entries[0];
  const multiplier = direction === -1 ? -1 : 1;

  return [...documents].sort((left, right) => {
    const leftValue = left[field];
    const rightValue = right[field];

    if (leftValue == null && rightValue == null) return 0;
    if (leftValue == null) return 1;
    if (rightValue == null) return -1;

    const leftTime = Date.parse(leftValue);
    const rightTime = Date.parse(rightValue);
    const leftComparable = Number.isNaN(leftTime) ? leftValue : leftTime;
    const rightComparable = Number.isNaN(rightTime) ? rightValue : rightTime;

    if (leftComparable < rightComparable) return -1 * multiplier;
    if (leftComparable > rightComparable) return 1 * multiplier;
    return 0;
  });
}

class Query {
  constructor(executor) {
    this.executor = executor;
  }

  then(resolve, reject) {
    return Promise.resolve()
      .then(() => this.executor())
      .then(resolve, reject);
  }

  catch(reject) {
    return this.then(undefined, reject);
  }

  sort(sortSpec) {
    return new Query(async () => {
      const result = await this.executor();
      return Array.isArray(result) ? sortDocuments(result, sortSpec) : result;
    });
  }

  select(fields) {
    return new Query(async () => {
      const result = await this.executor();
      return result ? result.select(fields) : null;
    });
  }
}

class Document {
  constructor(collectionName, data) {
    Object.defineProperty(this, '_collectionName', {
      value: collectionName,
      enumerable: false,
      writable: false,
    });

    Object.assign(this, clone(data));
  }

  select(fields) {
    const selected = { _id: this._id };

    if (!fields) {
      return clone(this);
    }

    for (const field of fields.split(/\s+/).filter(Boolean)) {
      if (field in this) selected[field] = clone(this[field]);
    }

    return selected;
  }

  async save() {
    const current = await loadState();
    const collection = current[this._collectionName];
    const index = collection.findIndex((entry) => entry._id === this._id);

    const payload = clone(this);
    payload.updatedAt = nowIso();

    if (index === -1) {
      collection.push(payload);
    } else {
      collection[index] = payload;
    }

    Object.assign(this, clone(payload));
    await saveState();
    return this;
  }

  toJSON() {
    return {
      ...clone(this),
    };
  }
}

function wrap(collectionName, data) {
  return data ? new Document(collectionName, data) : null;
}

async function readCollection(name) {
  const current = await loadState();
  return current[name];
}

async function findOne(collectionName, query) {
  const collection = await readCollection(collectionName);
  return wrap(collectionName, collection.find((entry) => matches(entry, query)) || null);
}

async function findById(collectionName, id) {
  const collection = await readCollection(collectionName);
  return wrap(collectionName, collection.find((entry) => entry._id === id) || null);
}

async function create(collectionName, data, normalize) {
  const current = await loadState();
  const collection = current[collectionName];
  const timestamp = nowIso();
  const payload = {
    _id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
    ...normalize(data),
  };

  collection.push(payload);
  await saveState();
  return new Document(collectionName, payload);
}

function find(collectionName, query) {
  return new Query(async () => {
    const collection = await readCollection(collectionName);
    return collection.filter((entry) => matches(entry, query)).map((entry) => new Document(collectionName, entry));
  });
}

async function updateById(collectionName, id, update, { new: returnNew = false } = {}, normalize) {
  const current = await loadState();
  const collection = current[collectionName];
  const index = collection.findIndex((entry) => entry._id === id);
  if (index === -1) return null;

  const original = collection[index];
  const next = {
    ...original,
    ...normalize(update),
    _id: original._id,
    createdAt: original.createdAt,
    updatedAt: nowIso(),
  };

  collection[index] = next;
  await saveState();

  return new Document(collectionName, returnNew ? next : original);
}

async function deleteById(collectionName, id) {
  const current = await loadState();
  const collection = current[collectionName];
  const index = collection.findIndex((entry) => entry._id === id);
  if (index === -1) return null;

  const [removed] = collection.splice(index, 1);
  await saveState();
  return new Document(collectionName, removed);
}

module.exports = {
  Query,
  Document,
  findOne,
  findById,
  find,
  create,
  updateById,
  deleteById,
  loadState,
  saveState,
  STORE_FILE: DATA_FILE,
};