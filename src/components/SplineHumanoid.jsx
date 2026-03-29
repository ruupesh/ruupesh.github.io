import { lazy, Suspense, useRef, useEffect, useCallback } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function SplineHumanoid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      const canvas = container.querySelector("canvas");
      if (!canvas || canvas._patched) return;
      canvas._patched = true;

      const origGetContext = canvas.getContext.bind(canvas);
      canvas.getContext = function (type, attrs) {
        if (type === "webgl2" || type === "webgl") {
          const ctx = origGetContext(type, { ...attrs, alpha: true });
          if (ctx && !ctx._clearPatched) {
            ctx._clearPatched = true;
            const origClearColor = ctx.clearColor.bind(ctx);
            ctx.clearColor = function (_r, _g, _b, _a) {
              origClearColor(0, 0, 0, 0);
            };
          }
          return ctx;
        }
        return origGetContext(type, attrs);
      };
    });

    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const onLoad = useCallback((splineApp) => {
    if (!splineApp) return;

    // Hide the "logo" group (white text/shapes behind the robot)
    try {
      const logo = splineApp.findObjectByName("logo");
      if (logo) logo.visible = false;
    } catch (e) {
      try {
        const scene = splineApp._scene;
        const hide = (node) => {
          if (node.name === "logo") node.visible = false;
          if (node.children) node.children.forEach(hide);
        };
        if (scene) hide(scene);
      } catch (_) {
        /* ignore */
      }
    }

    // Set background to fully transparent black
    try {
      splineApp.setBackgroundColor({ r: 0, g: 0, b: 0, a: 0 });
    } catch (_) {
      /* ignore */
    }
  }, []);

  return (
    <>
      <style>{`
        .spline-humanoid-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .spline-canvas-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 900px;
          max-height: 900px;
          pointer-events: auto;
        }
        /* Allow clicks to pass through to content below */
        .spline-canvas-wrapper canvas {
          pointer-events: auto !important;
        }
        /* Cover the "Built with Spline" watermark in the canvas */
        .spline-watermark-cover {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 220px;
          height: 55px;
          background: #050510;
          z-index: 10;
          pointer-events: none;
          border-radius: 8px 0 0 0;
        }
      `}</style>
      <div ref={containerRef} className="spline-humanoid-layer">
        <div className="spline-canvas-wrapper">
          <Suspense fallback={null}>
            <Spline
              scene="https://prod.spline.design/1UkCt9ofSBvqYqJA/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
              onLoad={onLoad}
            />
          </Suspense>
          <div className="spline-watermark-cover" />
        </div>
      </div>
    </>
  );
}
