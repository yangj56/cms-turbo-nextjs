import type { Hero } from "@repo/ui";

export default async function Index() {
    const data: Hero = {
        id: 1,
        title: "Hello Welcome to near",
        image: {
            url: "https://via.placeholder.com/150",
            alt: "Hero Image",
            id: 1,
            createdAt: "1",
            updatedAt: "1",
        },
        buttonLabel: "Contact Us",
        url: "https://via.placeholder.com/150",
        updatedAt: "1",
        createdAt: "1",
    };
    console.log(data);
    return (
        <>
            <div className="bg-red relative z-10 h-20 p-5 text-center">
                <h1 className="mb-4 text-5xl font-bold text-secondary">
                    Hello Welcome to near
                </h1>
                <p className="mb-8 text-xl">
                    Innovative Solutions for Your Business
                </p>
                <a
                    href="#contact"
                    className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                    Contact Us
                </a>
            </div>
        </>
    );
}
