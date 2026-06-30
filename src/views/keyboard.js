import { xf, exists } from '../functions.js';
import { ControlMode, } from '../ble/enums.js';

function Keyboard() {

    const isKeyUp    = (code) => code === 'ArrowUp';
    const isKeyDown  = (code) => code === 'ArrowDown';
    const isKeyE     = (code) => code === 'KeyE';
    const isKeyR     = (code) => code === 'KeyR';
    const isKeyS     = (code) => code === 'KeyS';
    const isKeyL     = (code) => code === 'KeyL';
    const isKeySpace = (code) => code === 'Space';
    const isKeyRight = (code) => code === 'ArrowRight';
    const isKeyLeft  = (code) => code === 'ArrowLeft';
    const isKeyEqual = (code) => code === 'Equal' || code === 'NumpadAdd';
    const isKeyMinus = (code) => code === 'Minus' || code === 'NumpadSubtract';
    const isKeyBracketRight = (code) => code === 'BracketRight';
    const isKeyBracketLeft  = (code) => code === 'BracketLeft';

    window.addEventListener('keydown', onKeydown.bind(this));

    function onKeydown(e) {
        let keyCode = e.keyCode;
        let code = e.code;

        if(e.isComposing ||
            keyCode === 229 ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            exists(e.target.form)) {
            return;
        }

        if(isKeyUp(code)) {
            e.preventDefault();
            xf.dispatch('key:up');
        }
        if(isKeyDown(code)) {
            e.preventDefault();
            xf.dispatch('key:down');
        }
        if(isKeyS(code)) {
            xf.dispatch('key:s');
        }
        if(isKeyR(code)) {
            xf.dispatch('key:r');
        }
        if(isKeyE(code)) {
            xf.dispatch('key:e');
        }
        if(isKeyL(code)) {
            xf.dispatch('key:l');
        }
        if(isKeySpace(code)) {
            e.preventDefault();
            xf.dispatch('key:space');
        }
        if(isKeyRight(code)) { e.preventDefault(); xf.dispatch('key:right'); }
        if(isKeyLeft(code)) { e.preventDefault(); xf.dispatch('key:left'); }
        if(isKeyEqual(code)) { e.preventDefault(); xf.dispatch('key:plus'); }
        if(isKeyMinus(code)) { e.preventDefault(); xf.dispatch('key:minus'); }
        if(isKeyBracketRight(code)) { e.preventDefault(); xf.dispatch('key:bracketRight'); }
        if(isKeyBracketLeft(code)) { e.preventDefault(); xf.dispatch('key:bracketLeft'); }
    }
}


function KeyboardControls() {
    let mode = ControlMode.erg;
    xf.sub('db:mode', x => mode = x);

    let watchStatus = 'stopped';
    xf.sub('db:watchStatus', x => watchStatus = x);

    // Modes Inc/Dec
    xf.sub('key:up', e => {
        if(mode === ControlMode.erg) {
            xf.dispatch('ui:power-target-inc');
        }
        if(mode === ControlMode.resistance) {
            xf.dispatch('ui:resistance-target-inc');
        }
        if(mode === ControlMode.sim) {
            xf.dispatch('ui:slope-target-inc');
        }
    });
    xf.sub('key:down', e => {
        if(mode === ControlMode.erg) {
            xf.dispatch('ui:power-target-dec');
        }
        if(mode === ControlMode.resistance) {
            xf.dispatch('ui:resistance-target-dec');
        }
        if(mode === ControlMode.sim) {
            xf.dispatch('ui:slope-target-dec');
        }
    });

    // Modes
    xf.sub('key:e', e => {
        xf.dispatch('ui:mode-set', ControlMode.erg);
    });
    xf.sub('key:r', e => {
        xf.dispatch('ui:mode-set', ControlMode.resistance);
    });
    xf.sub('key:s', e => {
        xf.dispatch('ui:mode-set', ControlMode.sim);
    });

    // Watch
    xf.sub('key:space', e => {
        if(watchStatus === 'paused' || watchStatus === 'stopped') {
            xf.dispatch('ui:watchStart');
            xf.dispatch('ui:workoutStart');
        } else {
            xf.dispatch('ui:watchPause');
        }
    });
    xf.sub('key:l', e => {
        xf.dispatch('ui:watchLap');
    });
    xf.sub('key:right', e => xf.dispatch('ui:workoutStepNext'));
    xf.sub('key:left', e => xf.dispatch('ui:workoutStepPrevious'));
    xf.sub('key:plus', e => xf.dispatch('ui:workoutIntensityInc'));
    xf.sub('key:minus', e => xf.dispatch('ui:workoutIntensityDec'));
    xf.sub('key:bracketRight', e => xf.dispatch('ui:workoutStepTimeAdd', 30));
    xf.sub('key:bracketLeft', e => xf.dispatch('ui:workoutStepTimeSubtract', 30));
}

Keyboard();
KeyboardControls();

export { Keyboard, KeyboardControls };
