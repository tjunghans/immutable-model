import { EventEmitter } from 'events';

const CHANGE = 'change';

export default class Model extends EventEmitter {
  constructor(ImmutableRecord, initialData = {}) {
    super();
    this.model = new ImmutableRecord(initialData);
    this._setData();
  }

  _setData() {
    this.data = this.model.toJS();
  }

  get(field) {
    return this.model.get(field);
  }

  set(field, value, emitChange = true) {
    if (arguments.length < 3 && arguments[0].toString() === '[object Object]') {
      emitChange = value !== false;
      const fields = field;
      Object.keys(fields).forEach((field) => {
        this.model = this.model.set(field, fields[field]);
      });
    } else {
      this.model = this.model.set(field, value);
    }

    this._setData();
    if (emitChange) {
      this.emit(CHANGE, this.model, this.data);
    }
  }
}
