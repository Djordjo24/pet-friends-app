import { useEffect, useRef, useState } from "react";
import { Assets, Texture, Ticker, Sprite } from "pixi.js";
import { useTick } from "@pixi/react";
import bone from "../../assets/images/bone.png";

const Bone = () => {
  const spriteRef = useRef<Sprite | null>(null);

  const [texture, setTexture] = useState(Texture.EMPTY);
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 380 });
  const [vel, setVel] = useState({ x: 5, y: -8 });
  const gravity = 0.1;
  const ground = 380;

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load(bone).then((result) => {
        setTexture(result);
      });
    }
  }, [texture]);

  useTick((ticker: Ticker) => {
    if (spriteRef.current && isActive) {
      setPos((prevPos) => {
        if (!spriteRef.current) return prevPos;

        let { x, y } = prevPos;
        let vy = vel.y;

        if (x < window.innerWidth - 80)
          spriteRef.current.rotation += 0.06 * ticker.deltaTime;

        x += vel.x;
        y += vy;

        vy += gravity;

        if (y >= ground) {
          y = ground;
          vy = 0;
        }

        if (x >= window.innerWidth - 80) {
          x = window.innerWidth - 80;
        }

        setVel({ ...vel, y: vy });

        return { x, y };
      });
    }
  });

  return (
    <pixiSprite
      ref={spriteRef}
      anchor={0.5}
      eventMode={"static"}
      onClick={() => setIsActive(!isActive)}
      scale={0.03}
      texture={texture}
      x={pos.x}
      y={pos.y}
      cursor="pointer"
    />
  );
};

export default Bone;
