BEGIN;

ALTER TABLE courses
    DROP CONSTRAINT fk_course_user;

ALTER TABLE courses
    ALTER COLUMN user_id DROP NOT NULL;

UPDATE courses
SET user_id = NULL
WHERE user_id IS NOT NULL AND user_id NOT IN (SELECT id FROM users);

ALTER TABLE courses
    ADD constraint fk_course_user
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE SET NULL;

COMMIT;