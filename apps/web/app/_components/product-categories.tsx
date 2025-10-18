"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { type JSX, useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/carousel";
import type { Media, ProductCategory } from "@/lib/payload-types";
import { formatImageAlt, formatImageUrl } from "@/lib/utils";
import { ImageLoader } from "./image-loader";

type Props = {
	data: ProductCategory[];
};

export const ProductCategories = ({ data }: Props): JSX.Element => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		skipSnaps: false,
		dragFree: true,
	});

	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const [shouldShowNavigation, setShouldShowNavigation] = useState(true);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi: CarouselApi) => {
		if (!emblaApi) return;
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		const checkNavigationVisibility = () => {
			const slidesInView = Math.floor(1 / emblaApi.scrollProgress());
			setShouldShowNavigation(slidesInView < data.length);
		};

		onSelect(emblaApi);
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
		emblaApi.on("resize", checkNavigationVisibility);

		// Initial check
		checkNavigationVisibility();

		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onSelect);
			emblaApi.off("resize", checkNavigationVisibility);
		};
	}, [emblaApi, onSelect, data.length]);

	return (
		<div className="flex w-full flex-col items-center">
			{/* Header section with navigation buttons */}
			<div className="mb-8 flex w-full items-center justify-between">
				<div>
					<h3>Shop by Category</h3>
					<Link
						href="/products"
						className="relative mt-1 inline-block text-sm after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
					>
						Explore all products &gt;
					</Link>
				</div>
				{shouldShowNavigation && (
					<div className="flex gap-2">
						<button
							type="button"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
							onClick={scrollPrev}
							disabled={!canScrollPrev}
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<button
							type="button"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
							onClick={scrollNext}
							disabled={!canScrollNext}
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				)}
			</div>

			{/* Carousel */}
			<div className="w-full overflow-hidden" ref={emblaRef}>
				<div className="-mr-4 sm:-mr-6 ml-0 flex">
					{data.map((item) => {
						if (!item || !item.image) {
							return null;
						}
						const imageUrl = formatImageUrl(item.image);
						const imageAlt = formatImageAlt(item.image);
						return (
							<div
								key={item.id}
								className="min-w-0 flex-[0_0_60%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
							>
								<div className="mr-4 sm:mr-6">
									<Link
										href={`/collection-products?collection=${item.sku}`}
										className="group block"
										title={`View ${item.title} products`}
										aria-label={`Browse our ${item.title} collection`}
									>
										<div className="mb-3 aspect-square w-full overflow-hidden rounded-sm">
											<div className="relative h-full w-full">
												<ImageLoader
													src={imageUrl}
													alt={imageAlt}
													className="object-cover transition-all duration-1000 group-hover:scale-110"
													fill
													sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
													loading="lazy"
												/>
											</div>
										</div>
										<h5 className="relative inline-block font-normal text-sm after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full sm:text-base">
											{item.title}
										</h5>
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
