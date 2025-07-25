import Image from "next/image";
import imageLanding from "../../public/image_1.png"
import Button from "@/app/components/ui/Button";

import fonts from "./utils/fonts";


export default function Home() {
  return (
      <main className={`${fonts.openSans.className} ${fonts.fredoka.className} pt-17 max-w-360 mx-auto`}>
          <section className="hero py-5 md:py-10 px-2.5 md:px-10">
              <div className="hero-content flex-col lg:flex-row-reverse">
                  <div className="w-full md:w-3/8">
                      <Image
                          src={imageLanding}
                          alt="Picture of the author"
                          width={400}
                          height={400}
                      />
                  </div>
                  <div className="w-full md:w-5/8">
                      <h1 className="text-5xl font-bold mb-6">Étudie mieux, plus vite, sans t’épuiser</h1>
                      <p className={`${fonts.openSans.className}`}>EtudIA transforme tes cours en contenus interactifs pour t’aider à réviser plus efficacement.</p>
                      <Button disabled={false} text={"Créer ta première capsule"}/>
                  </div>
              </div>
          </section>

          <section className="hero py-5 md:py-10 px-2.5 md:px-10">
              <div className="hero-content flex-col lg:flex-row">
                  <div className="w-full md:w-1/2 flex justify-center">
                      <Image
                          src={imageLanding}
                          alt="Picture of the author"
                          width={400}
                          height={400}
                      />
                  </div>
                  <div className="w-full md:w-1/2">
                      <h2 className="text-4xl font-bold mb-6">C’est quoi Etud IA ?</h2>
                      <p className={`${fonts.openSans.className}`}>
                          Etud IA est une plateforme qui t’aide à transformer tes cours en supports de révision intelligents. <br/>
                          Tu peux importer ton cours (texte ou PDF), et l’IA te propose une capsule : un résumé, un quiz ou des flashcards. Tu choisis ce que tu veux créer. <br/>
                          Les capsules sont personnelles, mais tu peux aussi découvrir celles d'autres étudiants et les ajouter à ton propre espace.
                      </p>
                  </div>
              </div>
          </section>

          <section className="py-5 md:py-10 px-2.5 md:px-10">
              <h2 className="text-4xl font-bold mb-6 text-center">Comment ça marche ?</h2>
              <div className="flex flex-col md:flex-row w-full text-center">
                  <div className="card bg-base-200 rounded-box place-items-center p-5 md:w-1/4">
                      <p>Étape 1</p>
                      <h3>Importe ton cours</h3>
                      <p className={`${fonts.openSans.className}`}>Upload ton cours en format PDF ou texte.</p>
                  </div>
                  <div className="divider divider-vertical md:divider-horizontal divider-accent"></div>
                  <div className="card bg-base-200 rounded-box place-items-center p-5 md:w-1/4">
                      <p>Étape 2</p>
                      <h3>Choisis tes capsules</h3>
                      <p className={`${fonts.openSans.className}`}>Résumé synthétique, flashcards pour t'entraîner, quiz pour te tester.</p>
                  </div>
                  <div className="divider divider-vertical md:divider-horizontal divider-accent"></div>
                  <div className="card bg-base-200 rounded-box place-items-center p-5 md:w-1/4">
                      <p>Étape 3</p>
                      <h3>L’IA génère tes capsules</h3>
                      <p className={`${fonts.openSans.className}`}>En quelques secondes, tu obtiens un contenu structuré et clair.</p>
                  </div>
                  <div className="divider divider-vertical md:divider-horizontal divider-accent"></div>
                  <div className="card bg-base-200 rounded-box place-items-center p-5 md:w-1/4">
                      <p>Étape 4</p>
                      <h3>Révise et organise tes capsules</h3>
                      <p className={`${fonts.openSans.className}`}>Tu peux les mettre en favoris, les retrouver facilement et les partager si tu veux.</p>
                  </div>
              </div>
          </section>

          <section className="hero py-5 md:py-10 px-2.5 md:px-10">
              <div className="hero-content flex-col lg:flex-row-reverse">
                  <div className="w-full md:w-1/2 flex justify-center">
                      <Image
                          src={imageLanding}
                          alt="Picture of the author"
                          width={400}
                          height={400}
                      />
                  </div>
                  <div className="w-full md:w-1/2">
                      <h2 className="text-4xl font-bold mb-6">La méthode de répétition espacée</h2>
                      <p className={`${fonts.openSans.className}`}>Pour mieux retenir, EtudIA t’aide à revoir tes flashcards au bon moment grâce à la méthode de répétition espacée. <br/>
                          Ce système te propose automatiquement les capsules que tu dois revoir selon ton historique. <br/>
                          Résultat ? Tu oublies moins et tu révise plus intelligemment, sans surcharge. Des rappels doux t’aident à rester régulier·ère.</p>
                      <Button disabled={false} text={"Créer ta première capsule"}/>
                  </div>
              </div>
          </section>

          <section className="hero py-5 md:py-10 px-2.5 md:px-10">
              <div className="hero-content flex-col lg:flex-row">
                  <div className="w-full md:w-1/2 flex justify-center">
                      <Image
                          src={imageLanding}
                          alt="Picture of the author"
                          width={400}
                          height={400}
                      />
                  </div>
                  <div className="w-full md:w-1/2">
                      <h2 className="text-4xl font-bold mb-6">Des capsules communautaires</h2>
                      <p className={`${fonts.openSans.className}`}>
                          En plus de tes propres capsules, tu peux ajouter à ton espace celles partagées par d’autres étudiant·es.
                      </p>
                  </div>
              </div>
          </section>

          <section className="hero py-5 md:py-10 px-2.5 md:px-10">
              <div className="hero-content flex-col lg:flex-row-reverse">
                  <div className="w-full md:w-1/2 flex justify-center">
                      <Image
                          src={imageLanding}
                          alt="Picture of the author"
                          width={400}
                          height={400}
                      />
                  </div>
                  <div className="w-full md:w-1/2">
                      <h2 className="text-4xl font-bold mb-6">Une application mobile</h2>
                      <p className={`${fonts.openSans.className}`}>
                          Emporte EtudIA partout avec toi. <br/>
                          L’app mobile EtudIA te permet de consulter et réviser tes capsules à tout moment, même hors ligne.                      </p>
                  </div>
              </div>
          </section>
      </main>
  );
}
