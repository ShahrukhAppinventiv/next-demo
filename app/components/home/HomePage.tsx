"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Flame,
  Quote,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

const carouselFoods = [
  {
    name: "Classic Margherita Pizza",
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    cuisine: "Italian",
    time: "35 min",
    rating: 4.6,
    description: "Bright basil, melted mozzarella, and a crisp golden crust.",
  },
  {
    name: "Thai Green Curry",
    image: "https://cdn.dummyjson.com/recipe-images/3.webp",
    cuisine: "Thai",
    time: "45 min",
    rating: 4.7,
    description: "Silky coconut curry with fresh herbs and warm spice.",
  },
  {
    name: "Chocolate Brownies",
    image: "https://cdn.dummyjson.com/recipe-images/4.webp",
    cuisine: "Dessert",
    time: "40 min",
    rating: 4.9,
    description: "Fudgy squares with deep chocolate flavor and crisp edges.",
  },
];

const topPicks = [
  {
    name: "Spaghetti Carbonara",
    image: "https://cdn.dummyjson.com/recipe-images/2.webp",
    meta: "Italian comfort",
    rating: 4.8,
    time: "35 min",
  },
  {
    name: "Chicken Biryani",
    image: "https://cdn.dummyjson.com/recipe-images/24.webp",
    meta: "Aromatic rice",
    rating: 4.7,
    time: "60 min",
  },
  {
    name: "Mango Salsa Chicken",
    image: "https://cdn.dummyjson.com/recipe-images/25.webp",
    meta: "Fresh and bright",
    rating: 4.6,
    time: "30 min",
  },
];

const popularThisWeek = [
  {
    name: "Beef Tacos",
    image: "https://cdn.dummyjson.com/recipe-images/9.webp",
    cooks: "2.4k cooks",
    tag: "Weeknight",
  },
  {
    name: "Shrimp Fried Rice",
    image: "https://cdn.dummyjson.com/recipe-images/10.webp",
    cooks: "1.9k cooks",
    tag: "Fast",
  },
  {
    name: "Greek Salad",
    image: "https://cdn.dummyjson.com/recipe-images/6.webp",
    cooks: "1.6k cooks",
    tag: "Fresh",
  },
  {
    name: "Japanese Ramen",
    image: "https://cdn.dummyjson.com/recipe-images/16.webp",
    cooks: "1.3k cooks",
    tag: "Cozy",
  },
];

const userReviews = [
  {
    name: "Aarav M.",
    review:
      "The weekly picks made dinner planning simple. The recipes feel realistic for busy evenings.",
    favorite: "Thai Green Curry",
  },
  {
    name: "Nisha K.",
    review:
      "I tried the pizza and brownies back to back. Both were easy to follow and tasted restaurant-level.",
    favorite: "Chocolate Brownies",
  },
  {
    name: "Rohan S.",
    review:
      "The recipe cards are quick to scan, which is exactly what I need before grocery shopping.",
    favorite: "Spaghetti Carbonara",
  },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeFood = carouselFoods[activeSlide];

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % carouselFoods.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + carouselFoods.length) % carouselFoods.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Curated recipes", value: "60+" },
      { label: "Cuisine styles", value: "18" },
      { label: "Avg rating", value: "4.7" },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="relative min-h-[620px]">
          <Image
            key={activeFood.image}
            src={activeFood.image}
            alt={activeFood.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-slate-950/55" />

          <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
            <div className="w-full">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                  <Flame className="size-4 text-fuchsia-500" />
                  Featured recipe
                </div>
                <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white sm:text-6xl">
                  {activeFood.name}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-100">
                  {activeFood.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
                  <span className="rounded-full bg-white px-4 py-2 text-slate-950">
                    {activeFood.cuisine}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white ring-1 ring-white/25">
                    <Clock className="size-4" />
                    {activeFood.time}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white ring-1 ring-white/25">
                    <Star className="size-4 fill-amber-300 text-amber-300" />
                    {activeFood.rating}
                  </span>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="grid max-w-xl grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-white/15 bg-white/10 p-4 text-white backdrop-blur"
                    >
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="mt-1 text-xs text-slate-200">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous featured food"
                    className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white hover:text-slate-950"
                  >
                    <ArrowLeft className="size-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {carouselFoods.map((food, index) => (
                      <button
                        key={food.name}
                        type="button"
                        aria-label={`Show ${food.name}`}
                        onClick={() => setActiveSlide(index)}
                        className={cn(
                          "h-2.5 cursor-pointer rounded-full transition",
                          index === activeSlide
                            ? "w-9 bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                            : "w-2.5 bg-white/55 hover:bg-white"
                        )}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next featured food"
                    className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white hover:text-slate-950"
                  >
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Top Picks"
            subtitle="High-rated plates that are easy to choose and hard to regret."
            action
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {topPicks.map((item) => (
              <article
                key={item.name}
                className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.meta}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      {item.rating}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">
                    {item.name}
                  </h2>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    {item.time}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Popular This Week"
            subtitle="The recipes people are opening, cooking, and coming back to."
            action
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularThisWeek.map((item) => (
              <article
                key={item.name}
                className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
              >
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-300 hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
                    {item.tag}
                  </span>
                </div>
                <div className="p-2 pt-4">
                  <h2 className="font-semibold text-slate-950">{item.name}</h2>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500">
                    <Users className="size-4" />
                    {item.cooks}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="User Reviews"
            subtitle="What home cooks are saying after trying the recipes."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {userReviews.map((review) => (
              <article
                key={review.name}
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <Quote className="size-8 text-fuchsia-500" />
                <p className="mt-5 leading-7 text-muted-foreground">
                  {review.review}
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Favorite: {review.favorite}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  title,
  subtitle,
  action = false,
}: {
  title: string;
  subtitle: string;
  action?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase text-fuchsia-600">
          Fresh from the kitchen
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      </div>
      {action && (
        <Link
          href="/recipes"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
        >
          Browse all recipes
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
