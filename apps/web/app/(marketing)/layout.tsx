export default async function Layout(props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    console.log(props.params);
    return <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>;
}
