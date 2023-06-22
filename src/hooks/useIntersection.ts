import { RefObject, useEffect, useRef, useState } from "react";

const useIntersection = (targetRef: RefObject<HTMLElement>) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const intersectingCb: IntersectionObserverCallback = ([entry]) => {
      setIntersecting(entry.isIntersecting);
    };

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(intersectingCb);
    }

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current && observerRef.current) {
        observerRef.current.unobserve(targetRef.current);
      }
    };
  }, [targetRef]);

  return intersecting;
};

export default useIntersection;
