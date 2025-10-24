export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-[#E040FB] to-[#FFC2FF] text-white py-8 text-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6 text-sm">
          <a href="https://twitter.com" className="hover:underline">Twitter</a>
          <a href="https://linkedin.com" className="hover:underline">LinkedIn</a>
          <a href="mailto:support@ticketapp.com" className="hover:underline">Contact</a>
        </div>
          <p className="text-sm">
          © {new Date().getFullYear()} Event Monkey. All rights reserved.
        </p>
      </div>
    </footer>

  );
}
