"use client";
import { getAddress } from "../../get-address";
import { NavBar } from "../components/header";
import { useState } from "react";
import { v4 as randomUUID } from "uuid";
import { FiLoader } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdOutlineDelete } from "react-icons/md";

interface Address {
  id: string;
  logradouro: string;
  bairro: string;
  cep: string;
  complemento: string;
  uf: string;
  localidade: string;
  consultedAt: Date;
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
      uf: "SP",
      localidade: "São Paulo",
      consultedAt: new Date(),
    },
    {
      id: randomUUID(),
      logradouro: "Avenida Paulista",
      bairro: "Centro",
      cep: "87654-321",
      complemento: "Próximo ao metrô",
      uf: "SP",
      localidade: "São Paulo",
      consultedAt: new Date(),
    },
    {
      id: randomUUID(),
      logradouro: "Rua Rio Branco",
      bairro: "Centro",
      cep: "11223-445",
      complemento: "Casa",
      uf: "RJ",
      localidade: "Rio de Janeiro",
      consultedAt: new Date(),
    },
    {
      id: randomUUID(),
      logradouro: "Avenida Brasil",
      bairro: "Jardim América",
      cep: "33445-667",
      complemento: "Bloco B",
      uf: "MG",
      localidade: "Belo Horizonte",
      consultedAt: new Date(),
    },
    {
      id: randomUUID(),
      logradouro: "Rua das Oliveiras",
      bairro: "Bela Vista",
      cep: "55667-889",
      complemento: "Próximo ao parque",
      uf: "RS",
      localidade: "Porto Alegre",
      consultedAt: new Date(),
    },
  ]);

  function formatDate(date: Date) {
    const result = formatDistanceToNow(new Date(date), {
      includeSeconds: true,
      locale: ptBR,
    });
    return result;
  }

  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  async function handleGetAddress() {
    setLoading(true);
    try {
      const result = await getAddress(textValue);
      if (result?.erro === "true") {
        alert("CEP inválido.");
        return;
      }

      const newAddress: Address = {
        id: randomUUID(),
        consultedAt: new Date(),
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

  const handleDeleteAddress = (id: string) => {
    setAddressList(addressList.filter((address) => address.id !== id));
  };

  return (
    <div className="bg-[#000000] text-white">
      <NavBar />
      <div className="flex flex-col justify-center items-center">
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
                      <FiLoader />
                    </div>
                  ) : (
                    "Buscar"
                  )}
                </button>
              </div>
              <br />
            </div>
          </section>

          <section className="mt-6 w-[82rem]">
            <h2 className="text-xl mb-4 mx-12">Lista de Endereços</h2>
            <table className="table-auto [&>*>*>*]:border-2 min-w-full bg-[#231B33] text-white rounded mx-12 mb-10">
              <thead>
                <tr className="[&>*]:px-4 [&>*]:py-2">
                  <th className="text-left text-[#FE0096]">CEP</th>
                  <th className="text-left text-[#FE0096]">Estado</th>
                  <th className="text-left text-[#FE0096]">Localidade</th>
                  <th className="text-left text-[#FE0096]">Bairro</th>
                  <th className="text-left text-[#FE0096]">Logradouro</th>
                  <th className="text-left text-[#FE0096]">Complemento</th>
                  <th className="text-left text-[#FE0096]">Consultado</th>
                  <th className="text-left text-[#FE0096]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {addressList.map((addr, index) => (
                  <tr
                    key={addr.id}
                    className={`[&>*]:px-4 [&>*]:py-2 ${
                      index % 2 === 0 ? "bg-[#2e2e2e]" : "bg-[#3a3a3a]"
                    } space-y-4`}
                  >
                    <td>{addr.cep}</td>
                    <td>{addr.uf}</td>
                    <td>{addr.localidade}</td>
                    <td>{addr.bairro}</td>
                    <td>{addr.logradouro}</td>
                    <td>{addr.complemento}</td>
                    <td>{formatDate(addr.consultedAt)}</td>
                    <td>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="p-0.5">
                        <MdOutlineDelete size={24} color="#bb2e3e"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}
