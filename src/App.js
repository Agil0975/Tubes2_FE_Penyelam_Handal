import InputForm from "./component/InputForm";

function App() {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center bg-black">
      <div class="bg-repeat w-full h-full text-primary-100 heropattern-topography-red-500 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-8">
          WIKI RACE PATHFINDER
        </h1>
        <InputForm />
      </div>
    </div>
  );
}

export default App;
