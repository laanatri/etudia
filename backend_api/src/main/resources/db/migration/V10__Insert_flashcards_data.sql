INSERT INTO flashcards (title, content, bloc_id)
VALUES (E'Qu\'est-ce qu\'un patron d\'architecture dans le contexte d\'un projet logiciel ?', E'Un patron d\'architecture définit comment les composants principaux de l\'application interagiront entre eux, en alignement avec les objectifs, contraintes et exigences du projet.', 1),
(E'Quels sont les critères à analyser avant de choisir un patron d\'architecture ?', 'Il faut analyser les exigences fonctionnelles et non fonctionnelles, ainsi que les contraintes techniques, opérationnelles et organisationnelles.', 1),
(E'Donne un exemple de patron d\'architecture adapté pour une application hautement évolutive et résiliente.', E'Le patron d\'architecture microservices est adapté pour des applications hautement évolutives et résilientes.', 1),
('Quels sont les trois composants principaux du modèle MVC ?', 'Le modèle, la vue, et le contrôleur.', 1),
('Quels frameworks web utilisent couramment le modèle MVC ?', 'Ruby on Rails, Django, et Laravel.', 1),
('Quelle est la différence principale entre le modèle MVC et le modèle MVVM ?', E'Le modèle MVVM sépare l\'application en modèle, vue, et ViewModel, et est particulièrement utilisé dans les applications avec des interfaces utilisateur riches.', 1),
(E'Comment fonctionne l\'architecture microservices ?', E'Elle structure une application en une collection de services indépendants, chacun responsable d\'une fonctionnalité spécifique, communiquant via des API.', 1),
('Quels exemples de technologies peut-on choisir pour le frontend dans une stack technique ?', 'React, Angular, Vue.js.', 1),
(E'Quelles technologies peut-on utiliser pour l\'orchestration dans une stack technique ?', 'Docker et Kubernetes.', 1),
(E'Que signifie la validation et le prototypage dans le choix d\'une architecture et stack technique ?', E'Cela consiste à créer des prototypes ou POC pour valider les choix et ajuster la stack et l\'architecture en fonction des retours et des tests.', 1);

INSERT INTO flashcards (title, content, bloc_id)
VALUES (E'Quel rôle jouait principalement le back-end dans les premiers sites web ?', E'Le back-end générait directement le HTML à chaque requête, côté serveur, souvent via des moteurs de templates.', 2),
(E'Quel est l’avantage principal de générer le HTML côté serveur dans les premières architectures web ?', E'Cela améliore le SEO et l\'accessibilité car le HTML est directement disponible sans exécution de JavaScript.', 2),
(E'Quel est l’inconvénient majeur de recharger entièrement une page à chaque navigation ?', E'Cela peut donner une impression de lenteur car toute la page est rechargée à chaque interaction.', 2),
(E'Qu’est-ce qu’une SPA (Single Page Application) ?', E'C’est une application web où la navigation et le rendu des pages sont gérés côté client, avec du JavaScript, en récupérant les données depuis une API.', 2),
(E'Quels frameworks front-end sont associés à la montée en popularité des SPAs ?', E'Angular, React, Vue.js, Svelte.', 2),
(E'Quel problème les SPAs peuvent-elles poser en termes de référencement ?', E'Le HTML est généré côté client, ce qui peut nuire au SEO et à l\'accessibilité si le JavaScript n\'est pas exécuté.', 2),
(E'Qu\'est-ce qu\'un meta-framework et donne un exemple ?', E'Un meta-framework est un framework fullstack basé sur un framework front-end, comme Next.js pour React ou Nuxt pour Vue.js.', 2),
(E'Quelle est la différence entre SSR (Server Side Rendering) et SSG (Static Site Generation) ?', E'Le SSR génère le HTML à chaque requête côté serveur, tandis que le SSG le génère au moment du build pour l’envoyer directement aux utilisateurs.', 2),
(E'Quel est l’avantage principal du SSG ?', E'Il offre de meilleures performances et un coût moindre, idéal pour du contenu statique.', 2),
(E'Qu’est-ce que l’ISR (Incremental Static Regeneration) ?', E'C’est une technique intermédiaire qui permet de régénérer les pages statiques périodiquement pour combiner les avantages du SSR et du SSG.', 2);
