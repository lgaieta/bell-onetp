"use client";

export default function Error({ error }: { error: Error }) {
    console.log(error);
    return <div>error bro</div>;
}
