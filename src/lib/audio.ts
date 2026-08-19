/**
 * Moteur d'ambiance sonore de la forêt — 100 % synthétisé en WebAudio :
 * nappe grave de sous-bois, vent filtré, pépiements d'oiseaux aléatoires.
 * Aucun fichier audio externe requis.
 */
class ForestAmbience {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private birdTimer: number | null = null;
  playing = false;

  private ensureContext() {
    if (this.ctx) return;
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    this.buildPad();
    this.buildWind();
  }

  /** Nappe grave : trois oscillateurs + filtre passe-bas modulé lentement. */
  private buildPad() {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 380;
    filter.Q.value = 0.6;
    filter.connect(this.master);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 140;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    [
      { f: 55, type: "sine" as OscillatorType, g: 0.05 },
      { f: 110, type: "sine" as OscillatorType, g: 0.035 },
      { f: 164.81, type: "triangle" as OscillatorType, g: 0.018 },
    ].forEach(({ f, type, g }) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = f;
      osc.detune.value = Math.random() * 8 - 4;
      const gain = ctx.createGain();
      gain.gain.value = g;
      osc.connect(gain).connect(filter);
      osc.start();
    });
  }

  /** Vent : bruit blanc en boucle à travers deux bandes filtrées modulées. */
  private buildWind() {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const len = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    const makeWind = (freq: number, q: number, base: number, depth: number, rate: number) => {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = freq;
      bp.Q.value = q;
      const g = ctx.createGain();
      g.gain.value = base;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = rate;
      const lg = ctx.createGain();
      lg.gain.value = depth;
      lfo.connect(lg).connect(g.gain);
      lfo.start();
      src.connect(bp).connect(g).connect(this.master!);
      src.start();
    };
    makeWind(520, 0.7, 0.028, 0.02, 0.11);
    makeWind(1750, 0.9, 0.011, 0.008, 0.07);
  }

  /** Pépiements : courtes envolées de fréquence planifiées aléatoirement. */
  private scheduleBirds() {
    const chirp = () => {
      if (!this.ctx || !this.master || !this.playing) return;
      const ctx = this.ctx;
      const t0 = ctx.currentTime + 0.05;
      const notes = 2 + Math.floor(Math.random() * 3);
      const osc = ctx.createOscillator();
      osc.type = "sine";
      const g = ctx.createGain();
      g.gain.value = 0;
      let pan: AudioNode = g;
      if (typeof ctx.createStereoPanner === "function") {
        const p = ctx.createStereoPanner();
        p.pan.value = Math.random() * 1.6 - 0.8;
        g.connect(p);
        pan = p;
      }
      osc.connect(g);
      pan.connect(this.master);
      let t = t0;
      for (let i = 0; i < notes; i++) {
        const f = 2100 + Math.random() * 1600;
        osc.frequency.setValueAtTime(f, t);
        osc.frequency.exponentialRampToValueAtTime(f * (1.4 + Math.random() * 0.6), t + 0.07);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.028, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        t += 0.16 + Math.random() * 0.1;
      }
      osc.start(t0);
      osc.stop(t + 0.05);
    };
    const loop = () => {
      chirp();
      this.birdTimer = window.setTimeout(loop, 2600 + Math.random() * 5200);
    };
    loop();
  }

  start() {
    this.ensureContext();
    if (!this.ctx || !this.master) return;
    void this.ctx.resume();
    this.playing = true;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(0.6, t + 2.2);
    if (this.birdTimer === null) this.scheduleBirds();
  }

  stop() {
    this.playing = false;
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(0, t + 0.8);
  }
}

export const ambience = new ForestAmbience();
