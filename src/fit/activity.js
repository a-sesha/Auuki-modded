import { profiles } from './profiles/profiles.js';

const FIT_EPOCH_OFFSET_SECONDS = 631065600;

function toFitTimestamp(timestamp) {
    return Math.floor(timestamp / 1000) - FIT_EPOCH_OFFSET_SECONDS;
}

function dataMessage(message, local_number, fields) {
    return {
        type: 'data',
        message,
        local_number,
        fields,
    };
}

function FileId(args = {}) {
    return dataMessage('file_id', 0, {
        time_created: toFitTimestamp(args.time_created ?? Date.now()),
        manufacturer: args.manufacturer ?? 255,
        product: args.product ?? 0,
        number: args.number ?? 0,
        type: args.type ?? 4,
    });
}

function Event(args = {}) {
    return dataMessage('event', 2, {
        timestamp: toFitTimestamp(args.timestamp),
        event: args.event ?? 0,
        event_type: args.event_type ?? 0,
        event_group: args.event_group ?? 0,
    });
}

function Activity(args = {}) {
    return dataMessage('activity', 6, {
        timestamp: toFitTimestamp(args.timestamp),
        local_timestamp: args.local_timestamp ?? 0,
        num_sessions: args.num_sessions ?? 1,
        type: args.type ?? profiles.types.activity.values.manual,
        event: args.event ?? profiles.types.event.values.activity,
        event_type: args.event_type ?? profiles.types.event_type.values.stop,
    });
}

function Data(args = {}) {
    const values = args.values ?? {};
    const transforms = args.transforms ?? {};
    const defaults = args.defaults ?? {};
    const definition = args.definition ?? {};
    const fields = (definition.fields ?? []).reduce((acc, field) => {
        const value = values[field.field] ?? defaults[field.field];
        acc[field.field] = transforms[field.field] ? transforms[field.field](value) : value;
        return acc;
    }, {});

    return dataMessage(definition.message, definition.local_number, fields);
}

const activity = {
    toFitTimestamp,
    Data,
    FileId,
    Event,
    Activity,
};

export {
    activity,
};
