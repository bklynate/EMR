DROP TABLE IF EXISTS notes;

CREATE TYPE person AS ENUM ('doctor', 'therapist', 'case manager');
CREATE TABLE notes (
  id          serial,
  note_date   date,
  note_text   text,
  note_type   person,
  clients_id  integer
);
