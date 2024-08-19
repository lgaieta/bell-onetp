"use client";

export default function ErrorPage() {
    return (
        <main className="flex flex-col gap-6 py-16 w-full max-w-sm px-4">
            <h1 className="text-2xl font-bold text-center">
                Ha ocurrido un error
            </h1>
            <p className="text-center">
                Si el error continúa, puede contactarse con atención al cliente.
            </p>
        </main>
    );
}
