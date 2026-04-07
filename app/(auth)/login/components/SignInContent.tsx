import Link from "next/link";
import Login from "./Login";

export const SignInContent = () => {
  return (
    <div className="flex flex-col justify-center px-6 py-10 md:px-16 lg:px-24">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">MoodTracker</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Olá, <br />
          Bem-Vindo(a)
        </h2>
        <p className="text-gray-500 mt-2">Seu Tracker de Emoções!</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-100 border border-gray-300 max-w-sm w-full p-4 rounded-2xl mb-6">
          <h3 className="font-semibold text-gray-700 mb-2 text-center">
            Contas fictícias
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Candidato:</span>{" "}
              candidato@talents.com
            </p>
            <p>
              {" "}
              <span className="font-medium">Senha:</span>123456
            </p>
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
};
