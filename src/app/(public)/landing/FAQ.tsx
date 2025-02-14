import Link from "next/link";
import React from "react";

export default function FAQ() {
  const toggleFAQ = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Sua lógica aqui
    const button = event.currentTarget;
    const parent = button.parentElement;
    const answer = parent?.querySelector(".transition-all");
  
    if (answer) {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
  
      // Alternar o estilo de maxHeight
      answer.setAttribute(
        "style",
        `max-height: ${isExpanded ? 0 : `${answer.scrollHeight}px`};`
      );
    }
  };

  return (
    <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 bg-gray-900 rounded-3xl" id="FAQ">
      <div className="flex flex-col text-left basis-1/2">
        <h1 className="text-center md:text-start text-5xl font-semibold text-white uppercase mb-20">
          Perguntas Frequentes
        </h1>

        <div className="bg-gray-900">
          <div className="max-w-6xl mx-auto flex justify-end">
            <div className="bg-gray-100 p-10 rounded-ss-3xl rounded-ee-3xl rounded">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">
                Alguma dúvida?
              </h2>
              <div>
                <Link
                  href="https://wa.me/+5575983252987"
                  className="inline-block bg-green-500 hover:bg-green-600 transition-colors duration-300 p-4 px-8 rounded-xl font-semibold text-white uppercase btn-hover text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clique aqui e fale conosco pelo Whatsapp{" "}
                  <i className="fa-brands fa-whatsapp ml-2 text-2xl"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="basis-1/2">
        {[
          {
            question: "O que é a nossa plataforma?",
            answer:
              "Nossa plataforma permite criar páginas personalizadas para bios do Instagram, facilitando a exibição de seus links importantes em um único lugar.",
          },
          {
            question: "Como personalizo minha página?",
            answer:
              "Após se cadastrar, você pode acessar o editor visual para adicionar links, mudar cores e personalizar seu layout como desejar.",
          },
          {
            question: "Posso adicionar links para redes sociais?",
            answer:
              "Sim! Nossa plataforma permite que você insira links personalizados, incluindo redes sociais, lojas online e muito mais.",
          },
          {
            question: "Preciso de conhecimentos técnicos?",
            answer:
              "Não! Nossa ferramenta foi criada para ser intuitiva, permitindo que qualquer pessoa crie e gerencie uma página sem precisar programar.",
          },
          {
            question: "A plataforma é gratuita?",
            answer:
              "Sim! Oferecemos um plano gratuito para que você possa criar e usar sua página personalizada. Planos pagos estão disponíveis para funcionalidades extras.",
          },
        ].map(({ question, answer }, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
              aria-expanded="false"
              onClick={toggleFAQ}
            >
              <span className="flex-1 text-base-content text-yellow-400">{question}</span>
              <svg
                className="flex-shrink-0 w-4 h-4 ml-auto fill-current text-yellow-400"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className="transform origin-center transition duration-200 ease-out"
                ></rect>
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className="transform origin-center rotate-90 transition duration-200 ease-out"
                ></rect>
              </svg>
            </button>
            <div
              className="transition-all duration-300 ease-in-out max-h-0 overflow-hidden"
              style={{ maxHeight: "0", transition: "max-height 0.3s ease-in-out" }}
            >
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed text-white">{answer}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
