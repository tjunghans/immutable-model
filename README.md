# Frontend Model Core component

This is a base class for a model that wraps an [immutable.js][]
model instance such as [Record][]. It inherits from [EventEmitter][] to
be able to emit change events when the model changes. The constructor
expects an instance of immutable.js' [Record][] class. The optional
second argument can be an object containing data, which is passt to the
[Record][] instance.

## Install

```js
npm install immutable-model
```

## Usage

```js
import { Record } from 'immutable';
import Model from 'immutable-model';

const MyImmutable = new Record({
  id: '',
  name: ''
});

// Create a class with getters, setters and other helper methods
class MyModel extends Model {
  constructor(initialData = {}) {
    super(MyImmutable, initialData);)
  }

  getId() {
    return this.get('id');
  }

  setId(id) {
    this.set('id', id);
  }
}

// set initial data
const myModel = new MyModel({ id: 'foo' });

// listen to changes
myModel.on('change', (model, data) => {
  console.log(data);
});

```

## Class Methods

- `get(fieldName)`: returns the value of the Record field.
- `set(fieldName, value, emitChange?)`: applies value to fieldName.
  If emitChange (default = true) is set to false no `change`
  event is emitted.
- `set(fields, emitChange?)`: if the first argument is an object
  of field names and values, the second argument value becomes obsolete
  and emitChange takes its place.


## Class Events

- `change(model, data)`: Where `model` is an immutable model instance
  and `data`


[EventEmitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[immutable.js]: https://facebook.github.io/immutable-js
[Record]: https://facebook.github.io/immutable-js/docs/#/Record
