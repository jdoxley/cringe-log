import Content from "./Content";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const props = await params;
    return (
        <div>
            <Content id={props.id} />
        </div>
    )
}