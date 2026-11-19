import FoodImage from "./FoodImage";
import { LOCAL_FALLBACK, photoUrl } from "@/config/images";

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark">
      <FoodImage
        eager
        src={photoUrl("hero", 1600, 800)}
        fallback={LOCAL_FALLBACK.generic}
        alt="A table full of delicious dishes"
        className="absolute inset-0 -z-10 h-full w-full opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
      <div className="container mx-auto px-4 pb-36 pt-20 md:pb-44 md:pt-28">
        <span className="inline-block rounded-full bg-brand-amber/90 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
          Free delivery on your first order
        </span>
        <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          Delicious food, <span className="text-brand-amber">delivered fast.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/80">
          Burgers, pizza, pasta, sushi and more from the best restaurants near
          you – just a few clicks away.
        </p>
      </div>
    </section>
  );
};

export default Hero;
