import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" w-full max-w-5xl items-center justify-between  text-sm lg:flex">
        <div className="w-2/5 bg-slate-400 rounded-sm">
          <h2>Iniciar sesión</h2>
          <div>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Contraseña" />
            <i>
              <a href="www.google.com">¿Olvidaste tu contraseña?</a>
            </i>
          </div>
        </div>
      </div>
    </main>
  );
}
