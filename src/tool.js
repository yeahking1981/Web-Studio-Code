export function initOptions(defaultOptinos, configOptions) {

    configOptions = configOptions || {};
    for (let key in configOptions) {
        defaultOptinos[key] = configOptions[key];
    }

    return defaultOptinos;

};