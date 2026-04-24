import { slides } from "./slides";
import { renderSlide } from "./renderer";
import { KanbanIntro } from "./introAnimation";

class KanbanPresentation {
  private current: number = 0;
  private total: number = slides.length;

  private slideContainer!: HTMLElement;
  private progressBar!: HTMLElement;
  private slideCounter!: HTMLElement;
  private prevBtn!: HTMLElement;
  private nextBtn!: HTMLElement;
  private navDots!: HTMLElement;
  private currentIntro: KanbanIntro | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.slideContainer = document.getElementById("slide-container")!;
    this.progressBar = document.getElementById("progress-bar")!;
    this.slideCounter = document.getElementById("slide-counter")!;
    this.prevBtn = document.getElementById("prev-btn")!;
    this.nextBtn = document.getElementById("next-btn")!;
    this.navDots = document.getElementById("nav-dots")!;

    this.buildDots();
    this.render();
    this.bindEvents();
  }

  private buildDots(): void {
    this.navDots.innerHTML = slides
      .map(
        (_, i) =>
          `<button class="dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
      )
      .join("");

    this.navDots.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const idx = parseInt((e.target as HTMLElement).dataset.index || "0");
        this.goTo(idx);
      });
    });
  }

  private render(): void {
    const slide = slides[this.current];

    // Animate out
    this.slideContainer.classList.add("slide-exit");

    setTimeout(() => {
      this.slideContainer.innerHTML = renderSlide(slide);
      this.slideContainer.classList.remove("slide-exit");
      this.slideContainer.classList.add("slide-enter");

      setTimeout(() => {
        this.slideContainer.classList.remove("slide-enter");
        this.handleIntroAnimation(slide.type);
      }, 400);
    }, 200);

    // Update UI
    const progress = ((this.current + 1) / this.total) * 100;
    this.progressBar.style.width = `${progress}%`;
    this.slideCounter.textContent = `${this.current + 1} / ${this.total}`;

    this.prevBtn.classList.toggle("disabled", this.current === 0);
    this.nextBtn.classList.toggle("disabled", this.current === this.total - 1);

    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === this.current);
    });

    document.title = `Kanban — ${slide.title}`;
  }

  private handleIntroAnimation(type: string): void {
    if (this.currentIntro) {
      this.currentIntro.destroy();
      this.currentIntro = null;
    }

    if (type === "intro") {
      const canvas = document.getElementById("introCanvas") as HTMLCanvasElement;
      if (canvas) {
        this.currentIntro = new KanbanIntro({
          canvasId: "introCanvas",
          audioSrc: "/World_Martial_Arts_Tournament_title_card.mp3",
          duration: 20,
          kanji: "看板",
          romaji: "kanban",
          mainColor: "#FF9500",
          glowColor: "#FF4500",
          onComplete: () => {
            this.goTo(this.current + 1);
          }
        });

        const instruction = document.getElementById("instruction");
        const clickHandler = () => {
          this.currentIntro?.start();
          if (instruction) instruction.style.display = "none";
          canvas.removeEventListener("click", clickHandler);
        };
        canvas.addEventListener("click", clickHandler);
      }
    }
  }

  private goTo(index: number): void {
    if (index < 0 || index >= this.total) return;
    this.current = index;
    this.render();
  }

  private bindEvents(): void {
    this.prevBtn.addEventListener("click", () => this.goTo(this.current - 1));
    this.nextBtn.addEventListener("click", () => this.goTo(this.current + 1));

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        this.goTo(this.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        this.goTo(this.current - 1);
      } else if (e.key === "Home") {
        this.goTo(0);
      } else if (e.key === "End") {
        this.goTo(this.total - 1);
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    document.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });
    document.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.goTo(this.current + 1) : this.goTo(this.current - 1);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new KanbanPresentation();
});
