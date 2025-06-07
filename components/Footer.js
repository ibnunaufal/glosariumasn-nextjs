export default function Footer() {
  return (
    <footer className=" text-blue py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} GlosariumASN. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Made with ❤️ by <a href="naufall.com" className="text-blue-900 hover:underline">naufall.com</a>
        </p>
      </div>
    </footer>
  );
}