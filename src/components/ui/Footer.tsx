import AtSymbol from "../icons/AtSymbol";

const Footer = () => {
  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 bg-gray-50 dark:bg-gray-900`}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-center gap-x-2 text-teal-600 sm:justify-start dark:text-teal-300">
            <AtSymbol />
            <h3>Irfin1581@gmail.com</h3>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right dark:text-gray-400">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
