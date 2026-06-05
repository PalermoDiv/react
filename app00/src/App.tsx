function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

type ProfileProps = {
  name: string;
  urlImage: string;
  imageSize: number;
};

function ShowProfile({ name, urlImage, imageSize }: ProfileProps): TSX.Element {
  return (
    <>
      <h1 className="text-2xl text-white">{name}</h1>
      <img className="rounded" src={urlImage} alt={`Photo of ${name}`} width={imageSize} />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-2xl font-semibold">Clean slate</h1>
      <MyButton />
      <ShowProfile
        name="Anomander Rake"
        urlImage="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhblIFKBkcGfPdGL-kLUwvoIvgLlXdpDoiSH_doqX2339iguQxMK8uSNPRdfPVhrfkc0qsBi6RAJdZVleMXkkg3KQVMzOkbSlYOw5PXOBN2pSgc7GaGNCl1GJE-vI4KS38Rs93q6FkgIBYF/s640/Anomander+Rake+2.0.jpg"
        imageSize={290}
      />
    </div>
  )
}
