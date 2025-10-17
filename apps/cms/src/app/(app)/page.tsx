import type { NextPage } from "next";

const Page: NextPage = () => {
	return (
		<div className="container">
			<h1 className="font-bold text-4xl">Welcome to honest cms</h1>
			<a href="/admin">Click here to redirect to admin portal</a>
		</div>
	);
};

export default Page;
