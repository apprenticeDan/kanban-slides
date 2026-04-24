export interface AnimationConfig {
    canvasId: string;
    audioSrc: string;
    duration: number;
    kanji: string;
    romaji: string;
    mainColor: string;
    glowColor: string;
    onComplete?: () => void;
}

export class KanbanIntro {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private audio: HTMLAudioElement;
    private startTime: number | null = null;
    private config: AnimationConfig;
    private resizeHandler: () => void;
    private isDestroyed: boolean = false;

    constructor(config: AnimationConfig) {
        this.config = config;
        this.canvas = document.getElementById(config.canvasId) as HTMLCanvasElement;
        
        if (!this.canvas) {
            throw new Error(`Canvas with id ${config.canvasId} not found`);
        }

        this.ctx = this.canvas.getContext('2d')!;
        
        // Configuración de audio
        this.audio = new Audio(config.audioSrc);
        this.audio.preload = "auto";
        
        this.resizeHandler = () => this.resize();
        this.resize();
        window.addEventListener('resize', this.resizeHandler);
        
        // Dibujar el estado inicial oscuro
        this.draw(0);
    }

    private resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Redibujar si la animación aún no ha empezado
        if (this.startTime === null) {
            this.draw(0);
        }
    }

    public start() {
        if (this.startTime !== null || this.isDestroyed) return;

        console.log("Iniciando secuencia intro...");
        
        // Intentar reproducir audio sin bloquear el resto
        this.audio.play().catch(err => {
            console.warn("Audio bloqueado o no encontrado, iniciando solo visual:", err);
        });

        this.startTime = performance.now();
        this.animate();
    }
    
    public destroy() {
        this.isDestroyed = true;
        window.removeEventListener('resize', this.resizeHandler);
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    private animate() {
        if (this.isDestroyed) return;

        const now = performance.now();
        const elapsed = (now - this.startTime!) / 1000;

        this.draw(elapsed);

        if (elapsed < this.config.duration) {
            requestAnimationFrame(() => this.animate());
        } else if (this.config.onComplete) {
            this.config.onComplete();
        }
    }

    private draw(elapsed: number) {
        if (this.isDestroyed) return;
        
        const { ctx, canvas, config } = this;

        const zoomDuration = config.duration - 3.5;
        const zoomProgress = Math.min(elapsed / zoomDuration, 0.92);
        const romajiProgress = Math.max((elapsed - zoomDuration) / 3, 0);

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // --- ZOOM ---
        const scale = 6 - (5 * zoomProgress);
        ctx.scale(scale, scale);

        ctx.shadowColor = config.glowColor;
        ctx.shadowBlur = 20;

        // Círculo
        ctx.beginPath();
        ctx.arc(0, 0, 150, 0, Math.PI * 2);
        ctx.lineWidth = 8;
        ctx.strokeStyle = config.mainColor;
        ctx.globalAlpha = Math.min(zoomProgress * 1.5, 1);
        ctx.stroke();

        // Kanji
        ctx.font = "bold 100px serif";
        ctx.fillStyle = config.mainColor;
        ctx.globalAlpha = Math.min(zoomProgress * 2, 1);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(config.kanji, 0, 0);

        // --- ROMAJI ---
        if (zoomProgress >= 1) {
            ctx.globalAlpha = Math.min(romajiProgress, 1);
            ctx.font = "30px sans-serif";
            ctx.fillStyle = "#ffffff";
            ctx.shadowBlur = 10 + (20 * romajiProgress);
            ctx.fillText(config.romaji, 0, 200);
        }
        
        ctx.restore();
    }
}
