import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
      <main className="flex flex-col items-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="mb-8">
          <Image 
            src="/logo.svg" 
            alt="SignatureCraft Logo" 
            width={300} 
            height={75} 
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-blue-600">SignatureCraft</span>
        </h1>
        <p className="text-xl mb-8">
          Create professional email signatures with ease
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-3">Create Signature</h2>
            <p className="text-gray-600 mb-4">Design your professional email signature with our easy-to-use builder</p>
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Get Started
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-3">Team Management</h2>
            <p className="text-gray-600 mb-4">Manage signatures for your entire team with consistent branding</p>
            <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}