import Link from "next/link";

export default function Login() {
  return (
    <div>
      {/*  Title */}
      <h1 className="text-center mb-2 font-bold text-white text-xl ">
        Comment souhaitez-vous utiliser thread
      </h1>
      {/* Signup and Signin  */}
      <div className="mt-10 w-[500px] mx-auto flex flex-col gap-4">
        <Link href="/login/signup">
          <div className="auth-method">
            <h2 className="font-bold text-white">
              S'insrire ou se connecter avec adresse email
            </h2>
            <div className="text-threads-gray-light">
              Connectez-vous ou créez un profil avec une adresse email
            </div>
          </div>
        </Link>

        {/* Invited */}
        <Link href="/login/pass">
          <div className="auth-method">
            <h2 className="font-bold text-white">Utiliser sans profil</h2>
            <div className="text-threads-gray-light">
              Vous pouvez naviguer sans profil mais vous ne pourrez pas publier
              du contenu
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
