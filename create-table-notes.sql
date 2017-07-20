DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id          serial,
  note_date   date,
  note_text   text,
  note_type   enum('doctor', 'therapist', 'case manager'),
  clients_id  integer
);
