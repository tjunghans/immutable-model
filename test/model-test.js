/*eslint-env mocha*/
import assert from 'assert';
import * as sinon from 'sinon';
import { Record } from 'immutable';
import Model from '../lib/model';

function createModel(immutable, data) {
  return new Model(immutable, data);
}

describe('Model', () => {

  it('it throws without args', () => {
    assert.throws(() => {
      createModel();
    });
  });

  it('accepts immutable object and data', () => {
    const myImmutable = new Record({ foo: '' });
    const m = createModel(myImmutable, { foo: 'bar' });

    assert.equal(m.data.foo, 'bar');
  });

  it('sets field', () => {
    const m = createModel(new Record({ foo: '' }));
    const spy = sinon.spy();
    m.on('change', spy);

    m.set('foo', 'bar');

    assert.equal(m.data.foo, 'bar');
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, m.model, m.data);
  });

  it('sets fields', () => {
    const m = createModel(new Record({ foo: '', bar: '' }));
    const spy = sinon.spy();
    m.on('change', spy);

    m.set({ foo: 'footbal', bar: 'barber' });

    assert.deepEqual(m.data, { foo: 'footbal', bar: 'barber' });
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, m.model, m.data);
  });

  it('does not emit `change` event', () => {
    const m = createModel(new Record({ foo: '' }));
    const spy = sinon.spy();
    m.on('change', spy);

    m.set('foo', 'bar', false);

    assert.equal(m.data.foo, 'bar');
    sinon.assert.notCalled(spy);
  });

  it('gets field value', () => {
    const m = createModel(new Record({ foo: '' }), { foo: 'bar' });

    assert.equal(m.get('foo'), 'bar');
  });

  it('has immutable model', () => {
    const m = createModel(new Record({ foo: '' }));
    const a = m.model;

    m.set('foo', 'bar');

    const b = m.model;

    assert.notEqual(a, b);
  });
});
