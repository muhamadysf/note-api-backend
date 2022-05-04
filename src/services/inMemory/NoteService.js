const {
  nanoid,
} = require('nanoid');

class NotesService {
  constructor() {
    this._note = [];
  }

  addNote({
    title,
    body,
    tags,
  }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._note.push(newNote);

    const isSuccess = this._note.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this._note;
  }

  getNoteById(
    id,
  ) {
    const note = this._note.filter((n) => n.id === id)[0];

    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }

    return note;
  }

  editNoteById(id, {
    title,
    body,
    tags,
  }) {
    const index = this._note.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._note[index] = {
      ...this._note[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._note.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
    }

    this._note.splice(index, 1);
  }
}

module.exports = NotesService;
