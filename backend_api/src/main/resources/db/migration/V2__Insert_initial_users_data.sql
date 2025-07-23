INSERT INTO users (username, firstname, lastname, email, password, role)
VALUES ('admin', 'firstnameAdmin', 'lastnameAdmin', 'admin@test.com',
        '$2a$10$34l77rT2dvzT2RnkG4JVietgXu0LmllZmmME/JYRTEOEL2PHWKMm.', 'ROLE_ADMIN'),
       ('etudiant13', 'firstnameEtudiant13', 'lastnameEtudiant13', 'etudiant13@test.com',
        '$2a$10$34l77rT2dvzT2RnkG4JVietgXu0LmllZmmME/JYRTEOEL2PHWKMm.', 'ROLE_ETUDIANT'),
       ('adeLaana', 'ade', 'laana', 'ade.laana@test.com',
        '$2a$10$34l77rT2dvzT2RnkG4JVietgXu0LmllZmmME/JYRTEOEL2PHWKMm.', 'ROLE_ETUDIANT');