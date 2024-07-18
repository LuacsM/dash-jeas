import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SEDUC-AM. Todos os direitos reservados.
        </p>
        <p className="text-sm">
          Desenvolvido por <a href="https://www.seduc.am.gov.br/" className="font-semibold	text-blue-400">DETIN / GETAG</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;