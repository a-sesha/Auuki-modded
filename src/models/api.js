import { OAuthService, DialogMsg, stateParam, } from './enums.js';
import strava from './strava.js';
import intervals from './intervals.js';
import trainingPeaks from './training-peaks.js';


//

function API() {
    const router = Router();

    async function start() {
        router.start();
    }

    function stop() {
    }

    return Object.freeze({
        strava,
        intervals,
        trainingPeaks,
        start,
        stop,
    });
}

// TODO: create a proper minimalist router
function Router(args = {}) {

    async function start() {
        const params = getParams();
        if(hasParams(params)) {
            console.log(params);
            await onQueryParams(params);
        }
        return;
    }

    function getParams() {
        return (new URL(document.location)).searchParams;
    }

    function hasParams(params) {
        if(params) {
            return params.size > 0;
        } else {
            const params = (new URL(document.location)).searchParams;
            return params.size > 0;
        }
    }

    async function onQueryParams(params) {
        // strava params
        const state  = params.get('state');
        const code   = params.get('code');
        const scope  = params.get('scope');
        const error  = params.get('error');

        // switch
        if(error) {
            console.error(`:api :param :error `, error);
            return true;
        }
        if(!error && (code || scope || state)) {
            const { service, id } = stateParam.decode(state);
            console.log(`:api :onQueryParams service: ${service} id: ${id}`);

            if(service === OAuthService.strava) {
                await strava.paramsHandler({state, code, scope});
            }
            if(service === OAuthService.intervals) {
                await intervals.paramsHandler({state, code, scope});
            }
            if(service === OAuthService.trainingPeaks) {
                await trainingPeaks.paramsHandler({state, code, scope});
            }
            return true;
        }
        // clearParams();
        return false;
    }

    function clearParams() {
        window.history.pushState({}, document.title, window.location.pathname);
    }

    return Object.freeze({
        onQueryParams,
        clearParams,
        start,
    });
}


export default API;

