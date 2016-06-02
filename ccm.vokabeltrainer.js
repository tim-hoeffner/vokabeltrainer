/**
 * Vokabeltrainer: Ansicht Vokabelabfrage
 */
ccm.component( {  
  name: 'vokabeltrainer',

  config: {

    html:  [ ccm.store, { local: 'vokabeln_html.json' } ],
    key:   'vokabeltrainer',
    store: [ccm.store, './vokabeln.json']

  },
 
  Instance: function () { 
    var self = this;
    self.init = function ( callback ) {

      // listen to change event of ccm realtime datastore => update own content
      self.store.onChange = function () { self.render(); };

      // perform callback
      callback();

    };

  
    self.render = function ( callback ) {

     
      var element = ccm.helper.element( self );

        // get dataset for rendering
        self.store.get( self.key, function ( dataset ) {

        if ( dataset === null )
          self.store.set( { key: self.key, vokabeln: [] }, proceed );
          
        else
          proceed( dataset );
        function proceed( dataset ) {
        
         
        //var vokabeln_div = ccm.helper.find( self, '.abfrage' );
            
            
       // render main html structure
       element.html( ccm.helper.html( self.html.main ) );
       //var main_div = ccm.helper.find(self,'main');


        // perform callback
       // if ( callback ) callback();
        
        function renderTitle() {

          if ( dataset.title )
            ccm.helper.find( self, '.title' ).html( ccm.helper.html( { inner: ccm.helper.val( dataset.title ) } ) );

        }

        
        function renderDescription() {

          if ( dataset.description )
            ccm.helper.find( self, '.description' ).html( ccm.helper.html( { inner: ccm.helper.val( dataset.description ) } ) );
            
        } 
         function renderUser() {
             if(dataset.user)
             ccm.helper.find( self, '.user' ).html( ccm.helper.html( { inner: ccm.helper.val( dataset.user ) } ) );
             
         }
            
          // perform callback
          if ( callback ) callback();

        }

      } );

    };

  }



} );