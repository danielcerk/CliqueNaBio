import { useEffect, useRef } from "react";

const imageSources = [
    "/icons/facebook.png",
    "/icons/whatsapp.png",
    "/icons/instagram.png",
    "/icons/pinterest.png",
    "/icons/youtube.png",
    "/icons/image.ico",
];

const BouncingBalls: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";
        class Ball {
          ball: HTMLImageElement;
          x: number = 0;
          y: number = 0;
          dx: number = 0;
          dy: number = 0;
          size: number = 50;
      
          constructor(imageSrc: string) {
              this.ball = document.createElement("img");
              this.ball.src = imageSrc;
              this.ball.classList.add("absolute");
              this.ball.style.width = `${this.size}px`;
              this.ball.style.height = `${this.size}px`;
      
              containerRef.current?.appendChild(this.ball);
      
              setTimeout(() => {
                  if (!containerRef.current) return;
      
                  this.x = Math.random() * (containerRef.current.clientWidth - this.size);
                  this.y = Math.random() * (containerRef.current.clientHeight - this.size);
                  this.dx = (Math.random() - 0.5) * 6;
                  this.dy = (Math.random() - 0.5) * 6;
      
                  this.update(); 
              }, 0);
          }
      
          update() {
              if (!containerRef.current) return;
      
              this.x += this.dx;
              this.y += this.dy;
      
              if (this.x <= 0 || this.x + this.size >= containerRef.current.clientWidth) {
                  this.dx *= -1;
              }
              if (this.y <= 0 || this.y + this.size >= containerRef.current.clientHeight) {
                  this.dy *= -1;
              }
      
              this.ball.style.transform = `translate(${this.x}px, ${this.y}px)`;
              requestAnimationFrame(() => this.update());
          }
      }
      

        const maxBalls = Math.min(imageSources.length, 6);
        for (let i = 0; i < maxBalls; i++) {
            new Ball(imageSources[i]);
        }
    }, []); 

    return <div ref={containerRef} className="w-full h-full opacity-30 absolute overflow-hidden" />;
};

export default BouncingBalls;
