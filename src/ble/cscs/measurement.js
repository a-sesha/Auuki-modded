import { CSCMeasurement } from './cycling-speed-cadence-measurement.js';
import { RevsOverTime } from './revs-over-time.js';

const wheelPresent = (flags) => (flags & 0x01) === 0x01;
const crankPresent = (flags) => (flags & 0x02) === 0x02;

const _ = {
    flagsIndex: () => 0,
    cumulativeWheelRevolutionsIndex: (flags) => wheelPresent(flags) ? 1 : undefined,
    lastWheelEventTimeIndex: (flags) => wheelPresent(flags) ? 5 : undefined,
    cumulativeCrankRevolutionsIndex: (flags) => {
        if(!crankPresent(flags)) return undefined;
        return wheelPresent(flags) ? 7 : 1;
    },
    lastCrankEventTimeIndex: (flags) => {
        if(!crankPresent(flags)) return undefined;
        return wheelPresent(flags) ? 9 : 3;
    },
    readFlags: (view) => view.getUint8(0),
    readCumulativeWheelRevolutions: (view) => {
        const flags = _.readFlags(view);
        const i = _.cumulativeWheelRevolutionsIndex(flags);
        return i === undefined ? undefined : view.getUint32(i, true);
    },
    readLastWheelEventTime: (view) => {
        const flags = _.readFlags(view);
        const i = _.lastWheelEventTimeIndex(flags);
        return i === undefined ? undefined : view.getUint16(i, true);
    },
    readCumulativeCrankRevolutions: (view) => {
        const flags = _.readFlags(view);
        const i = _.cumulativeCrankRevolutionsIndex(flags);
        return i === undefined ? undefined : view.getUint16(i, true);
    },
    readLastCrankEventTime: (view) => {
        const flags = _.readFlags(view);
        const i = _.lastCrankEventTimeIndex(flags);
        return i === undefined ? undefined : view.getUint16(i, true);
    },
};

function Cadence() {
    return RevsOverTime({
        resolution: 1024,
        maxRevs: 2**16,
        maxTime: 2**16,
        rate: 512,
        format: (x) => Math.round(x * 60),
    });
}

function Speed(args = {}) {
    const wheelCircumference = args.wheelCircumference ?? 2.105;
    return RevsOverTime({
        resolution: 2048,
        maxRevs: 2**32,
        maxTime: 2**16,
        rate: 1024,
        format: (x) => Math.round(x * wheelCircumference * 3.6 * 100) / 100,
    });
}

function Measurement() {
    const speed = Speed();
    const cadence = Cadence();

    function reset() {
        return {
            wheel: speed.reset(),
            crank: cadence.reset(),
        };
    }

    function decode(view) {
        const flags = _.readFlags(view);
        const wheelRevolutions = _.readCumulativeWheelRevolutions(view);
        const wheelEvent = _.readLastWheelEventTime(view);
        const crankRevolutions = _.readCumulativeCrankRevolutions(view);
        const crankEvent = _.readLastCrankEventTime(view);

        return {
            wheelRevolutions,
            wheelEvent,
            speed: speed.calculate(wheelRevolutions, wheelEvent),
            crankRevolutions,
            crankEvent,
            cadence: cadence.calculate(crankRevolutions, crankEvent),
        };
    }

    return {
        speed,
        cadence,
        reset,
        decode,
    };
}

export {
    Measurement,
    Speed,
    Cadence,
    _,
};
