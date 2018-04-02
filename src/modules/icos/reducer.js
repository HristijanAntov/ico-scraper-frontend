import { PING, RECEIVE_NEW_ICOS, RECEIVE_FULL_DESCRIPTION, RECEIVE_STATS } from './actions'

const togglePingToken = current => current === 'ping'
  ? 'pong'
  : 'ping'

const initialState = {
  icos: [],
  stats: {},
  /* 
  pingToken is used in order to trigger a symbolic change 
  when we manage caching for icos by category in order the spinner to be
  turned off in the ico-table component in the componentWillReceiveProps lifecycle method */
  pingToken: 'ping'
}

const assign = (o1, o2) => Object.assign({}, o1, o2)

export default function reducer(state = initialState, action) {

  const {
    type,
    icos,
    icoId,
    fullDescription,
    stats,
  } = action

  switch (type) {
    case PING:
      return assign(state, { pingToken: togglePingToken(state.pingToken) })
    case RECEIVE_NEW_ICOS:
      return assign(state, {
        icos: [...state.icos, ...icos],
      })

    case RECEIVE_FULL_DESCRIPTION:
      return assign(state, {
        icos: state.icos.map(ico => ico.id === icoId
          ? assign(ico, { fullDescription })
          : ico
        )
      })

    case RECEIVE_STATS:
      return assign(state, { stats })
    default:
      return state;
  }
};
