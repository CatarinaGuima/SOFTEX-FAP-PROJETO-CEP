"use client";
import { getAddress } from "../../get-address";
import { NavBar } from "../components/header";
import { useState } from "react";
import { v4 as randomUUID } from "uuid";
import { TailSpin } from "react-loader-spinner";

interface Address {
  id: string;
  logradouro: string;
  bairro: string;
  cep: string;
  complemento: string;
  estado: string;
  localidade: string;
}

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [address, setAddress] = useState<Address | null>(null);
  const [addressList, setAddressList] = useState<Address[]>([
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
  ]);
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  async function handleGetAddress() {
    setLoading(true);
    try {
      const result = await getAddress(textValue);

      const newAddress = {
        id: randomUUID(),
        ...result,
      };

      setAddress(newAddress);

      // Adiciona o novo endereço ao início da lista
      setAddressList((prevList) => [newAddress, ...prevList]);
    } catch (error) {
      console.error("Ocorreu um erro inesperado:", error);
    } finally {
      setLoading(false);
      setTextValue("");
    }
  }

  return (
    <>
      <NavBar />
      <div className="bg-[#000000] text-white flex flex-col justify-center items-center">
        <main className="flex flex-col gap-8 h-screen ">
          <section className="self-center p-8 mt-8 bg-[#231B33] rounded-lg w-[500px] h-[200px]">
            <h1 className="text-3xl mb-8">Buscador de Endereço</h1>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div>
                  <input
                    onChange={(e) => setTextValue(e.target.value)}
                    value={textValue}
                    type="text"
                    id="cep"
                    className="text-black rounded-lg shadow-lg px-4 py-3 w-80"
                    placeholder="Digite um CEP válido"
                  />
                </div>
                <button
                  onClick={handleGetAddress}
                  className={`${
                    loading ? "opacity-30" : ""
                  } w-28 px-5 py-3 rounded-lg bg-[#FE0096] transition duration-500 ease-in-out hover:bg-pink-800 text-white my-2`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <TailSpin
                        visible={true}
                        height="25"
                        width="25"
                        color="#ffffff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    "Buscar"
                  )}
                </button>
              </div>
              <br />
            </div>
          </section>

          <section className="mt-6 w-[80rem]">
            <h2 className="text-xl mb-4">Lista de Endereços</h2>
            <table className="min-w-full bg-[#231B33] text-white rounded">
              <thead>
                <tr>
                <th className="py-2 px-4 text-left text-[#FE0096]">CEP</th>
                  <th className="py-2 px-4 text-left text-[#FE0096]">Estado</th>  
                  <th className="py-2 px-4 text-left text-[#FE0096]">Localidade</th>
                  <th className="py-2 px-4 text-left text-[#FE0096]">Bairro</th>
                  <th className="py-2 px-4 text-left text-[#FE0096]">Logradouro</th>
                  <th className="py-2 px-4 text-left text-[#FE0096]">Complemento</th>
                 
                 
                </tr>
              </thead>
              <tbody>
                {addressList.map((addr, index) => (
                  <tr key={addr.id}  className={`py-2 px-4 ${index % 2 === 0 ? "bg-[#2e2e2e]" : "bg-[#3a3a3a]"} space-y-4`}>
                    <td className="py-2 px-4">{addr.cep}</td>
                    <td className="py-2 px-4">{addr.estado}</td>
                    <td className="py-2 px-4">{addr.localidade}</td>
                    <td className="py-2 px-4">{addr.bairro}</td>
                    <td className="py-2 px-4">{addr.logradouro}</td>
                    <td className="py-2 px-4">{addr.complemento}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
