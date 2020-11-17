artyom.addCommands({
    indexes:["Hello","Hey","Hurra"],
    action: function(i){
      console.log("Something matches");
    }
});

artyom.addCommands({
    smart:true,// We need to say that this command is smart !
    indexes:["How many people live in *"], // * = the spoken text after How many people live in is recognized
    action:function(i,wildcard){
      switch(wildcard){
        case "berlin":
          alert("Why should i know something like this ?");
        break;
        case "paris":
          alert("I don't know");
        break;
        default:
          alert("I don't know what city is " + * + ". try to increase the switch cases !");
        break;
      }
    }
  });
  artyom.simulateInstruction("How many people live in Paris");
// alert("I don't know ._.");

artyom.initialize({
    lang:"en-GB",// More languages are documented in the library
    continuous:false,//if you have https connection, you can activate continuous mode
    debug:true,//Show everything in the console
    listen:true // Start listening when this function is triggered
 });
 artyom.fatality();


