// Web Audio procedural synthesizer engine for Y2K Cyber/Hyperpop preview playback
// Used when tracks don't have external audio URLs

class CyberSynthEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private preset: string = 'hyperpop-arp';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3; // safe comfortable volume

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      // Clamp between 0 and 1
      const safeVal = Math.max(0, Math.min(1, val)) * 0.4;
      this.masterGain.gain.setTargetAtTime(safeVal, this.ctx.currentTime, 0.05);
    }
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public start(preset: string = 'hyperpop-arp', bpm: number = 175) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.isPlaying = true;
    this.preset = preset;
    this.currentStep = 0;

    const intervalMs = (60 / bpm / 4) * 1000; // 16th notes
    this.timerId = window.setInterval(() => {
      this.step();
    }, intervalMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private step() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const time = this.ctx.currentTime;
    const step = this.currentStep % 16;
    this.currentStep++;

    // Melody scale (F# Minor / A Major cyber scale)
    const notes: Record<string, number> = {
      'F#3': 185.00, 'A3': 220.00, 'B3': 246.94, 'C#4': 277.18, 'E4': 329.63,
      'F#4': 369.99, 'A4': 440.00, 'B4': 493.88, 'C#5': 554.37, 'E5': 659.25, 'F#5': 739.99
    };

    // Kick drum on quarters (0, 4, 8, 12)
    if (step % 4 === 0) {
      this.playKick(time);
    }

    // Hi-hats on offbeats (2, 6, 10, 14) and 16ths
    if (step % 2 === 1) {
      this.playHiHat(time);
    }

    // Synth Patterns depending on preset
    let noteName = 'F#4';
    if (this.preset === 'hyperpop-arp') {
      const arp = ['F#4', 'A4', 'C#5', 'E5', 'F#5', 'E5', 'C#5', 'A4', 'B4', 'C#5', 'E5', 'F#5', 'A4', 'B4', 'C#5', 'F#4'];
      noteName = arp[step];
      this.playSawPluck(time, notes[noteName] || 440, 0.12);
    } else if (this.preset === 'cyber-trance') {
      const trance = ['F#4', 'F#4', 'A4', 'F#4', 'E4', 'F#4', 'B4', 'A4', 'C#5', 'C#5', 'B4', 'A4', 'F#4', 'E4', 'F#4', 'F#4'];
      noteName = trance[step];
      this.playTranceLead(time, notes[noteName] || 440, 0.16);
    } else if (this.preset === 'chiptune-bass') {
      const chip = ['F#3', 'F#3', 'A3', 'F#3', 'B3', 'A3', 'F#3', 'C#4', 'F#3', 'F#3', 'A3', 'F#3', 'E4', 'C#4', 'B3', 'A3'];
      noteName = chip[step];
      this.playSquareChip(time, notes[noteName] || 220, 0.08);
    } else if (this.preset === 'digital-glitch') {
      if (step % 3 === 0 || step === 7 || step === 15) {
        this.playGlitchSound(time);
      }
      const glitchNotes = ['C#5', 'F#5', 'B4', 'E5'];
      if (step % 2 === 0) {
        this.playSawPluck(time, notes[glitchNotes[(step / 2) % 4]] || 554, 0.08);
      }
    } else {
      // ambient-pad
      if (step === 0 || step === 8) {
        this.playAmbientPad(time, step === 0 ? 185.00 : 220.00, 1.2);
      }
    }
  }

  private playKick(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  private playHiHat(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(8000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  private playSawPluck(time: number, freq: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, time);
    filter.frequency.exponentialRampToValueAtTime(800, time + dur);
    filter.Q.value = 4;

    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }

  private playTranceLead(time: number, freq: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;
    // Detuned supersaw emulation (2 oscillators)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 1.012, time); // detuned

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(4500, time);
    filter.Q.value = 6;

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + dur);
    osc2.stop(time + dur);
  }

  private playSquareChip(time: number, freq: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }

  private playGlitchSound(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1200 + Math.random() * 2000, time);
    osc.frequency.exponentialRampToValueAtTime(200, time + 0.05);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.05);
  }

  private playAmbientPad(time: number, freq: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.01, time);
    gain.gain.linearRampToValueAtTime(0.2, time + dur * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }
}

export const cyberSynth = typeof window !== 'undefined' ? new CyberSynthEngine() : null;
