import { xf } from '../functions.js';

class Watch extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const self = this;
        this.abortController = new AbortController();
        this.signal = { signal: self.abortController.signal };

        this.dom = {
            start:   document.querySelector('#watch-start'),
            pause:   document.querySelector('#watch-pause'),
            back:    document.querySelector('#watch-back'),
            lap:     document.querySelector('#watch-lap'),
            stepBack: document.querySelector('#watch-step-back'),
            stepNext: document.querySelector('#watch-step-next'),
            extend: document.querySelector('#watch-extend'),
            shorten: document.querySelector('#watch-shorten'),
            finishStep: document.querySelector('#watch-finish-step'),
            workoutPause: document.querySelector('#workout-pause'),
            stop:    document.querySelector('#watch-stop'),
            save:    document.querySelector('#activity-save'),
            // workout: document.querySelector('#start-workout'),
        };

        this.dom.start?.addEventListener('pointerup', this.onStart, this.signal);
        this.dom.pause?.addEventListener('pointerup', this.onPause, this.signal);
        this.dom.back?.addEventListener('pointerup', this.onBack, this.signal);
        this.dom.lap?.addEventListener('pointerup', this.onLap, this.signal);
        this.dom.stepBack?.addEventListener('pointerup', this.onStepBack, this.signal);
        this.dom.stepNext?.addEventListener('pointerup', this.onStepNext, this.signal);
        this.dom.extend?.addEventListener('pointerup', this.onExtend, this.signal);
        this.dom.shorten?.addEventListener('pointerup', this.onShorten, this.signal);
        this.dom.finishStep?.addEventListener('pointerup', this.onFinishStep, this.signal);
        this.dom.workoutPause?.addEventListener('pointerup', this.onWorkoutPause, this.signal);
        this.dom.stop?.addEventListener('pointerup', this.onStop, this.signal);
        // this.dom.workout.addEventListener('pointerup', this.onWorkoutStart);
        this.dom.save?.addEventListener(`pointerup`, this.onSave, this.signal);

        this.renderInit(this.dom);

        xf.sub(`db:watchStatus`, this.onWatchStatus.bind(this), this.signal);
        xf.sub(`db:workoutStatus`, this.onWorkoutStatus.bind(this), this.signal);
    }
    disconnectedCallback() {
        this.abortController.abort();
    }
    onStart(e) {
        xf.dispatch('ui:watchStart');
        xf.dispatch('ui:workoutStart');
    }
    onPause(e) { xf.dispatch('ui:watchPause'); }
    onBack(e)  { xf.dispatch('ui:watchBack'); }
    onLap(e)   { xf.dispatch('ui:watchLap'); }
    onStop(e)  { xf.dispatch('ui:watchStop'); }
    onSave(e)  { xf.dispatch('ui:activity:save'); }
    onWorkoutStart(e) { xf.dispatch('ui:workoutStart'); }
    onStepBack(e) { xf.dispatch('ui:workoutStepPrevious'); }
    onStepNext(e) { xf.dispatch('ui:workoutStepNext'); }
    onExtend(e) { xf.dispatch('ui:workoutStepTimeAdd', 30); }
    onShorten(e) { xf.dispatch('ui:workoutStepTimeSubtract', 30); }
    onFinishStep(e) { xf.dispatch('ui:workoutStepFinish'); }
    onWorkoutPause(e) { xf.dispatch('ui:workoutPause'); }
    onWatchStatus(status) {
        if(status === 'started') { this.renderStarted(this.dom); }
        if(status === 'paused')  { this.renderPaused(this.dom);  }
        if(status === 'stopped') { this.renderStopped(this.dom); }
    }
    onWorkoutStatus(status) {
        if(status === 'started') { this.renderWorkoutStarted(this.dom); }
        if(status === 'done')    {  }
    }
    renderInit(dom) {
        dom.pause && (dom.pause.style.display = 'none');
        dom.stop && (dom.stop.style.display  = 'none');
        dom.save && (dom.save.style.display  = 'none');
        dom.lap && (dom.lap.style.display   = 'none');
        dom.back && (dom.back.style.display  = 'none');
        dom.stepBack && (dom.stepBack.style.display = 'none');
        dom.stepNext && (dom.stepNext.style.display = 'none');
        dom.extend && (dom.extend.style.display = 'none');
        dom.shorten && (dom.shorten.style.display = 'none');
        dom.finishStep && (dom.finishStep.style.display = 'none');
        dom.workoutPause && (dom.workoutPause.style.display = 'none');
    };
    renderStarted(dom) {
        dom.start && (dom.start.style.display  = 'none');
        dom.save && (dom.save.style.display   = 'none');
        dom.pause && (dom.pause.style.display  = 'inline-block');
        dom.lap && (dom.lap.style.display    = 'inline-block');
        dom.back && (dom.back.style.display   = 'inline-block');
        dom.stepBack && (dom.stepBack.style.display = 'inline-block');
        dom.stepNext && (dom.stepNext.style.display = 'inline-block');
        dom.extend && (dom.extend.style.display = 'inline-block');
        dom.shorten && (dom.shorten.style.display = 'inline-block');
        dom.finishStep && (dom.finishStep.style.display = 'inline-block');
        dom.workoutPause && (dom.workoutPause.style.display = 'inline-block');
        dom.stop && (dom.stop.style.display   = 'none');
        // dom.stop && (dom.stop.style.display  = 'inline-block');
    };
    renderPaused(dom) {
        dom.pause && (dom.pause.style.display    = 'none');
        // dom.back && (dom.back.style.display = 'none');
        dom.lap && (dom.lap.style.display      = 'none');
        dom.start && (dom.start.style.display    = 'inline-block');
        dom.stop && (dom.stop.style.display     = 'inline-block');
    };
    renderStopped(dom) {
        dom.pause && (dom.pause.style.display  = 'none');
        dom.lap && (dom.lap.style.display    = 'none');
        dom.back && (dom.back.style.display   = 'none');
        dom.stop && (dom.stop.style.display   = 'none');
        dom.save && (dom.save.style.display   = 'inline-block');
        // dom.workout.style.display = 'inline-block');
        dom.start && (dom.start.style.display  = 'inline-block');
    };
    renderWorkoutStarted(dom) {
        // dom.workout.style.display = 'none');
    };
}

customElements.define('watch-control', Watch);

export { Watch };
