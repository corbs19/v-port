export default function Footer() {
  return (
    <footer className="py-8 text-center bg-gray-100 dark:bg-gray-900 text-white transition-colors duration-500">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">Corby Maniapao</span>.
        All rights reserved.
      </p>
    </footer>
  );
}