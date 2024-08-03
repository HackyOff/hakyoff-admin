import { useState, useEffect, ReactNode } from 'react';



interface MousePosition {
  x: number;
  y: number;
}
type Props = {
    children: ReactNode
}

const HackerLightEffect = ({ children }: Props) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: -100, y: -100 });

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="  ">
      <div
        className="active:bg-white pointer-events-none z-100 fixed w-[7rem] h-[7rem] bg-primary rounded-full opacity-10 mix-blend-color-dodge"
        style={{
          top: mousePosition.y - 50, // Ajusta a posição para centralizar a luz
          left: mousePosition.x - 50, // Ajusta a posição para centralizar a luz
          transition: 'top 0.05s, left 0.05s',
        }}
      />
      <div className="">{children}</div>
    </div>
  );
};

export default HackerLightEffect;
