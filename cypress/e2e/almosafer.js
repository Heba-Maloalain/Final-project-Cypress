///<reference types="Cypress"/>


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('test', () => {
    it.skip('test for lang ,cur and phone', () => {
        cy.visit("https://www.almosafer.com/en")
        cy.get('[data-testid="Header__CurrencySelector"]').should('contain','SAR')
        cy.get('[data-testid="Header__LanguageSwitch"]').should('contain','العربية')
        cy.get('.sc-dRFtgE').should('contain','+966554400000')
    


    });
    it.skip(' test for logo and hotel tab', () => {
        cy.visit("https://www.almosafer.com/en")
        cy.get('.sc-ghsgMZ').should('be.visible')
        cy.get('#uncontrolled-tab-example-tab-hotels').should('have.attr','aria-selected').and('equal','false')
    });
    it.skip('test for date departure and return', () => {
        cy.visit("https://www.almosafer.com/en")
        const currentdate =new Date()
        const day =currentdate.getDate()
        console.log(day)

       let expectedForDeparture= day+1;
       let expectedForReturn= day+2;
       cy.get('[data-testid="FlightSearchBox__FromDateButton"]').should('contain',expectedForDeparture)
       cy.get('[data-testid="FlightSearchBox__ToDateButton"]').should('contain',expectedForReturn)


    });
    it.skip('change language randomly', () => {
       let website=['https://www.almosafer.com/en','https://www.almosafer.com/ar'] 
       let randomnum=Math.floor(Math.random()*website.length)
cy.visit(website[randomnum])
cy.url().then((url)=>{
 if(url.includes('ar')){
    cy.get('[data-testid="Header__LanguageSwitch"]').should('contain','English')
 }
 else if(url.includes('en')){
    cy.get('[data-testid="Header__LanguageSwitch"]').should('contain','العربية')

 }
}
)


    });

    it('hotel search tab', () => {
        let list_room =["A","B"]
        let randomNumForroom=Math.floor(Math.random()*list_room.length)
        let website=['https://www.almosafer.com/en','https://www.almosafer.com/ar'] 
        let randomnum=Math.floor(Math.random()*website.length)
 cy.visit(website[randomnum])
 cy.get('#uncontrolled-tab-example-tab-hotels').click()
 cy.url().then((url)=>{
  if(url.includes('ar')){
   
  let list_ar=["دبي","جدة"]
  let randomNum_ar=Math.floor(Math.random()*list_ar.length)
 cy.get('[data-testid="AutoCompleteInputWrapper"]').type(list_ar[randomNum_ar])
 cy.get('[data-testid="AutoCompleteResultItem0"]').click()

 cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(list_room[randomNumForroom])
 cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
 cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]',{timeout:20000}).should('exist').should('be.visible').should('contain','وجدنا')
 cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()
let prices=[];
let lowestPrice,highestPrice;
cy.get(".Price__Value").each((ele)=>{

prices.push(parseInt(ele.text()))

}).then(()=>{
lowestPrice=prices[0]
highestPrice=prices[prices.length-1]
expect(highestPrice).to.be.greaterThan(lowestPrice)
console.log(prices)
console.log("the lowest price is  "+ lowestPrice)
console.log("the highest price is  " +highestPrice)

})




  }
  else if(url.includes('en')){
    let list_en=["Dubai","Jeddah","Riyadh"]
    let randomNum_en=Math.floor(Math.random()*list_en.length)
   cy.get('[data-testid="AutoCompleteInputWrapper"]').type(list_en[randomNum_en])
   cy.get('[data-testid="AutoCompleteResultItem0"]').click()
  
   cy.get('[data-testid="HotelSearchBox__ReservationSelect_Select"]').select(list_room[randomNumForroom])
   cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
   cy.get('[data-testid="HotelSearchResult__resultsFoundCount"]',{ timeout: 20000 }).should('exist').should('be.visible').should('contain','found')
   cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()  
   let prices=[];
   let lowestPrice,highestPrice;
   cy.get(".Price__Value").each((ele)=>{
   
   prices.push(parseInt(ele.text()))
   
   }).then(()=>{
   lowestPrice=prices[0]
   highestPrice=prices[prices.length-1]
   expect(highestPrice).to.be.greaterThan(lowestPrice)
   console.log(prices)
   console.log("the lowest price is  "+ lowestPrice)
   console.log("the highest price is  "+ highestPrice)
   
   })
   
   


}
 }
 )
 
 


    });
    


});