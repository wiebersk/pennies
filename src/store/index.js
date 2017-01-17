import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { logger } from '../middleware'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()


export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    logger
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
