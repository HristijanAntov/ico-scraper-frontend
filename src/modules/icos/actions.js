import * as Api from '../../services/api'

export const RECEIVE_NEW_ICOS = 'RECEIVE_NEW_ICOS'
export const RECEIVE_FULL_DESCRIPTION = 'RECEIVE_FULL_DESCRIPTION'
export const RECEIVE_STATS = 'RECEIVE_STATS'
export const PING = 'PING'
export const Categories = {
  Ongoing: 'ongoing',
  Upcoming: 'upcoming',
  Past: 'past',
}

const ping = () => ({ type: PING })

const receiveNewIcos = icos => ({
  type: RECEIVE_NEW_ICOS,
  icos,
})

const receiveStats = stats => ({
  type: RECEIVE_STATS,
  stats,
})

const receiveFullDescription = (icoId, fullDescription) => ({
  type: RECEIVE_FULL_DESCRIPTION,
  icoId,
  fullDescription,
})

function fetchIcosByCategory(category) {
  return dispatch => Api.fetchIcosByCategory(category).then(({ ok, payload, statusCode }) => {
    if (ok) {
      dispatch(receiveNewIcos(payload))
    } else {
      console.log(`ERROR: Code: ${statusCode}`)
    }
  })
}

export function fetchFullDescription(id) {
  return dispatch => Api.fetchIcoFullDescription(id).then(({ ok, payload, statusCode }) => {
    if (ok) {
      dispatch(receiveFullDescription(id, payload.fullDescription))
    } else {
      console.log(`ERROR: Code: ${statusCode}`)
    }
  })
}

function fetchStats() {
  return dispatch => Api.fetchStats().then(({ ok, payload, statusCode }) => {
    if (ok) {
      dispatch(receiveStats(payload))
      return Promise.resolve({ ok: true, payload })
    } else {
      console.log(`ERROR: Code: ${statusCode}`)
      return Promise.reject({ ok: false, statusCode })
    }
  })
}


/*
  This is a sort of a caching mechanism in order to first fetch the stats, which gives us an
  insight if something new was scraped, and if not we don't do a fetch for a category if we already have 
  the data locally previously fetched
*/

export function manageIcoCategoryFetch(category) {
  return (dispatch, getState) => {
    const { stats: localStats, icos } = getState().IcosReducer
    const categoryIcosCount = icos.filter(ico => ico.category === category).length

    dispatch(fetchStats()).then(({ ok, payload: currentStats, statusCode }) => {
      if (ok) {
        const shouldFetch = (
          localStats[category] !== currentStats[category] ||
          categoryIcosCount !== currentStats[category]
        )

        if (shouldFetch) {
          console.log('Fetching icos')
          dispatch(fetchIcosByCategory(category))
        } else {
          console.log('Pinging')
          dispatch(ping())
        }
      } else {
        console.log(`ERROR: Code: ${statusCode}`)
      }
    })

  }
}