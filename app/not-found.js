import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-4 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring">
          Go to Main Page
        </a>
      </Link>
    </div>
  );
}