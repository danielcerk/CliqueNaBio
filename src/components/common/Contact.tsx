

export default function Contact() {
  return (
    <div className="bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-lg text-start">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Entre em Contato</h1>
      <p className="text-gray-600 text-lg mb-6">Estamos disponíveis para ajudá-lo!</p>
  
     
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Telefone</h2>
        <p className="text-gray-600 text-lg">📞 (75) 98325-2987</p>
      </div>
  
      
      <div>
        <h2 className="text-xl font-semibold text-gray-700">E-mail</h2>
        <p className="text-gray-600 text-lg">📧 contato@exemplo.com</p>
      </div>
  
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Siga-nos</h2>
        <div className="flex justify-center space-x-4  bg-pink-600 hover:bg-pink-700 hover:scale-105 transition-all cursor-pointer rounded-xl py-3 mt-5">
          {/* <a href="#" className="text-blue-500 hover:text-blue-600">Facebook</a> */}
          <a href="#" className="text-white flex items-center gap-3">Instagram <i className="fa-brands fa-square-instagram text-2xl text-pink-950"></i></a>
          {/* <a href="#" className="text-blue-400 hover:text-blue-500">Twitter</a> */}
        </div>
        <div className="flex justify-center space-x-4  bg-green-500 hover:bg-green-600 hover:scale-105 transition-all rounded-xl py-3 mt-5 cursor-pointer">
          {/* <a href="#" className="text-blue-500 hover:text-blue-600">Facebook</a> */}
          <a href="https://wa.me/+5575983252987" className="text-white flex items-center gap-3 ">Whatsapp <i className="fa-brands fa-square-whatsapp text-2xl text-green-950"></i></a>
          {/* <a href="#" className="text-blue-400 hover:text-blue-500">Twitter</a> */}
        </div>
      </div>
    </div>
  </div>
  );
  
}
