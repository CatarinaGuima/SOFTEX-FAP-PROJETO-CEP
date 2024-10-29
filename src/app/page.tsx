"use client";
// import Image from "next/image";
import { getAddress } from "../../get-address";
import { NavBar } from "../components/header";
import { useState } from "react";
import { v4 as randomUUID } from "uuid";

interface Address {
  id: string;
  logradouro: string;
  bairro: string;
  cep: string;
  complemento: string;
  estado: string;
  localidade: string;
}

const addressList: Address[] = [
  {
    id: randomUUID(),
    logradouro: "Rua das Flores",
    bairro: "Jardim Primavera",
    cep: "12345-678",
    complemento: "Apto 101",
    estado: "SP",
    localidade: "São Paulo",
  },
  {
    id: randomUUID(),
    logradouro: "Avenida Paulista",
    bairro: "Centro",
    cep: "87654-321",
    complemento: "Próximo ao metrô",
    estado: "SP",
    localidade: "São Paulo",
  },
  {
    id: randomUUID(),
    logradouro: "Rua Rio Branco",
    bairro: "Centro",
    cep: "11223-445",
    complemento: "Casa",
    estado: "RJ",
    localidade: "Rio de Janeiro",
  },
  {
    id: randomUUID(),
    logradouro: "Avenida Brasil",
    bairro: "Jardim América",
    cep: "33445-667",
    complemento: "Bloco B",
    estado: "MG",
    localidade: "Belo Horizonte",
  },
  {
    id: randomUUID(),
    logradouro: "Rua das Oliveiras",
    bairro: "Bela Vista",
    cep: "55667-889",
    complemento: "Próximo ao parque",
    estado: "RS",
    localidade: "Porto Alegre",
  },
];

export default function Home() {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  async function handleGetAddress() {
    setLoading(true);
    try {
      const result = await getAddress(textValue);
      setAddress(result);
      console.log(result);
    } catch (error) {
      console.error("Ocorreu um erro inesperado:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col justify-center items-center">
      <NavBar />

      <main className="p-8 bg-[#231B33] rounded-lg max-w-3xl">
        <h1 className="text-3xl mb-8">Buscador de Endereço</h1>

        <div className="flex flex-col gap-2">
          <div>
            <input
              onChange={(e) => setTextValue(e.target.value)}
              value=""
              type="text"
              id="cep"
              className="rounded-lg shadow-lg px-4 py-3 w-full "
              placeholder="Digite um CEP válido"
            />
          </div>
          <button
            onClick={handleGetAddress}
            className={`${
              loading ? "opacity-30" : ""
            } w-fit px-5 py-3 rounded-lg bg-[#FE0096] transition duration-500 ease-in-out hover:bg-pink-800  text-white my-2`}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Obter endereço"}
          </button>
          <br />
          <span>
            Endereço:{" "}
            {address
              ? ` ${address.logradouro}, ${address.bairro}`
              : "Nenhum endereço obtido"}
          </span>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <ul>
            {addressList.map((address) => (
              <li key={address.id}>{address.logradouro}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
