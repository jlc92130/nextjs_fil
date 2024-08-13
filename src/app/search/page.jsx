import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";

export default function Search() {
  return (
    <ConnectedLayout>
      <div className="mt-10 md:w-[700px] mx-auto w-full">
        <form>
          <input type="search" className="input" placeholder="Rechercher" />
        </form>
        {/* results  */}
        <div className="mt-32 text-center text-threads-gray-light">
          Rechercher des profils
        </div>
      </div>
    </ConnectedLayout>
  );
}
