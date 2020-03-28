import React from 'react'

const FrontPageInfo =()=>{

  return (
    <div className="frontpage-info">
      <h2>Kisatehtäväpankki</h2>
      <p>Kisatehtäväpankki on arkisto,
         johon voidaan tallettaa tehtäviä.
         Sivustolle voit tallettaa tehtävän,
         sekä siihen liittyvät liitetiedostot.
      </p>
      <br/>
      <p>
        Kirjautumattomana käyttäjänä voit
        koostaa tehtävistä kisaa varten
        kokonaisuuksia, sekä ladata ne 
        PDF-tiedostona itsellesi.
      </p>
      <br/>
      <p>
        Voit myöskin selailla tehtäviä, arvostella tehtäviä
        ja lisätä uusia tehtäviä. Uuden tehtävän lisääminen arkistoon
        vaatii ensin ylläpitäjän hyväksynnän uudelle tehtävälle.
      </p>
    </div>
  )
}

export default FrontPageInfo