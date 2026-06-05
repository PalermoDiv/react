import './index.css';

type Image = {
  name: string;
  urlImage: string;
  sizeImage: number;
}

function MyButton() {
  return (
    <button className="text-3xl bg-blue-900 text-white border rounded-lg p-4 hover:bg-blue-800 transition-colors cursor-pointer">
      A button!
    </button>
  );
}

function ShowERMap({ name, urlImage, sizeImage }: Image) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-xl font-semibold">{name}</h2>
      <img className="rounded-lg shadow-lg" src={urlImage} width={sizeImage} alt={name} />
    </div>
  );
}

function FormER() {
  return (
    <form className="bg-gray-800 border border-gray-600 rounded-xl p-6 max-w-md w-full shadow-lg">
      <p className="text-lg font-medium mb-4">Do you like Elden Ring?</p>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
          <input
            type="radio"
            name="elden-ring"
            value="yes"
            className="w-5 h-5 accent-yellow-500 cursor-pointer"
          />
          <span className="text-white">Yes</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
          <input
            type="radio"
            name="elden-ring"
            value="no"
            className="w-5 h-5 accent-red-500 cursor-pointer"
          />
          <span className="text-white">No</span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-700 text-white px-3 py-4 flex flex-col items-center gap-6">
      <h1 className="font-semibold text-2xl">Hello there, this is about Elden Ring</h1>
      <MyButton />
      <ShowERMap
        name="Elden Ring Map"
        urlImage="https://cdn.segmentnextimages.com/wp-content/uploads/2023/07/elden-ring-sites-of-grace-featured.jpeg"
        sizeImage={400}
      />
      <FormER />
    </div>
  );
}
