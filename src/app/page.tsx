"use client";
import { getAddress } from "../../get-address";
import { NavBar } from "../components/header";
import { useState, useEffect } from "react";
import { v4 as randomUUID } from "uuid";
import { FiLoader } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdOutlineDelete } from "react-icons/md";
import { motion } from "motion/react"

// Função para validar o CEP
function isValidCEP(cep: string) {
  return /^[0-9]{5}-[0-9]{3}$/.test(cep);
}

// Função para formatar a data
function formatDate(date: Date) {
  const result = formatDistanceToNow(new Date(date), {
    includeSeconds: true,
    locale: ptBR,
  });
  return result;
}

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

const Loader = () => (
  <div className="flex justify-center items-center">
    <FiLoader className="animate-spin" />
  </div>
);

export default function Home() {
  const [, setAddress] = useState<Address | null>(null);
  const [addressList, setAddressList] = useState<Address[]>([
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
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (!loading) {
      setTextValue("");
    }
  }, [loading]);

  async function handleGetAddress() {
    if (!isValidCEP(textValue)) {
      alert("CEP inválido. Por favor, insira um CEP no formato XXXXX-XXX.");
      return;
    }

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
      setAddressList((prevList) => [newAddress, ...prevList]);
    } catch (error) {
      console.error("Ocorreu um erro inesperado:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteAddress = (id: string) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja deletar este endereço?"
    );
    if (confirmDelete) {
      setAddressList(addressList.filter((address) => address.id !== id));
    }
  };

  return (
    <div className="bg-[#0f172a] text-white">
      <NavBar />
      <div className="flex flex-col justify-center items-center">
        <main className="flex flex-col gap-8 h-screen">
          <section className="self-center p-8 mt-8 bg-[#1e293b] rounded-lg w-full sm:w-[90%] md:w-[500px]">
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
                    aria-label="Digite o CEP"
                  />
                </div>
                <button
                  onClick={handleGetAddress}
                  className={`${
                    loading ? "opacity-30" : ""
                  } w-28 px-5 py-3 rounded-lg bg-[#f472b6] transition duration-500 ease-in-out hover:bg-pink-800 text-white my-2`}
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Buscar"}
                </button>
              </div>
            </div>
          </section>
          <section className="mt-6 w-full sm:w-[90%] md:w-[82rem]">
            <h2 className="text-xl mb-4 mx-12">Lista de Endereços</h2>
            <div className="mx-12 mb-10">
              <table className="min-w-[800px] w-full bg-[#1e293b] text-white rounded border-collapse">
                <thead>
                  <tr className="[&>*]:px-4 [&>*]:py-2">
                    <th className="w-[150px] text-left text-[#f472b6]">CEP</th>
                    <th className="w-[50px] text-left text-[#f472b6]">
                      Estado
                    </th>
                    <th className="text-left text-[#f472b6]">Localidade</th>
                    <th className="text-left text-[#f472b6]">Bairro</th>
                    <th className="text-left text-[#f472b6]">Logradouro</th>
                    <th className="text-left text-[#f472b6]">Complemento</th>
                    <th className="text-left text-[#f472b6]">Consultado</th>
                    <th className="w-[50px] text-left text-[#f472b6]">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {addressList.map((addr, index) => (
                    <tr
                      key={addr.id}
                      className={`hover:bg-[#374151] [&>*]:px-4 [&>*]:py-2 ${
                        index % 2 === 0 ? "bg-[#2e2e2e]" : "bg-[#3a3a3a]"
                      }`}
                    >
                      <td>{addr.cep}</td>
                      <td>{addr.uf}</td>
                      <td>{addr.localidade}</td>
                      <td>{addr.bairro}</td>
                      <td>{addr.logradouro}</td>
                      <td>{addr.complemento}</td>
                      <td>{formatDate(addr.consultedAt)}</td>
                      <td>
                        <motion.div
                          whileHover={{ scale: 1.2 }} 
                          transition={{ type: "tween", stiffness: 200 }}
                        >
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="bg-[#bb2e3e] hover:bg-[#fe0003] cursor-pointer p-1 rounded"
                            aria-label="Excluir endereço"
                          >
                            <MdOutlineDelete size={24} color="" />
                          </button>
                        </motion.div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
