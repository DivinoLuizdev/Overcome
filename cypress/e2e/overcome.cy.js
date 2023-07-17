


context("Teste filtros", () => {

  var url = 'http://192.168.1.105:3000/'


  describe('Testes de Pesquisa', () => {

    it('periodo inicial ', () => {
      cy.visit(url);
      cy.get('#data-inicio').type('2019-01-01')
      cy.get('.btn').click();
    })


    it('periodo final ', () => {
      cy.visit(url);

      cy.get('#data-fim').type('2020-07-01')
      cy.get('.btn').click();
    })



    it('periodo inicial e final ', () => {
      cy.visit(url);
      cy.get('#data-inicio').type('2019-08-01')
      cy.get('#data-fim').type('2020-07-01')
      cy.get('.btn').click();
    })

    it('Nome do Operador Transacionado:', () => {
      cy.visit(url);
      cy.get('#nome-operador').type('Beltrano');
      cy.get('.btn').click();
      cy.get('tbody > :nth-child(1) > :nth-child(4)').should('contain', 'Beltrano');
    })


    it('periodo inicial , final  e  Operador Transacionado', () => {
      cy.visit(url);
      cy.get('#data-inicio').type('2019-08-01')
      cy.get('#data-fim').type('2020-07-01')
      cy.get('#nome-operador').type('Beltrano');
      cy.get('.btn').click();
      cy.get('tbody > :nth-child(1) > :nth-child(4)').should('contain', 'Beltrano');
    })


    it('Saldo total', () => {
      cy.visit(url);
      cy.get('#data-inicio').type('2019-08-01')
      cy.get('#data-fim').type('2020-07-01')
      cy.get('#nome-operador').type('Beltrano');
      cy.get('.btn').click();
      cy.get('tbody > :nth-child(1) > :nth-child(4)').should('contain', 'Beltrano');
    })




    it('Verifica se a soma dos valores é igual ao saldo total', () => {
      cy.request('http://localhost:8080/api/transferencias').then(response => {
        expect(response.status).to.eq(200);
        const transferencias = response.body;
        const somaValores = transferencias.reduce((total, transferencia) => {
          return total + transferencia.valor;
        }, 0).toFixed(2);
        cy.request('http://localhost:8080/api/transferencias/saldo-total').then(response => {
          expect(response.status).to.eq(200);
          expect(somaValores).to.eq(response.body.toString());
        });
      });
    });



    



  })
});