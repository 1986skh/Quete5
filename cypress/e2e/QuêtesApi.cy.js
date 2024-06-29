describe('Template spec', () => {
  let authToken;
  let noteIds = [];

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://practice.expandtesting.com/notes/api/users/login',
      body: {
        email: 'sqtp26y9@sample.com',
        password: 'snlcprbm'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token;
    });
  });

  it('Créer des notes en utilisant les données de fixture', () => {
    cy.fixture('notes.json').then((notes) => {
      expect(notes).to.have.lengthOf.at.least(1);

      cy.wrap(notes).each((note) => {
        cy.request({
          method: 'POST',
          url: 'https://practice.expandtesting.com/notes/api/notes',
          headers: {
            'x-auth-token': authToken
          },
          body: note
        }).then((response) => {
          expect(response.status).to.eq(200);
          noteIds.push(response.body.data.id);
        });
      });
    });
  });

  it('Modifier une note par son ID', () => {
    cy.wrap(noteIds).should('have.length.of.at.least', 1);

    const noteId = noteIds[0];
    expect(noteId).to.not.be.undefined;

    cy.request({
      method: 'PUT',
      url: `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
      headers: {
        'x-auth-token': authToken
      },
      FORM:true,
      body: {
        "title": "tache du jour",
        "description": "faire un jogging",
        "category":"Work",
        "completed": true
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.title).to.eq("tache du jour");
      expect(response.body.data.description).to.eq("faire un jogging");
      expect(response.body.data.completed).to.be.true;
    });
  });

  it('Afficher une note par son ID', () => {
    cy.wrap(noteIds).should('have.length.of.at.least', 1);

    const noteId = noteIds[0];
    expect(noteId).to.not.be.undefined;

    cy.request({
      method: 'GET',
      url: `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
      headers: {
        'x-auth-token': authToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

      const note = response.body.data;
      expect(note.title).to.eq("tache du jour");
      expect(note.description).to.eq("faire un jogging");
      expect(note.completed).to.be.true;
    });
  });

  it('Supprimer une note par son ID', () => {
    cy.wrap(noteIds).should('have.length.of.at.least', 1);

    const noteId = noteIds[0];
    expect(noteId).to.not.be.undefined;

    cy.request({
      method: 'DELETE',
      url: `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
      headers: {
        'x-auth-token': authToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const index = noteIds.indexOf(noteId);
      noteIds.splice(index, 1);
      cy.log(noteIds)
    });
  });
});
