/**
 * @overview ccm component vokabeltrainer
 * @author Tim Höffner <tim-hoeffner@web.de> 2016
 */
ccm.component( {
  name: 'vokabeltrainer',
  config: {
      html:  [ ccm.store, { local: 'vokabeln_html.json' } ],
      key:   'vokabeltrainer',
      store: [ ccm.store, './vokabeln.json' ],
      style:         [ ccm.load, './vokabeltrainer.css' ],
      user:  [ ccm.instance, 'https://kaul.inf.h-brs.de/ccm/components/user2.js' ]
      
  },
  Instance: function () {
    var self = this;
    self.init = function ( callback ) {
      self.store.onChange = function () { self.render(); };
      callback();
    };
      
    self.render = function ( callback ) {
      var element = ccm.helper.element( self );
	self.store.get( self.key, function ( dataset ) {
            if ( dataset === null ) {
		self.store.set( { key: self.key, vokabeln: [] }, proceed );
	    }
            else {
             var i = 0;
            var richtigeantworten = 0;
		proceed( dataset,i, richtigeantworten );
	    } 
          
        
        
        //Diese Funktion nach jeder Eingabe  wiederholen
           function proceed( dataset, i, richtigeantworten ) {
               
            

   
            
            var antworten = richtigeantworten;
            var j = i;  
               
            //Wenn mit Vokabeln durch dann bitte folgendens Machen:   
            if(dataset.vokabeln.length === j) {
                //Wenn die Vokabelabfrage durch ist, soll nur noch eine Auswertung stattfinden eine Auswertung stattfinden:
                element.html( ccm.helper.html( self.html.get( 'main' ) ) );
		        var user_div = ccm.helper.find( self, '.user' );  //neue private Variable
                ccm.helper.find( self, '.user' ).html( ccm.helper.html( { inner: ccm.helper.val( "Benutzer: "+ dataset.user ) } ) );
                user_div.append( ccm.helper.html( self.html.get( 'auswertung' ) ) );
                ccm.helper.find( self, '.auswertung' ).html( ccm.helper.html( { inner: ccm.helper.val( "Anzahl der richtigen Vokabeln:"+ antworten ) } ) );
                alert("Ende");
                return;
        }
               
               
        //Ansonsten frage weiter ab       
        else {
            
           
                
        //Main Struktur rendern
		element.html( ccm.helper.html( self.html.get( 'main' ) ) );
		var user_div = ccm.helper.find( self, '.user' );  //neue private Variable
        ccm.helper.find( self, '.user' ).html( ccm.helper.html( { inner: ccm.helper.val( "Benutzer: "+ dataset.user ) } ) );

                
        //Rendern der Beschreibung        
        user_div.append( ccm.helper.html( self.html.get( 'description' ) ) ); 
        ccm.helper.find( self, '.description' ).html( ccm.helper.html( { inner: ccm.helper.val( "Beschreibung: "+dataset.description ) } ) );       
         
                
    
            
        var vokabel = dataset.vokabeln[ j ];
            
            //render abfrage HTML Struktur
            user_div.append( ccm.helper.html( self.html.get( 'abfrage' ), {
                
             //Zuweisen der Vokabel!    
             //vokabel: ccm.helper.val( "Vokabel: "+ vokabel.vokabel )    
            
            } ) );
            
            ccm.helper.find( self, '.vokabel' ).html( ccm.helper.html( { inner: ccm.helper.val( "Vokabel: "+ vokabel.vokabel ) } ) );
            
            
          //Feedback rendern    
          user_div.append( ccm.helper.html( self.html.get( 'feedback' ) ) );    
               
          // render input field for answer
          user_div.append( ccm.helper.html( self.html.get( 'input' ), { onsubmit: function () {
              
              
          //Beim Klicken des Buttons soll folge Aktion durchgeführt werden
          var value = ccm.helper.val( ccm.helper.find( self, 'input' ).val() ).trim();
            
             
             

            // Antwort = 0?  abort
            if ( value === '' ) return;
              
            //Prüfe die Eingabe
            if(value === vokabel.antwort) {
                 antworten++;
                 ccm.helper.find( self, '.feedback' ).html( ccm.helper.html( { inner: ccm.helper.val( "Richtig" ) } ) );
            }  else {
                
                ccm.helper.find( self, '.feedback' ).html( ccm.helper.html( { inner: ccm.helper.val( "Falsch, Richtige Anwort wäre gewesen:"+ vokabel.antwort ) } ) );
            }
              
         
            
            // prevent page reload
            return false;

          } } ) ); 
                
                
                
          //Render Next Button
          user_div.append( ccm.helper.html( self.html.get( 'next' ), { onclick: function () {     
            j++;
            proceed( dataset,j );
            return false;

          } } ) ); 
            
        
    }
		if ( callback ) callback();
                     
            }
	} );
    };
  }
} );
