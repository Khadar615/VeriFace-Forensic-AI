
import React, { useEffect, useRef } from 'react';
import { Artifact } from '../types/types';

interface HeatmapOverlayProps {
  artifacts: Artifact[];
  visible: boolean;
  activeArtifactId: string | null;
}

const HeatmapOverlay: React.FC<HeatmapOverlayProps> = ({ artifacts, visible, activeArtifactId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!visible) return;

    artifacts.forEach((art) => {
      const isActive = activeArtifactId === art.id;
      const x = (art.location.x / 100) * canvas.width;
      const y = (art.location.y / 100) * canvas.height;
      const radius = (art.location.radius / 100) * Math.min(canvas.width, canvas.height) * 2;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      
      let color = '255, 0, 0'; // Red for high severity
      if (art.severity === 'medium') color = '255, 165, 0'; // Orange
      if (art.severity === 'low') color = '255, 255, 0'; // Yellow

      gradient.addColorStop(0, `rgba(${color}, ${isActive ? 0.7 : 0.4})`);
      gradient.addColorStop(0.6, `rgba(${color}, ${isActive ? 0.3 : 0.1})`);
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      if (isActive) {
        ctx.strokeStyle = `rgba(${color}, 1)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }, [artifacts, visible, activeArtifactId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300"
      width={1000}
      height={1000}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
};

export default HeatmapOverlay;
